<?php
  // Librerias creadas
  include 'inc/templates/header.php';

?>

    <div class="contenedor-formulario">
        <h1>UpTask</h1>
        <form id="formulario" class="caja-login" method="post">
            <div class="campo">
                <label for="usuario">Usuario: </label>
                <input type="text" name="usuario" id="usuario" placeholder="Usuario">
            </div>
            <div class="campo">
                <label for="password">Password: </label>
                <input type="password" name="password" id="password" placeholder="Password">
            </div>
            <div class="campo enviar">
                <input type="hidden" id="tipo" value="login">
                <input type="submit" class="boton" value="Iniciar Sesión">
            </div>

            <div class="campo">
                <a href="crear-cuenta.html">Crea una cuenta nueva</a>
            </div>
        </form>
    </div>

    <script src="js/sweetalert2.all.min.js"></script>

<?php
  // Librerias creadas
  include 'inc/templates/footer.php';
?>