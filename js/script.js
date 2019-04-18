
eventListeners();

// Lista de Proyectos
var listaProyectos = document.querySelector('ul#proyectos');

function eventListeners(){ // Funcion para agregar los Eventos con sus Funciones

    //Boton para Crer Proyectos
    document.querySelector('.crear-proyecto a').addEventListener('click', nuevoProyecto);

    //Boton para Agregar una Tarea a un Proyecto
    document.querySelector('.nueva-tarea').addEventListener('click', agregarTarea);

    // Botones para las Acciones de las Tareas
    document.querySelector('.listado-pendientes').addEventListener('click', accionesTareas);
}

function nuevoProyecto(e){ // Creamos el evento para crear un Nuevo Proyecto y lo mostramos en el Frontend
    e.preventDefault(); // Quitamos el evento predeterminado

    // Creamos un <input> para el nombre  del nuevo proyecto
    var nuevoProyecto = document.createElement('li');
    nuevoProyecto.innerHTML = '<input type="text" id="nuevo-proyecto">';
    listaProyectos.appendChild(nuevoProyecto);
    
    // Seleccionamos el ID con el nuevoProyecto
    var inputNuevoProyecto = document.querySelector('#nuevo-proyecto');
    
    // Al presionar la tecla ENTER se crea un Nuevo Proyecto
    inputNuevoProyecto.addEventListener('keypress', function(e){
        
       
        var tecla = e.which || e.keycode;
        if(tecla === 13){
            guardarProyectoBD(inputNuevoProyecto.value);
            listaProyectos.removeChild(nuevoProyecto);
            
        }
        
    })
}

function guardarProyectoBD(nombreProyecto){ // Mediante AJAX Guardamos el Proyecto en la base de datos
    
    //1) Creamos el objeto AJAX
    var xhr = new XMLHttpRequest();

    //2) Enviamos datos por formdata
    var datos = new FormData();
    datos.append('proyecto',nombreProyecto);
    datos.append('accion', 'crear');

    //3) Abrimos la conexion
    xhr.open('POST', 'inc/modelos/modelo-proyecto.php', true);

    //4) Recibimos los datos del servidor
    xhr.onload = function(){
        if(this.status === 200){ // En el caso que la conexion se halla concretado correctamente

            var respuesta = JSON.parse(xhr.responseText);
            var id_proyecto = respuesta.id_proyecto,
                proyecto = respuesta.nombre_proyecto,
                tipo = respuesta.tipo,
                resultado = respuesta.respuesta;
                
                if(resultado === 'correcto'){ // En el caso que el resultdo sea Correcto

                    if(tipo === 'crear'){ // En el caso que la accion fuera Crear
                        // Inyectmos HTML
                        var nuevoProyecto = document.createElement('li');

                        nuevoProyecto.innerHTML = `
                            <a href="index.php?id_proyecto=${id_proyecto}" id=proyecto:${id_proyecto}>
                                ${proyecto}
                            </a>
                        `;

                        listaProyectos.appendChild(nuevoProyecto);

                        // Plugin.js - Alerta con animacion - SweetAlert2
                        Swal.fire({
                            title: '¡Proyecto Creado!',
                            text: 'El proyecto: ' + proyecto + ' se creo correctamente',
                            type: 'success'
                        })
                        .then(resultado =>{ // Redireccionamos al proyecto recien creado
                            if(resultado.value){
                                window.location.href = 'index.php?id_proyecto=' + id_proyecto;
                            }
                        });
                    }
                }else{ // En el caso que ocurra un Error
                    // Plugin.js - Alerta con animacion - SweetAlert2
                    Swal.fire({
                        title: '¡ERROR!',
                        text: 'Hubo un error...',
                        type: 'error'
                    });
                }
        }
    }

    //5) Enviamos el Request
    xhr.send(datos);

    
}

