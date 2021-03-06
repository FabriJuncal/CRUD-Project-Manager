<?php

function obtenerPaginaActual() { // Obtenemos un string con el nombre de la pagina en la que nos encontramos

  // pathinfo(): Devuelve información sobre la ruta de un archivo. Devuelve string si sólo se indica una opción de $options, o un array si se solicitan todas.

  // $directorio = "este/es/un/directorio/cualquiera.csv";
  // var_dump(pathinfo($directorio));


  // array (size=4)
  //   'dirname' => string 'este/es/un/directorio' (length=21)
  //   'basename' => string 'cualquiera.csv' (length=14)
  //   'extension' => string 'csv' (length=3)
  //   'filename' => string 'cualquiera' (length=10)


  // var_dump(pathinfo($directorio, PATHINFO_DIRNAME));
  // string 'este/es/un/directorio' (length=21)




  // $_SERVER:  es un array que contiene información, tales como cabeceras, rutas y ubicaciones de script.


  // $ _SERVER ['SCRIPT_NAME']: Esto contiene la ruta del script actual. Si accede a http://example.com/ o http://blog.example.com/index.php, el resultado será: /index.php.

  // $ _SERVER ['REQUEST_URI']: Utilizado para acceder al sitio.

  // $ _SERVER ['PHP_SELF']: Este es el nombre de archivo del script que se está ejecutando actualmente, en relación con la raíz del documento.



  // str_replace(): Reemplaza todas las apariciones del string buscado con el string de reemplazo.

  $archivo = basename($_SERVER['PHP_SELF']);
  $pagina = str_replace(".php", "", $archivo);
  return $pagina;

}

/**  CONSULTAS **/

function obtenerProyectos(){ // Obtenemos todos los Proyectos de la Base de Datos
  include 'conexion.php'; // Obtenemos la conexion

  try {
    // Obtenemos todos los Proyectos de la Base de Datos
    return $conn->query('SELECT id, nombre FROM proyectos');

  } catch (Exception $e) { // En caso de ERROR lo Imprimimos
    echo 'Error!: ' . $e->getMessage();
    return false;
  }
}


function obtenerNombreProyecto($id = NULL){ // Obtenemos el Nombre del Proyecto de la Base de Datos
  include 'conexion.php'; // Obtenemos la conexion

  try {
    // Obtenemos todos los Proyectos de la Base de Datos
  return $conn->query("SELECT nombre FROM proyectos WHERE id = {$id}");

  } catch (Exception $e) { // En caso de ERROR lo Imprimimos
    echo 'Error!: ' . $e->getMessage();
    return false;
  }
}


function obtenerTareaProyecto($id = NULL){ // Obtenemos las Tareas de un Proyecto en especifico
  include 'conexion.php'; // Obtenemos la conexion

  try {
    // Obtenemos todos las Tareas de un Proyecto en especifico 
  return $conn->query("SELECT id, nombre, estado FROM tareas WHERE id_proyecto = {$id}");

  } catch (Exception $e) { // En caso de ERROR lo Imprimimos
    echo 'Error!: ' . $e->getMessage();
    return false;
  }
}

function obtenerTotalTareas($id = NULL, $estado){ // Obtenemos las Tareas de un Proyecto en especifico
  include 'conexion.php'; // Obtenemos la conexion

  try {
    // Obtenemos todos las Tareas de un Proyecto en especifico 
  return $conn->query("SELECT COUNT(*) AS 'totalTareas' FROM tareas WHERE id_proyecto = {$id} AND estado = {$estado}");

  } catch (Exception $e) { // En caso de ERROR lo Imprimimos
    echo 'Error!: ' . $e->getMessage();
    return false;
  }
}

