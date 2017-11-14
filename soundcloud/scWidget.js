//<iframe width="630" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/33820987&amp;auto_play=false&amp;hide_related=true&amp;show_comments=false&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>



SC.initialize({
  client_id: '309011f9713d22ace9b976909ed34a80'
});


//var currentTrackPlaying = "";

$(document).ready(function() {
  //var currentTrack = "";
  
  $('#btnSearch').click(function() { 
    $("#results").empty(); //clear the results from previous search
    let searchVal = $('#search').val(); //get the value the user searched for
    SC.get('/tracks',{q:`${searchVal}`}).then(function(tracks){ //call Soundcloud api 
     for (var i = 0; i < tracks.length; i++) { //loop through the tracks in the api response 
        $('#results').append($('<li></li>').html(tracks[i].title)); //Print the names of the tracks
        
        var span = document.createElement('span');
        span.innerHTML = `<iframe id = iframe${i} width="630" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${tracks[i].id}&amp;auto_play=false&amp;hide_related=true&amp;show_comments=false&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>`;
        //span.innerHTML = `<button onclick="player(${tracks[i].id})"> play/pause </button>`;
        $('#results').append(span);
        
        
        
        //var span2 = document.createElement('span');
        //span2.innerHTML = `<button class="addQueue"  id = addQueue${tracks[i].id} onclick="addQueue(${tracks[i].id})"> Add To Queue </button>`;
        //$('#results').append(span2);
        //$('#results').append(document.createElement("hr"));
        //$('#results').append(document.createElement("br"));
      }
    });
    //$(".results span iframe").each(function(){ //loop trough all the iframes loaded to the page from the search results
    //    console.log("loop");
    //    $(this).bind(SC.Widget.Events.READY, function () {
    //        $(this).bind(SC.Widget.Events.PLAY, function () {
    //            // get information about currently playing sound
    //            $(this).getCurrentSound(function (currentSound) {
    //                console.log('Current Track: ' + currentSound.get('') + '');
    //            });
    //        });
    //    });
    //});
    console.log("will we see iframes?");
    var iframes = document.getElementsByTagName("iframe");
    console.log(iframes);
    for (iframe in iframes){
        console.log("iframe technique 1: " + iframe);
    }
    console.log(iframes.length);
    for(i = 0; i < iframes.length; i++){   
        // do something with iframes[i]
        console.log(i);
        var $widgets = SC.Widget($iframes[i]);
        $widgets.bind(SC.Widget.Events.READY, function () {
            $widgets.bind(SC.Widget.Events.PLAY, function () {
            // get information about currently playing sound
                $widgets.getCurrentSound(function (currentSound) {
                    console.log('Current Track: ' + currentSound.get('') + '');
                });
            });
        });
    }
    console.log("got here?");
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







