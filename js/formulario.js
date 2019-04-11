eventListeners();

// Funcion con todos los eventos
function eventListeners(){
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
                      
                        Swal.fire({
                            title: '¡Usuario Creado!',
                            text: 'El usuario  se creo correctamente',
                            type: 'success'
                        });
                     }
                     
                }else{ // En el caso que halla un error
                  
                    Swal.fire({
                        
                        title: '¡ERROR!',
                        text: 'Hubo un error',
                        type: 'error'
                    });
                }
            }
        }

        // 4) Enviamos la peticion
        xhr.send(datos);

    } 
}