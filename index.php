<?php
  // Librerias creadas
  include 'inc/funciones/sesiones.php'; // Importamos la SESION para que los usuarios no puedan ingresar a index.php mediante la URL
  include 'inc/templates/header.php'; // Importamos el encabezado
  include 'inc/templates/barra.php'; // Importamos la barra de menu

?>

<div class="contenedor">
    
    <?php include 'inc/templates/sidebar.php'; // Importamos la barra izquierda ?>

    <main class="contenido-principal">

    <!-- Boton para Eliminar el Proyecto -->
    <div class="accionesProyecto">
    <div class="boton-acciones-proyecto">
            <a href="#"><i class="boton btn-proyecto fas fa-edit" id="btn-modificar-proyecto"></i></a>
            <a href="#"><i class="boton btn-proyecto fas fa-trash" id="btn-eliminar-proyecto"></i></a>
    </div>
    </div>

<?php
    // Obtenemos el ID de la URL
    $id_proyecto = '';
    if(isset($_GET['id_proyecto'])){
        $id_proyecto = $_GET['id_proyecto'];

?>   
        <h1> Proyecto Actual: 
<?php 
        $proyecto = obtenerNombreProyecto($id_proyecto);  
        foreach($proyecto as $nombre){              
?>
            <span><?php echo $nombre['nombre']; ?></span>

<?php    }
?>
            
        </h1>

        <form action="#" class="agregar-tarea">
            <div class="campo">
                <label for="tarea">Tarea:</label>
                <input type="text" placeholder="Nombre Tarea" class="nombre-tarea"> 
            </div>
            <div class="campo enviar">
                <input type="hidden" id="id_proyecto" value="<?php echo $id_proyecto; ?>">
                <input type="submit" class="boton nueva-tarea" value="Agregar">
            </div>
        </form>

       
        <!-- BARRA DE PROGRESO -->
        <div class="avance"></div>

        <h2>Listado de tareas:</h2>

        <div class="listado-pendientes">
            <ul>
<?php
                    // Obtenemos las Tareas del Proyecto seleccionado
                    $tareas = obtenerTareaProyecto($id_proyecto);

                    if($tareas->num_rows > 0){ // En el caso que el Proyecto TENGA Tareas 
                        foreach($tareas as $tarea){
?>
                            <li id="tarea:<?php echo $tarea['id'] ?>" class="tarea">
                            <p><?php echo $tarea['nombre'] ?></p>
                                <div class="acciones">
                                    <!-- Hacemos uso del OPERADOR TERNARIO de PHP: Es una condicional en una sola linea -->
                                    <i class="far fa-check-circle <?php echo ($tarea['estado'] === '1' ? 'completo' : '') ?>"></i>
                                    <i class="fas fa-trash"></i>
                                </div>
                            </li>  
<?php                           
                        }

                    }else{ // En el caso que el Proyecto NO TENGA Tareas
?>
                        <p class = "fuente-secundaria mnj-sin-tareas"> No hay tareas en este Proyecto </p>
<?php
                    }
                    
?>

                
            </ul>
        </div>
    </main>
</div><!--.contenedor-->

<?php
    }else{ // En el caso que no se halla seleccionado ningun proyecto

?>
       <div class="listado-pendientes">
            <h2 class="fuente-secundaria">Selecciona un Proyecto</h2>
       </div>

<?php
    }   
?> 

<?php
  // Librerias creadas
  include 'inc/templates/footer.php';

?>
