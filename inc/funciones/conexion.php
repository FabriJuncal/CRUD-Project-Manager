<?php

$conn = new mysqli('localhost', 'root', '', 'admin_proyectos');

if($conn->connect_error){
    echo 'Se presento el siguiente error: '.$conn->connect_error;
}

$conn->set_charset('utf8');