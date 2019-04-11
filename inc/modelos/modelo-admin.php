<?php

$accion = $_POST['accion'];
$password = $_POST['password'];
$usuario = $_POST['usuario'];

if($accion === 'crear'){
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

        
        if($stmt->affected_rows > 0){ // Condicional en el caso que alguna fila halla sido afectada por la consulta

            $respuesta = array(
                'respuesta' => 'correcto',
                'id_insertado' => $stmt->insert_id,
                'tipo' => $accion
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



}else if($accion === 'login'){
    //Codigo para logear a los Admnistradores

       //Importamos la conexion
       include '../funciones/conexion.php';

       try{

        $stmt = $conn->prepare("SELECT id, usuario, password FROM usuarios WHERE usuario = ?");
        $stmt->bind_param('s', $usuario);
        $stmt->execute();

        //Logeamos al Usuario
        $stmt->bind_result($id_usuario, $nombre_usuario, $pass_usuario);
        $stmt->fetch();

        // Verificamos si el Nombre de Usuario existe
        if($nombre_usuario){

            // Verificamos que la Contraseña sea correcta

            // password_verify: Recibe dos parametros, la contraseña que el usuario ingreso y la contraseña hasheada que obtenemos de la base de datos.

            if(password_verify($password,$pass_usuario)){
                $respuesta = array(
                    'respuesta' => 'correcto',
                    'id' => $id_usuario,
                    'nombre' => $nombre_usuario,
                    'password' => $pass_usuario,
                    'tipo' => $accion
                );
            }else{
                $respuesta = array(
                    'error' => 'Contraseña incorrecta',
    
                );
            }
           
        }else{
            $respuesta = array(
                'error' => 'Usuario no existe'
            );
        }
        


        $stmt->close();
        $conn->close();
       }catch(Exception $e){
        // En caso de error , tomar la excepcion
        $respuesta = array(
            'error' => $e->getMessage()
        );
    }
}

echo json_encode($respuesta);