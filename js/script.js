
eventListeners();

// Obtenemos el Nodo de la Lista de Proyectos
var listaProyectos = document.querySelector('ul#proyectos');

// Obtenemos el valor del ID del proyecto enviado por GET
var id_proyecto = obtenerValorURL('id_proyecto');


function eventListeners(){ // Funcion para agregar los Eventos con sus Funciones

    // Se ejecuta la siguiente funcion cuando se carga la Pagina
    document.addEventListener('DOMContentLoaded', function(){
        // Verifica si existen Tareas Pendientes y si Existen Actualiza el Progreso
        barraProgreso();
    })

    // Cerramos Sesion
    document.querySelector('#cerrar-sesion').addEventListener('click', cerrarSession);

    //Boton para Crer Proyectos
    document.querySelector('.crear-proyecto a').addEventListener('click', nuevoProyecto);

    //Boton para Eliminar Proyectos
    if(document.querySelector('#btn-eliminar-proyecto')){
        document.querySelector('#btn-eliminar-proyecto').addEventListener('click', accionesProyecto);
    }

    //Boton para modificar Proyectos
    if( document.querySelector('#btn-modificar-proyecto')){
        document.querySelector('#btn-modificar-proyecto').addEventListener('click', cambiarNombreProyecto)
    }

    //Boton para Agregar una Tarea a un Proyecto
    if(document.querySelector('.nueva-tarea')){
        document.querySelector('.nueva-tarea').addEventListener('click', agregarTarea);
    }

    // Botones para las Acciones de las Tareas
    if(document.querySelector('.listado-pendientes')){
        document.querySelector('.listado-pendientes').addEventListener('click', accionesTareas);
    }
    
}

/*** PROYECTOS ***/

