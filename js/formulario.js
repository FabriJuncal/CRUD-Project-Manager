eventListeners();

function eventListeners(){
    document.querySelector('#formulario').addEventListener('submit', validarRegistro);
}

function validarRegistro(e) {
    e.preventDefault();

    var usuario = document.querySelector('#usuario').value,
        password = document.querySelector('#password').value;

    if(usuario === '' || password === ''){
        Swal.fire({
            type: 'error',
            title: '¡ERROR!',
            text: 'Ambos campos son obligatorios'
          })
    }else{

        Swal.fire({
            type: 'success',
            title: '¡CORRECTO!',
            text: 'Ingreso ambos campos'
          })

    } 
}