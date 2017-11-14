Track = function (trackId){
        var currentTrack = "";

        SC.initialize({
            client_id: "17a992358db64d99e492326797fff3e8"
        });

        SC.stream("https://api.soundcloud.com/tracks/" + trackId, function(sound){
            currentTrack = sound;
        });

        this.play = function() {
            currentTrack.play();
        };

        this.pause = function() {
            currentTrack.pause();
        };

        this.stop = function() {
            currentTrack.stop();
        };
    };

    Rotation = function(tracks) {
        var currentTrack = tracks[0];

        this.currentTrack = function () {
            return currentTrack;
        };
    };

var queue = ['108816655'];
function addQueue(trackID){
  queue.push(trackID);
  console.log(queue);
}


$(document).ready(function() {
        $('#btnSearch').click(function() {
                $("#results").empty();
                let searchVal = $('#search').val();
                SC.get('/tracks',{q:`${searchVal}`}).then(function(tracks){
                        for (var i = 0; i < tracks.length; i++) {
                                console.log(tracks[i]);
                                $('#results').append($('<li></li>').html(tracks[i].title));
                                //var span = document.createElement('span');
                                //span.innerHTML = `<button id=${tracks[i].id} onclick="player(${tracks[i].id})"> play/pause </button>`;
                                //$('#results').append(span);
                                
                                var span2 = document.createElement('span');
                                span2.innerHTML = `<button class="addQueue" onclick="addQueue(${tracks[i].id})"> Add To Queue </button>`;
                                $('#results').append(span2);
                                $('#results').append(document.createElement("hr"));
                                $('#results').append(document.createElement("br"));
                        }
                });
    
        });
  
        var rotation = new Rotation(queue);
        var currentTrack = rotation.currentTrack();
        //var currentPlayingTrack = new Track(currentTrack.soundcloud_id);
        var currentPlayingTrack = new Track(currentTrack);


        
        $('#play').on('click', function(event){
            currentPlayingTrack.play();
            $('#pause').show();
            $('#play').hide();
        });

        $('#pause').on('click', function(event){
            currentPlayingTrack.pause();
            $('#pause').hide();
            $('#play').show();
        });

        $('#stop').on('click', function(event){
            currentPlayingTrack.stop();
            $('#pause').hide();
            $('#play').show();
        });        
});



    //$(document).ready (function(){
    //    //var songs = [{"soundcloud_id":"108816655"},{"soundcloud_id":"79408289"}]
    //    var rotation = new Rotation(queue);
    //    var currentTrack = rotation.currentTrack();
    //    //var currentPlayingTrack = new Track(currentTrack.soundcloud_id);
    //    var currentPlayingTrack = new Track(currentTrack);
    //
    //
    //    
    //    $('#play').on('click', function(event){
    //        currentPlayingTrack.play();
    //        $('#pause').show();
    //        $('#play').hide();
    //    });
    //
    //    $('#pause').on('click', function(event){
    //        currentPlayingTrack.pause();
    //        $('#pause').hide();
    //        $('#play').show();
    //    });
    //
    //    $('#stop').on('click', function(event){
    //        currentPlayingTrack.stop();
    //        $('#pause').hide();
    //        $('#play').show();
    //    });        
    //});