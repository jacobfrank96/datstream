<?php
    require 'database.php';
    header("Content-Type: application/json");
    
   
    $stmt = $mysqli->prepare("SELECT id, name from playlists");
    if(!$stmt){
        //printf("Query Prep Failed: %s\n", $mysqli->error);
        echo json_encode(array(
            "success" => false,
            "message" => "Query Prep Failed"
        ));
        //console.log("query prep failed");
        exit;
    }
    
    //$stmt->bind_param('i', $user_id);
	$stmt->execute();
	
    //$stmt->bind_result($name, $date);
    
	//$stmt->fetch();
    $result = $stmt->get_result();
    $i = 0;
    
    $playlists = array(); //here we create an array that will be filled with asscociative arrays for each of the logged in users events
    while($row = $result->fetch_assoc()){
        //console.log("fetching");
        //array[] adds an element to the end of an array 
        //here we are adding an asscociative array to the end of our events array.
       $playlists[] = array( 
            "success" => true,
            "id" => htmlentities($row['id']),
            "name" => htmlentities($row['name'])
        );
       //echo json_encode(array(
       //     "success" =>true,
       //     "name" => $row['name'],
       //     "date" => $row['date']));
    }
    $stmt->close();
    echo json_encode($playlists);
	exit;
	//header("Location: login.php");

 
?>