function nuevoProyecto(e){ // Creamos el evento para crear un Nuevo Proyecto y lo mostramos en el Frontend
    e.preventDefault(); // Quitamos el evento predeterminado

    // Creamos un <input> para el nombre  del nuevo proyecto
    var nuevoProyecto = document.createElement('li');
    nuevoProyecto.innerHTML = '<input type="text" id="nuevo-proyecto">';
    listaProyectos.appendChild(nuevoProyecto);
    
    // Seleccionamos el ID con el nuevoProyecto
    var inputNuevoProyecto = document.querySelector('#nuevo-proyecto');
    
    inputNuevoProyecto.focus();

    // Al presionar la tecla ENTER se crea un Nuevo Proyecto
    inputNuevoProyecto.addEventListener('keypress', function(e){
        
        // Se le asigna a una variable el valor ascii de la tecla presionada
        var tecla = e.which || e.keycode;

        if(tecla === 13){ // En el caso que se presione la tecla Enter

            if(inputNuevoProyecto.value != ''){ // En el caso que el valor del input no este vacio

                guardarProyectoBD(inputNuevoProyecto.value);
                listaProyectos.removeChild(nuevoProyecto);

            }else{ // En el caso que el valor del input este vacio
                // Plugin.js - Alerta con animacion - SweetAlert2
                Swal.fire({
                    title: '¡ERROR!',
                    text: 'El nombre del Proyecto no puede ir vacio',
                    type: 'error'
                })

                // Hacemos referencia al Nodo padre del INPUT lo Eliminamos del DOM
                inputNuevoProyecto.parentElement.remove();
            }
            
            
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
                            <a href="index.php?id_proyecto=${id_proyecto}" id="proyecto:${id_proyecto}">
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

function accionesProyecto(e){ // Mediante AJAX Eliminamos el Proyecto de la Base de Datos y del HTML
    e.preventDefault();

    
    if(id_proyecto != ''){
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

                // Hacemos referencia al nodo con el Nombre del Proyecto
                nodoProyecto = document.querySelector(`a[href*="index.php?id_proyecto=${id_proyecto}"]`);

                // Eliminamos el nodo con el Nombre del Proyecto del HTML
                nodoProyecto.remove();

                // Eliminamos el Proyecto de la Base de Datos
                eliminarProyectoBD(id_proyecto);

                
                // Alerta de Eliminado
                Swal.fire({
                title: '¡Eliminado!',
                text: "Se ha eliminado el Proyecto.",
                type: 'success',
                confirmButtonText: 'DE ACUERDO',
                
                }).then(resultado => { // Redireccionamos al archivo index.php
                    if(resultado.value){
                        window.location.href = 'index.php';
                    }
                })

                
            }


          })  
    }

}

function eliminarProyectoBD(id_proyecto){ // Mediante AJAX Eliminamos el Proyecto de la Base de Datos

    //1) Creamos el Objeto AJAX
    xhr = new XMLHttpRequest();

    //2) Creamos el FormData para enviar por AJAX
    var datos = new FormData();
        datos.append('id_proyecto', id_proyecto);
        datos.append('accion', 'eliminar');

    //3) Abrimos la Conezion
    xhr.open('POST', 'inc/modelos/modelo-proyecto.php');

    //4) Recibimos los datos del servidor
    xhr.onload = function(){
        console.log(JSON.parse(xhr.responseText));
    }

    //5) Enviamos la peticion
    xhr.send(datos);
}

function cambiarNombreProyecto(e){ // Modificamos el Nombre del Proyecto del HTML

        e.preventDefault(); // Quitamos el evento predeterminado

        // Declaramos a una variable, el nombre Actual del Proyecto
        nombreActualProyecto = document.querySelector(`a[href*="index.php?id_proyecto=${id_proyecto}"] .nombre-proyecto`).innerText;

        // Agregamos el nombre actual del proyecto en una variable
        var nombreProyeto = document.querySelector('.nombreProyecto').innerText;

        // Creamos el input y como valor le pasamos el Nombre Actual del Proyecto
        inputNombreProyecto = document.querySelector('.nombreProyecto');
        inputNombreProyecto.innerHTML = `<input type="text" id="nombreProyecto" value="${nombreProyeto}">`;
        
        // Al hace CLICK en el Boton de Modificar Nombre Proyecto, Enfocamos al Input que aparece
        document.querySelector('#nombreProyecto').focus();

        // Al presionar una tecla se ejecuta la siguiente funcion
        inputNombreProyecto.addEventListener('keypress', function(e){
            

            // Le asignamos a la variable "tecla" el valor asci de la tecla presionada
            var tecla = e.which || e.keycode;
            // console.log(tecla); 
            if(tecla === 13){ // Si "tecla" es igual al valor 13, quiere decir que presionamos la tecla ENTER, ya que el codigo ascii de ENTER es 13
                
                // Verificamos que exista el Nodo Mensionado
                if(document.querySelector('input#nombreProyecto')){
                    // Verificamos que el valor del Nodo sea Diferente de vacio
                    if (document.querySelector('input#nombreProyecto').value != "" ) {

                        // Le declaramos a una variable el valor que contiene el INPUT en el momento que presionamos la tecla ENTER
                        nuevoNombreProyecto = document.querySelector('input#nombreProyecto').value;
                        inputNombreProyecto.innerHTML = `${nuevoNombreProyecto}`;
                        
                        // Hacemos referencia al nodo con el Nombre del Proyecto
                        nodoProyecto = document.querySelector(`a[href*="index.php?id_proyecto=${id_proyecto}"] .nombre-proyecto`);

                        // Cambiamos el Nombre del Proyecto de la Barra Lateral
                        nodoProyecto.innerHTML = nuevoNombreProyecto;

                        modificarNombreProyectoBD(nuevoNombreProyecto);

                        Swal.fire({
                            position: 'center',
                            type: 'success',
                            title: 'Se cambio el nombre del proyecto',
                            showConfirmButton: false,
                            timer: 1700
                            })

                    }else{
                        // Si el valor del campo esta vacio, el nombre del proyecto queda como estaba
                        inputNombreProyecto.innerHTML = `${nombreActualProyecto}`;

                    }
                }
            }

    })
}

function modificarNombreProyectoBD(nuevoNombreProyecto){ // Mediante AJAX Modificamos el Nombre del Proyecto de la Base de Datos
    //1) Creamos el Objeto AJAX
    xhr = new XMLHttpRequest();

    //2) Creamos el FormData para enviar por AJAX
    var datos = new FormData();
        datos.append('id_proyecto', id_proyecto);
        datos.append('proyecto', nuevoNombreProyecto);
        datos.append('accion', 'modificar');

    //3) Abrimos la Conezion
    xhr.open('POST', 'inc/modelos/modelo-proyecto.php');

    //4) Recibimos los datos del servidor
    xhr.onload = function(){
        console.log(JSON.parse(xhr.responseText));
    }

    //5) Enviamos la peticion
    xhr.send(datos);
}

/*** TAREAS ***/

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

                        // Actulizamos los Contadores de Tareas de la Barra Lateral
                        tareasBarraLateral('creoTarea');

                         // En el caso que Existan Tareas Pendientes, Se mostrará y actualizará la Barra de Progreso
                         barraProgreso();

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

                // Alerta de Eliminado
                Swal.fire({
                title: '¡Eliminado!',
                text: "Se ha eliminado la Tarea.",
                type: 'success',
                confirmButtonText: 'DE ACUERDO',
                
                }).then(resultado => { // Redireccionamos al archivo index.php
                    if(resultado.value){
                        
                        var tareaEliminar = e.target.parentElement.parentElement
                        
                        var estadoTarea = e.target.parentElement.firstChild.nextElementSibling.classList.contains('completo');

                        // Borrar del HTML
                        tareaEliminar.remove();

                        // Actulizamos los Contadores de Tareas de la Barra Lateral
                        tareasBarraLateral('eliminoTarea', estadoTarea);
                    
                        // Borrar de la BD
                        eliminarTareaBD(tareaEliminar);
                    }
                })

                
            }


          })  
          
    }

}

