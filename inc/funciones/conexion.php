<?php

// CONEXION A LA BASE DE DATOS

$conn = new mysqli('localhost', 'root', '', 'admin_proyectos');

// Mensaje en caso de error
if($conn->connect_error){
    echo 'Se presento el siguiente error: '.$conn->connect_error;
}

$conn->set_charset('utf8');