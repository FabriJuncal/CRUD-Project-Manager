<?php 

/** VERIFICAMOS QUE EXISTAN LOS SIGUIENTES "POST" ANTES DE DECLARARLAS A UNA VARIABLE **/

if(isset( $_POST['id_proyecto'])){
    $id_proyecto = (int) $_POST['id_proyecto'];
}

if(isset( $_POST['tarea'])){
    $tarea = $_POST['tarea'];
}

if(isset( $_POST['estado'])){
    $tarea = $_POST['estado'];
}


$accion = $_POST['accion'];


if($accion === 'crear'){ //Codigo para CREAR las tareas

    //Importamos la conexion
    include '../funciones/conexion.php';

    try{
        // Realizamos la consulta a la base de datos con PREPARE STATEMENT
        $stmt = $conn->prepare("INSERT INTO tareas (nombre, id_proyecto) VALUES (?, ?)");
        $stmt->bind_param('si', $tarea, $id_proyecto);
        $stmt->execute();

        // $respuesta = array(                      }
        //     'respuesta' => $stmt->error_list,    }      =>  ESTE CODIGO SIRVE PARA DEBUGEAR CUANDO OBTENEMOS UN ERROR        
        //     'error' => $stmt->error              }      =>  AL REALIZAR UNA CONSULTA A LA BASE DE DATOS
        // );

        
        if($stmt->affected_rows > 0){ // Condicional en el caso que alguna fila halla sido afectada por la consulta

            $respuesta = array(
                'respuesta' => 'correcto',
                'id_proyecto' => $stmt->insert_id,
                'tipo' => $accion,
                'tarea' => $tarea
            );

        }else{
            $respuesta = array( // Condicional en el caso que ninguna fila halla sido afectada por la consulta
                'respuesta' => 'error'
            );
        }


        // Cerramos las conexiones
        $stmt->close();
        $conn->close();

       
    }catch(Exception $e){
        // En caso de error , tomar la excepcion
        $respuesta = array(
            'error' => $e->getMessage()
        );
    }

}

if($accion === 'actualizar'){
    echo json_encode($_POST);
}

// Retornamos el valor mediante AJAX
// echo json_encode($respuesta);