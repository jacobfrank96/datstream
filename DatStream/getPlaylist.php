<?php
    require 'database.php';
    header("Content-Type: application/json");
    
    //ini_set("session.cookie_httponly", 1);
    //session_start();
 

    //if(isset($_SESSION['user_id'])){
    //    $user_id = $_SESSION['user_id'];
    //
    //}
    //else{
    //     echo json_encode(array(
    //        "success" => false,
    //        "message" => "Not Logged In"
    //    ));
    //    //console.log("query prep failed");
    //    exit;
    //}
    
    //console.log($user_id);
    $stmt = $mysqli->prepare("SELECT playlistId, trackId, trackName, type from tracks");
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
    
    $tracks = array(); //here we create an array that will be filled with asscociative arrays for each of the logged in users events
    while($row = $result->fetch_assoc()){
        //console.log("fetching");
        //array[] adds an element to the end of an array 
        //here we are adding an asscociative array to the end of our events array.
       $tracks[] = array( 
            "success" => true,
            "id" => htmlentities($row['playlistId']),
            "trackId" => htmlentities($row['trackId']),
            "trackname" => htmlentities($row['trackName']),
			"type" => htmlentities($row['type'])
        );
       //echo json_encode(array(
       //     "success" =>true,
       //     "name" => $row['name'],
       //     "date" => $row['date']));
    }
    $stmt->close();
    echo json_encode($tracks);
	exit;
	//header("Location: login.php");

 
?>