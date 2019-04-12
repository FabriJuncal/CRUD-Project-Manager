
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
    // Inyectmos HTML
    var nuevoProyecto = document.createElement('li');

    nuevoProyecto.innerHTML = `
        <a href="#">
            ${nombreProyecto}
        </a>
    `;

    listaProyectos.appendChild(nuevoProyecto);
}