
eventListeners();

// Lista de Proyectos
var listaProyectos = document.querySelector('ul#proyectos');

function eventListeners(){ // Funcion para agregar los Eventos con sus Funciones

    //Boton para Crer Proyectos
    document.querySelector('.crear-proyecto a').addEventListener('click', nuevoProyecto);
}

function nuevoProyecto(e){
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

function guardarProyectoBD(nombreProyecto){
    
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
                            <a href="index.php?id_respuesta=${id_proyecto}" id=${id_proyecto}>
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
                                window.location.href = 'index.php?id_respuesta=' + id_proyecto;
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