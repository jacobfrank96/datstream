<?php
// Content of database.php
 
$mysqli = new mysqli('localhost', 'g9', 'z63yQHFd7dnErnwG', 'g9');

//$mysqli = new mysqli('localhost', 'username', 'password', 'databasename');
 
if($mysqli->connect_errno) {
	printf("Connection Failed: %s\n", $mysqli->connect_error);
	exit;
}

?>