<aside class="contenedor-proyectos">
        <div class="panel crear-proyecto">
            <a href="#" class="boton">Nuevo Proyecto <i class="fas fa-plus"></i> </a>
        </div>
    
        <div class="panel lista-proyectos">
            <h2>Proyectos</h2>
            <ul id="proyectos">
                <?php
                // Obtenemos todos los Proyectos de la Base de Datos y lo Inyectmos en el HTML
                $proyectos = obtenerProyectos();

                if($proyectos){

                    foreach($proyectos as $proyecto){            ?>
                        <a href="index.php?id_proyecto=<?php echo $proyecto['id']  ?>" id="proyecto:<?php echo $proyecto['id']  ?>">
                            <li class="proyecto-sidebar">     
                                <span class="nombre-proyecto"><?php echo $proyecto['nombre']?></span>
                                <span class="cantidad-tareas">
                                    <span class="cantidad-tareas-completadas">                                     
<?php 
                                        $totalTareas = obtenerTotalTareas($proyecto['id'], 1);  
                                        foreach($totalTareas as $toltaTareasCompletadas){              

                                            echo $toltaTareasCompletadas['totalTareas'];
                                        }
?>
                                    </span>
                                    <span class="cantidad-tareas-incompletas">
<?php 
                                        $totalTareas = obtenerTotalTareas($proyecto['id'], 0);  
                                        foreach($totalTareas as $toltaTareasIncompletas){              

                                            echo $toltaTareasIncompletas['totalTareas'];
                                        }
?>                                       
                                    </span>
                                </span>
                            </li>
                        </a>

<?php
                    }
                }
                
?>
                
            </ul>
        </div>
</aside>