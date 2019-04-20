<?php

if(isset($_POST['proyecto'])){
    $proyecto = $_POST['proyecto'];
}

if(isset($_POST['id_proyecto'])){
    $id_proyecto = (int) $_POST['id_proyecto'];
}
$id_proyecto = $_POST['id_proyecto'];

$accion = $_POST['accion'];

if($accion === 'crear'){ //CODIGO PARA CREAR LOS PROYECTOS

    //Importamos la conexion
    include '../funciones/conexion.php';

    try{
        // Realizamos la consulta a la base de datos con PREPARE STATEMENT
        $stmt = $conn->prepare("INSERT INTO proyectos (nombre) VALUES (?)");
        $stmt->bind_param('s', $proyecto);
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
                'nombre_proyecto' => $proyecto
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

if($accion === 'eliminar'){ // CODIGO PARA ELIMINAR LOS PROYECTOS

    //Importamos la conexion
    include '../funciones/conexion.php';

    try{

        // Eliminamos las Tareas del Proyecto a Eliminar
        // Realizamos la consulta a la base de datos con PREPARE STATEMENT
        $stmt = $conn->prepare("DELETE FROM tareas WHERE id_proyecto = ?");
        $stmt->bind_param('i',$id_proyecto);
        $stmt->execute();
        // Cerramos la conexion
        $stmt->close();

        // Eliminamos el Proyecto 
        // Realizamos la consulta a la base de datos con PREPARE STATEMENT
        $stmt = $conn->prepare("DELETE FROM proyectos WHERE id = ?");
        $stmt->bind_param('i',$id_proyecto);
        $stmt->execute();

        // $respuesta = array(                      }
        //     'respuesta' => $stmt->error_list,    }      =>  ESTE CODIGO SIRVE PARA DEBUGEAR CUANDO OBTENEMOS UN ERROR        
        //     'error' => $stmt->error              }      =>  AL REALIZAR UNA CONSULTA A LA BASE DE DATOS
        // );

        
        if($stmt->affected_rows > 0){ // Condicional en el caso que alguna fila halla sido afectada por la consulta

            $respuesta = array(
                'respuesta' => 'correcto',
                
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

// Retornamos el valor mediante AJAX
echo json_encode($respuesta);