eventListeners();

// Funcion con todos los eventos
function eventListeners(){
    // Validamos el Inicio de Sesion
    document.querySelector('#formulario').addEventListener('submit', validarRegistro);
    
}

// Validamos el registro de iniciar seccion
function validarRegistro(e) {
    e.preventDefault();

    //Declaramos un nodo a cada variable
    var usuario = document.querySelector('#usuario').value,
        password = document.querySelector('#password').value,
        tipo = document.querySelector('#tipo').value;

    
    if(usuario === '' || password === ''){  // Condicinonal en el caso que el campo Usuario y Password se encuentren vacios

        // Plugin.js - Alerta con animacion - SweetAlert2
        Swal.fire({
            type: 'error',
            title: '¡ERROR!',
            text: 'Ambos campos son obligatorios'
          })

    }else{  // Condicional en el caso que se rellenen los dos campos

        // Datos que se envian al servidor
        var datos = new FormData();
        datos.append('usuario',usuario);
        datos.append('password',password);
        datos.append('accion',tipo);

        // UTILIZAMOS AJAX

        // 1) Creamos el objeto
        var xhr = new XMLHttpRequest();

        // 2) Abrimos la conexion
        xhr.open('POST', 'inc/modelos/modelo-admin.php', true);
        
        // 3) Retorno de datos
        xhr.onload = function(){
            // Verificamos si el Status de conexion es igual a 200, esto quiere decir que la conexion se realizo con exito
            if(this.status === 200){
                var respuesta = JSON.parse(xhr.responseText);

                console.log(respuesta);
                if(respuesta.respuesta === 'correcto'){ // Si la respuesta es correcta
                    
                    // Si es un nuevo usuario
                     if(respuesta.tipo === 'crear'){
                      // Plugin.js - Alerta con animacion - SweetAlert2
                        Swal.fire({
                            title: '¡Usuario Creado!',
                            text: 'El usuario  se creo correctamente',
                            type: 'success'
                        });
                     }else if(respuesta.tipo === 'login'){
                      // Plugin.js - Alerta con animacion - SweetAlert2
                        Swal.fire({
                            title: '¡Login Correcto!',
                            text: 'Has iniciado sesion correctamente',
                            type: 'success'
                        })
                        .then(resultado => { // Redireccionamos al archivo index.php
                            if(resultado.value){
                                window.location.href = 'index.php';
                            }
                        })
                    }
                }else{ // En el caso que halla un error
                  
                   
                    if(respuesta.error === 'Usuario no existe'){  // En el caso que NO EXISTA el Nombre de Usuario
                    // Plugin.js - Alerta con animacion - SweetAlert2    
                        Swal.fire({
                            title: '¡ERROR!',
                            text: 'El Nombre de Usuario no existe',
                            type: 'error'
                        });
                    }else if(respuesta.error === 'Contraseña incorrecta'){  // En el caso que la contraseña sea INCORRECTA
                    // Plugin.js - Alerta con animacion - SweetAlert2
                        Swal.fire({
                            title: '¡ERROR!',
                            text: 'Contraseña incorrecta',
                            type: 'error'
                        });
                    }
                }
            }
        }

        // 4) Enviamos la peticion
        xhr.send(datos);

    } 
}