function eliminarTareaBD(tarea){ // Eliminamos la Tarea de la Base de Datos mediante AJAX
   
    var idTarea = tarea.id.split(':');

    // Cambiamos de valor del Total de Tareas Completas e Incompletas de la Barra Lateral
    // tareasBarraLateral('eliminoTarea', idTarea[1]);

    //1) Creamos el objeto AJAX
    var xhr = new XMLHttpRequest();

    //2) Creamos el FormData para enviar por AJAX
    var datos = new FormData();
    datos.append('id_tarea', idTarea[1]);
    datos.append('accion', 'eliminar');

    //3) Abrimos la conexion
    xhr.open('POST', 'inc/modelos/modelo-tarea.php', true);
    
    //4) Recibimos los datos del servidor
    xhr.onload = function(){
        if(this.status === 200){
            console.log(JSON.parse(xhr.responseText));

            // Comprobamos que halla tareas restantes
            var listaTareasRestantes = document.querySelectorAll('li.tarea');

            if(listaTareasRestantes.length === 0){ // En el caso que no halla Tareas Restantes, se muestra el siguiente mensaje de Lista Vacia
                
                // Si el Proyecto no contiene Tareas, Eliminamos el nodo de la Barra de Progreso
                barraProgreso();

                // Mostramos un mensaje que dice que no hay Tareas en el Proyecto
                document.querySelector('.listado-pendientes ul').innerHTML = '<p class = "fuente-secundaria mnj-sin-tareas"> No hay tareas en este Proyecto </p>';

            }else{

                setTimeout(() => {
                    // Actualizamos la Barra de Progreso
                    barraProgreso();
                },900)
              
            }

            
        }
    }

    //5) Enviamos la peticion
    xhr.send(datos);
}

function cambiarEstadoTarea(tarea, estado){ // Cambiamos el los valores de la Base de Datos que hacen referencia al Estado de la Tarea
    
    var idTarea = tarea.parentElement.parentElement.id.split(':');

   // Actulizamos los Contadores de Tareas de la Barra Lateral
    tareasBarraLateral('cambioEstadoTarea',estado);

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

            // Actualizamos la Barra de Progreso
            barraProgreso();
        }
    }

    //5) Enviamos la peticion
    xhr.send(datos);
}


