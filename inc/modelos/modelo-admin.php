<?php

$accion = $_POST['accion'];
$password = $_POST['password'];
$usuario = $_POST['usuario'];

if($accion = 'crear'){
    //Codigo para crear  los Administradores

    //Hasheamos los password
    $opciones = array(
        'cost' => 12
    );

    // password_hash: crea un hash de contraseña
    // PASSWORD_BCRYPT: se utiliza para crear nuevos hashes de contraseña utilizando.
    $hash_password = password_hash($password, PASSWORD_BCRYPT, $opciones);

    //Importamos la conexion
    include '../funciones/conexion.php';

    try{
        // Realizamos la consulta a la base de datos con PREPARE STATEMENT
        $stmt = $conn->prepare("INSERT INTO usuarios (usuario, password) VALUES (?,?)");
        $stmt->bind_param('ss', $usuario, $hash_password);
        $stmt->execute();

        // $respuesta = array(                      }
        //     'respuesta' => $stmt->error_list,    }      =>  ESTE CODIGO SIRVE PARA DEBUGEAR CUANDO OBTENEMOS UN ERROR        
        //     'error' => $stmt->error              }      =>  AL REALIZAR UNA CONSULTA A LA BASE DE DATOS
        // );

        // Condicional en el caso que alguna fila halla sido afectada por la consulta
        if($stmt->affected_rows){
            $respuesta = array(
                'respuesta' => 'correcto',
                'id_insertado' => $stmt->insert_id,
                'tipo' => $accion
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

    echo json_encode($respuesta);

}else if($accion = 'login'){
    //Codigo para logear a los Admnistradores
}