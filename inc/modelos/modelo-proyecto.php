<?php

$accion = $_POST['accion'];
$proyecto = $_POST['proyecto'];

if($accion === 'crear'){ //Codigo para CREAR los Proyectos

    

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

// Retornamos el valor mediante AJAX
echo json_encode($respuesta);