function agregarTarea(e){ // Inyectamos la Tarea al HTML para mostrar la tarea recien creada sin tener la necesidad de recargar

    e.preventDefault(); // Quitamos el evento predeterminado

    var nombreTarea = document.querySelector('.nombre-tarea').value;

    // Validamos que el campo tenga algo escrito
    if(nombreTarea === ""){ // En el caso que la Tarea este vacia
        Swal.fire({
            title: '¡ERROR!',
            text: 'Una tarea no puede ir vacia',
            type: 'error'
        })
    }else{ // En el caso que la Tarea contenga un texto

        // Creamos el objeto AJAX
        var xhr = new XMLHttpRequest();

        // Creamos el FormData() para enviar los datos que queremos 
        var datos = new FormData();
        datos.append('tarea', nombreTarea);
        datos.append('accion', 'crear');
        datos.append('id_proyecto', document.querySelector('#id_proyecto').value);

        // Abrimos la conexion
        xhr.open('POST', 'inc/modelos/modelo-tarea.php', true);

        // Ejecutamos la respuesta
        xhr.onload = function(){
            if(this.status === 200){ // En el caso que este todo Correcto

                var respuesta = JSON.parse(xhr.responseText);
                
                var resultado = respuesta.respuesta,
                    tarea = respuesta.tarea,
                    id_proyecto = respuesta.id_proyecto,
                    tipo = respuesta.tipo;
                
                if(resultado === 'correcto'){//se agrego correctamente
                    if(tipo === 'crear'){// En el caso que la accion es CREAR
                        // Alerta del plugin SweetAlert2
                        swal.fire({
                            type: 'success',
                            title: 'Tarea Creada',
                            text: 'La tarea: "' + tarea + '" se creó correctamente'
                         });

                         // Construimos un Template
                         var nuevaTarea = document.createElement('li');

                         // Agregamos  el ID
                         nuevaTarea.id = 'tarea:' + id_proyecto;

                         // Agregamos la Clase "tarea"
                         nuevaTarea.classList.add('tarea');

                         // Construimos el HTML
                         nuevaTarea.innerHTML = `
                            <p>${tarea}</p>
                            <div class="acciones">
                                <i class="far fa-check-circle"></i>
                                <i class="fas fa-trash"></i>
                            </div>
                         `;

                         // Agregamos el HTML
                         var listado = document.querySelector('.listado-pendientes ul');
                         listado.appendChild(nuevaTarea);

                         // Limpiamos el formulario
                         document.querySelector('.agregar-tarea').reset();

                    }
                    

                }else{// Hubo un error
                    // Alerta del plugin SweetAlert2
                    swal.fire({
                        type: 'error',
                        title: '¡ERROR!',
                        text: 'Hubo un error...'
                    });

                }
            }
            
            ;
        }

        // Enviamos la consulta
        xhr.send(datos);
    }
   
}

function accionesTareas(e){ // Cambiamos el estado  de las Tareas o las Eliminamos
    e.preventDefault();

    // .target: Con esta funcion podemos saber a que nodo HTML se le dio CLICK, se le conoce como DELEGATION

    if(e.target.classList.contains('fa-check-circle')){ // En el caso que hagamos CLICK en el ICONO DEL CIRCULO

        if(e.target.classList.contains('completo')){ // En el caso que el icono seleccionado CONTENGA la clase "completo"
            // Removemos la clase
            e.target.classList.remove('completo');
            cambiarEstadoTarea(e.target, 0);

        }else{ // En el caso que el icono seleccionado NO CONTENGA la clase "completo"
            e.target.classList.add('completo');
            cambiarEstadoTarea(e.target, 1);
        }

    }else if(e.target.classList.contains('fa-trash')){ // En el caso que hagamos CLICK en el ICONO DE BORRAR

        // Alerta pregunta si se desea Eliminar
        Swal.fire({
            title: '¿Esta seguro?',
            text: "¡No podrás revertir esto!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, bórralo!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {

                var tareaEliminar = e.target.parentElement.parentElement
                // Borrar de la BD

                // Borrar del HTML
                tareaEliminar.remove();

                // Alerta de Eliminado
                Swal.fire({
                title: '¡Eliminado!',
                text: "Su archivo ha sido eliminado.",
                type: 'success',
                confirmButtonText: 'DE ACUERDO',
                
                })
            }
          })
    }

}

function cambiarEstadoTarea(tarea, estado){ // Cambiamos el los valores de la Base de Datos que hacen referencia al Estado de la Tarea
    var idTarea = tarea.parentElement.parentElement.id.split(':');

    //1) Creamos el objeto AJAX
    var xhr = new XMLHttpRequest();

    //2) Creamos el FormData para enviar por AJAX
    var datos = new FormData();
    datos.append('id_tarea', idTarea[1]);
    datos.append('accion', 'actualizar');
    datos.append('estado', estado);   

    // Abrimos la conexion
    xhr.open('POST', 'inc/modelos/modelo-tarea.php', true);
    
    //4) Recibimos los datos del servidor
    xhr.onload = function(){
        if(this.status === 200){
            console.log(JSON.parse(xhr.responseText));
        }
    }

    //5) Enviamos la peticion
    xhr.send(datos);
}