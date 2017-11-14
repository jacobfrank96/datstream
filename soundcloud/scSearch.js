SC.initialize({
  //client_id: 'f4323c6f7c0cd73d2d786a2b1cdae80c'
  //client_id: 278594df9a311b2a1a56251b3a2b0fbe
  //client_id: 'b8f06bbb8e4e9e201f9e6e46001c3acb'
  //client id: '17a992358db64d99e492326797fff3e8'
  //client_id: 'b8f06bbb8e4e9e201f9e6e46001c3acb'
  client_id: '309011f9713d22ace9b976909ed34a80'
});


var currentTrackPlaying = "";

$(document).ready(function() {
  var currentTrack = "";
  
  $('#btnSearch').click(function() { 
    $("#results").empty(); //clear the results from previous search
    let searchVal = $('#search').val(); //get the value the user searched for
    SC.get('/tracks',{q:`${searchVal}`}).then(function(tracks){ //call Soundcloud api 
     for (var i = 0; i < tracks.length; i++) { //loop through the tracks in the api response 
        $('#results').append($('<li></li>').html(tracks[i].title)); //Print the names of the tracks
        
        var span = document.createElement('span');
        span.innerHTML = `<button id=PlayPause${tracks[i].id} onclick="player(${tracks[i].id})"> play/pause </button>`;
        //span.innerHTML = `<button onclick="player(${tracks[i].id})"> play/pause </button>`;
        $('#results').append(span);
        
        
        
        var span2 = document.createElement('span');
        span2.innerHTML = `<button class="addQueue"  id = addQueue${tracks[i].id} onclick="addQueue(${tracks[i].id})"> Add To Queue </button>`;
        $('#results').append(span2);
        $('#results').append(document.createElement("hr"));
        $('#results').append(document.createElement("br"));
      }
    }); 
  });
  
  console.log("hello");
  //$('#currentTrackController').click(currentTrackController());
  //$('#nextOnQueue').click(playQueue());
  
});






var is_playing = false,
    sound;
var oldSoundID = 0;

function player(id){
    if( sound ) {
      console.log("something was already playing");
      if (parseInt(oldSoundID) == parseInt(id)){
        console.log("same song");
          if(is_playing) {
              sound.pause();
              is_playing = false;
          } else {
              sound.play();
              is_playing = true;
          }
        
        }
        else{
          console.log("different song");
          oldSoundID = id;
          playIt(id);
        }
      //when the song playing finishes we want it to play the next song on the queue
      //sound.on('finished', playQueue());
      //sound.on('finished', console.log("song finished"));
      
        
    } else {
      console.log("nothing was playing before this");
      oldSoundID = id;
      playIt(id);
      //sound.on('finished', playQueue());
    }
}


function playIt(id){
  SC.stream(`/tracks/${id}`).then( function(obj){
            obj.play();
            sound = obj;
            is_playing = true;
        });
  console.log("in playIt function. Id is: " +id);
  //setCurrentTrack(id);
  currentTrackPlaying = id;
}


//function setCurrentTrack(trackId){
//  document.getElementById("currentTrackController").setAttribute("name", trackId.toString());
//  //document.getElementById("currentTrackController").value = trackId;
//  //console.log("tried to set value to " + trackId);
//}
//
//function getCurrentTrack(){
//  var currTrack = document.getElementById("currentTrackController").getAttribute("name");
//}

function currentTrackController(){
  console.log("current track controller clicked");
  player(currentTrackPlaying);
}


var queue = [];
function addQueue(trackID){
  queue.push(trackID);
  console.log(queue);
}

function playQueue(){
  console.log("trying to play next song on the queue");
  if(queue.length>0){
    var songToPlay = queue.shift(); //removes the first element in the queue and returns it
    console.log("playing song: " + songToPlay);
    //playIt(songToPlay);
    player(songToPlay);
    //sound.on('finished', playQueue());
  }
}




//function playIt(songId){
//  //console.log(songId);
// SC.stream(`/tracks/${songId}`).then( function(sound){
//    //console.log("trying to play track id: " + title);
//    sound.play();
// });
//}




