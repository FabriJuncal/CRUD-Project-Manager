<script src='<script src="https://cdn.jsdelivr.net/npm/sweetalert2@8'></script>"></script>



<?php

    // Obtenemos la Pagina Actual
    $actual = obtenerPaginaActual();

    // Creamos una condicional. Si nos encontramos en la Pagina de "Crear Cuenta" o "Login", se carga el siguiente SCRIPT
    if($actual === 'crear-cuenta' || $actual === 'login'){
        echo '<script src="js/formulario.js"></script>';
    }

?>

</body>
</html>