<?php
  // Librerias creadas
  include 'inc/funciones/funciones.php';
  include 'inc/funciones/conexion.php';

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>UpTask</title>
    <link rel="stylesheet" href="css/fontawesome-all.min.css">
    <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.0/normalize.css">
    <!-- Fuentes de Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Lato:400,700,900" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet">
    <!-- Estilos del Plugin SweetAlert2 -->
    <link rel="stylesheet" href="css/sweetalert2.min.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<!-- Con la funcion PHP determinamos en que pagina estamos y le asignamos la CLASE -->
<body class="<?php echo obtenerPaginaActual() ?>">