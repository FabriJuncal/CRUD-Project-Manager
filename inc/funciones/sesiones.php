<?php

// Funcion que verifica que el usuario NO este LOGEADO y lo redirecciona al login.php
function usuario_autenticado(){
    if(!revisar_usuario()){
        header('Location:login.php');
        exit();
    }
}

// Funcion que verifica que existan los siguientes datos en la $_SESSION
function revisar_usuario(){
    if( isset($_SESSION['id']) && isset($_SESSION['nombre']) && isset($_SESSION['login']) ){
        return true;
    }
    
}

// Se inicia la Sesion
session_start();

// Se ejecuta la autenticacion del usuario
usuario_autenticado();