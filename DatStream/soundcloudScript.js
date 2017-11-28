SC.initialize({
  client_id : '72e56a72d70b611ec8bcab7b2faf1015'
});

$(document).ready(function() {
    $('#btnSearch').click(function() {
      $("#soundcloudResults").empty();
      let searchVal = $('#search').val();
      SC.get('/tracks',{q:`${searchVal}`}).then(function(tracks){
        for (var i = 0; i < tracks.length; i++) {
          $('#soundcloudResults').append($('<li></li>').html(tracks[i].title));
          var span2 = document.createElement('span');
          span2.innerHTML = `<button class="addQueue"  id = addQueue${tracks[i].id} onclick="addQueue(${tracks[i].id})"> Add To Queue </button>`;
          var span = document.createElement('span');
          //var trackTitle = tracks[i].title;
          span.innerHTML = `<button id=PlayPause${tracks[i].id} onclick="player(${tracks[i].id})"> play/pause </button>`;
          $('#soundcloudResults').append(span);
          $('#soundcloudResults').append(span2);
          $('#soundcloudResults').append(document.createElement("hr"));
          $('#soundcloudResults').append(document.createElement("br"));
          
        }
      });
    }); 
      
      
      
      $('#playQueue').click(function() {
        var id = $('#currTrack').text();
        //var id = 108816655;
        console.log(id);
        player(id);
      });
    
    
});


var is_playing = false,
    sound;
var oldSoundID = 0;

function player(id){
    $("#currTrack").empty();
    $('#currTrack').append($('<p></p>').html(id));
    
    if( sound ) {
        console.log("something was already playing");
        if (parseInt(oldSoundID) == parseInt(id)){
            console.log("same song");
            if(is_playing) {
                //$("#playQueue").prop('text', 'Play');
                $("#playQueue span").text("Play");
                sound.pause();
                is_playing = false;
            }
            else {
                //$("#playQueue").prop('text', 'Pause');
                $("#playQueue span").text("Pause");
                sound.play();
                is_playing = true;
              }
        }
        else{
            console.log("different song");
            oldSoundID = id;
            play(id);
        }
     
    }
    else {
      console.log("nothing was playing before this");
      oldSoundID = id;
      play(id);
    }
}

function play(id){
  queue.unshift(id);
  playQueue();
  console.log("in play function. Id is: " +id);
  currentTrackPlaying = id;
}


function playQueue(){
  
  if(queue.length>0){
      var songToPlay = queue.shift(); //removes the first element in the queue and returns it
      //console.log("playing song: " + songToPlay); 
      SC.stream(`/tracks/${songToPlay}`).then(function(track){
          track.play();
          
          sound = track;
          is_playing = true;
          
          track.on('finish', function(){
            console.log("The track finished");
            playQueue();  
          });    
        });
  } 
}


var queue = [];
function addQueue(trackID){
  queue.push(trackID);
  console.log(queue);
}



//$('#playQueue').click(playQueue());