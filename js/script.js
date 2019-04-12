
eventListeners();

// Lista de Proyectos
var listaProyectos = document.querySelector('ul#proyectos');

function eventListeners(){
    //Boton para Crer Proyectos
    document.querySelector('.crear-proyecto a').addEventListener('click', nuevoProyecto);
}

function nuevoProyecto(e){
    e.preventDefault();
    console.log('Presionaste Nuevo Proyecto');
            

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
    datos.append('accion', 'crer');

    //3) Abrimos la conexion
    xhr.open('POST', 'inc/modelos/modelo-proyecto.php', true);

    //4) Recibimos los datos del servidor
    xhr.onload = function(){
        if(this.status === 200){
            console.log(JSON.parse(xhr.responseText));
        }
    }

    //5) Enviamos el Request
    xhr.send(datos);

    // Inyectmos HTML
    // var nuevoProyecto = document.createElement('li');

    // nuevoProyecto.innerHTML = `
    //     <a href="#">
    //         ${nombreProyecto}
    //     </a>
    // `;

    //listaProyectos.appendChild(nuevoProyecto);
}