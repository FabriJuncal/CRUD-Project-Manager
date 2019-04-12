<?php
  // Librerias creadas
  include 'inc/funciones/sesiones.php'; // Importamos la SESION para que los usuarios no puedan ingresar a index.php mediante la URL
  include 'inc/templates/header.php'; // Importamos el encabezado
  include 'inc/templates/barra.php'; // Importamos la barra de menu

?>




<div class="contenedor">
    
    <?php include 'inc/templates/sidebar.php'; // Importamos la barra izquierda ?>

    <main class="contenido-principal">
        <h1>
            <span>Diseño de Página Web</span>
        </h1>

        <form action="#" class="agregar-tarea">
            <div class="campo">
                <label for="tarea">Tarea:</label>
                <input type="text" placeholder="Nombre Tarea" class="nombre-tarea"> 
            </div>
            <div class="campo enviar">
                <input type="hidden" id="id_proyecto" value="id_proyecto">
                <input type="submit" class="boton nueva-tarea" value="Agregar">
            </div>
        </form>
        
 

        <h2>Listado de tareas:</h2>

        <div class="listado-pendientes">
            <ul>

                <li id="tarea:<?php echo $tarea['id'] ?>" class="tarea">
                <p>Cambiar el Logotipo</p>
                    <div class="acciones">
                        <i class="far fa-check-circle"></i>
                        <i class="fas fa-trash"></i>
                    </div>
                </li>  
            </ul>
        </div>
    </main>
</div><!--.contenedor-->

<?php
  // Librerias creadas
  include 'inc/templates/footer.php';

?>