function barraProgreso(){ // Verificamos la lista de Tareas y segun halla o no Tareas  Mostramos u Ocultamos la Barra de Progreso

    // Seleccionamos todos los Nodos 'li.tarea'
    var listaTareasRestantes = document.querySelectorAll('li.tarea');

    if(listaTareasRestantes.length === 0){ // En el caso que no halla Tareas Restantes, se muestra el siguiente mensaje de Lista Vacia

        if( document.querySelector('span.barra-progreso')){ // En el caso que existe el Nodo
        // Si el Proyecto no contiene Tareas, Eliminamos el nodo de la Barra de Progreso
        document.querySelector('span.barra-progreso').remove()
        }


        // Mostramos un mensaje que dice que no hay Tareas en el Proyecto
        if(document.querySelector('.listado-pendientes ul')){
            document.querySelector('.listado-pendientes ul').innerHTML = '<p class = "fuente-secundaria mnj-sin-tareas"> No hay tareas en este Proyecto </p>';
        }

    }else { // En el caso que halla tareas en la lista


        if(!document.querySelector('span.barra-progreso')){ // En el caso que no Exista el NODO

            // Creamos el Nodo de la Barra de Progreso
            var BarraProgreso = document.createElement('span');
            BarraProgreso.classList.add('barra-progreso');
            BarraProgreso.innerHTML = `
                <h2>Avance del Proyecto</h2>
                <div id="barra-avance" class="barra-avance">
                    <div id="porcentaje" class="porcentaje porcentaje-gradiante"></div>
                </div>
            `;
            document.querySelector('div.avance').appendChild(BarraProgreso);
        }
        

        // Actualizamos la Barra de Progreso
        // Obtenemos todas las Tareas
        const tareas = document.querySelectorAll('li.tarea');

        // Obtenemos las Tareas Completadas
        const tareasCompletadas = document.querySelectorAll('i.completo');

        // Determinamos el Avance
        // Math.round: redondea el valor numerico
        const avance = Math.round( (tareasCompletadas.length / tareas.length) * 100 );

        // Asignamos el Avance a la Barra de Progreso
        const porcentaje = document.querySelector('#porcentaje');
        porcentaje.style.width = avance + '%';

        
        // Mostramos Alerta cuando Completamos Todas las Tareas
        if(avance === 100){

            setTimeout(() => {
                // Alerta del plugin SweetAlert2
                Swal.fire({
                    title: '¡Proyecto Completado!',
                    text: "No hay tareas pendientes en el Proyecto.",
                    type: 'success',
                    confirmButtonText: 'DE ACUERDO',
                    
                })
            },1000)
        
        }

        if(document.querySelector('.mnj-sin-tareas')){ // En el caso que exista el Nodo
            //Removemos el mensaje de lista vacia
            document.querySelector('.mnj-sin-tareas').remove();

        }
        
    }

}

function tareasBarraLateral(accion, estado = null){ // Actualiza los Contadores de Tareas Completas e Incompletas de la Barra Lateral

    // Cambiamos de valor del Total de Tareas Completas e Incompletas de la Barra Lateral

    // Total Tareas Completas
    nodoTareasCompletas = document.querySelector(`a[href*="index.php?id_proyecto=${id_proyecto}"] li .cantidad-tareas-completadas`);
    tareasCompletadas = parseInt(nodoTareasCompletas.innerText);

    // Total Tareas Incompletas
    nodoTareasIncompletas = document.querySelector(`a[href*="index.php?id_proyecto=${id_proyecto}"] li .cantidad-tareas-incompletas`);
    tareasIncompletadas = parseInt(nodoTareasIncompletas.innerText); 

    if(accion === 'cambioEstadoTarea'){ // En el caso que se halla Cambiado el estado de una Tarea

        if(estado === 1){ // En el caso que el estado de la Tarea sea Completado

            totalTareasCompletadas = tareasCompletadas + 1;
            totalTareasIncompletadas = tareasIncompletadas -1

            nodoTareasCompletas.innerHTML = `${totalTareasCompletadas}`;
            nodoTareasIncompletas.innerHTML = `${totalTareasIncompletadas}`;

        }else if(estado === 0){ // En el caso que el estado de la Tarea sea Incompleto

            totalTareasIncompletadas = tareasIncompletadas + 1;
            totalTareasCompletadas = tareasCompletadas - 1;

            nodoTareasIncompletas.innerHTML = `${totalTareasIncompletadas}`;
            nodoTareasCompletas.innerHTML = `${totalTareasCompletadas}`;
        }

    }else if(accion === 'creoTarea'){ // En el caso que se halla Creado una Tarea
        totalTareasIncompletadas = tareasIncompletadas + 1;
        nodoTareasIncompletas.innerHTML = `${totalTareasIncompletadas}`;

    }else if(accion === 'eliminoTarea'){ // En el caso que se halla Eliminado una Tarea

        if(estado === true){

            totalTareasCompletadas = tareasCompletadas - 1;
            nodoTareasCompletas.innerHTML = `${totalTareasCompletadas}`;  

        }else{

            totalTareasIncompletadas = tareasIncompletadas - 1;
            nodoTareasIncompletas.innerHTML = `${totalTareasIncompletadas}`;
        }

    }
}

/*** OTRAS FUNCIONES ***/

function cerrarSession(){ // Mostramos Aviso de Sesion Cerrada
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
      });
      
      Toast.fire({
        type: 'error',
        title: '¡Sesion cerrada!'
      }).then(resultado =>{ // Redireccionamos al proyecto recien creado
        
            window.location.href = 'login.php?cerrar_sesion=true';
        
    });
     
}

function obtenerValorURL(name) { // Obtenemos el valores de la URL. En este caso obtenemos el valor del ID del proyecto
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

