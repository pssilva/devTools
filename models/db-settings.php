<?php
/*
UserCake Version: 2.0.2
http://usercake.com
*/

//Database Information
$db_host = "localhost"; //Host address (most likely localhost)
$db_name = "buscafacil_paulo"; //Name of Database
$db_user = "buscafacil"; //Name of database user
$db_pass = "c1o8g0Cw"; //Password for database user
$db_table_prefix = "";

GLOBAL $errors;
GLOBAL $successes;

$errors = array();
$successes = array();

/* Create a new mysqli object with database connection parameters */
$mysqli = new mysqli($db_host, $db_user, $db_pass, $db_name);

$mysqli->set_charset("utf8");
$mysqli->query("SET NAMES 'utf8' COLLATE 'utf8_general_ci'");

GLOBAL $mysqli;

if(mysqli_connect_errno()) {
	echo "Connection Failed: " . mysqli_connect_errno() ."<br />";
	exit();
}

//Direct to install directory, if it exists
// if(is_dir("install/"))
// {
// 	header("Location: install/");
// 	die();

// }

?>