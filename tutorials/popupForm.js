//$(function() {
//    $(".addToPlaylistBtn").click(function() {
//        $("#myform #valueFromMyButton").text($(this).val().trim());
//        //$("#myform input[type=text]").val('');
//        //$("#valueFromMyModal").val('');
//        $("#myform").show(500);
//    });
//    $("#btnOK").click(function() {
//        //$("#valueFromMyModal").val($("#myform input[type=text]").val().trim());
//        var trackId = $("#myform #valueFromMyButton").val().trim();
//        console.log("track id: " + trackId);
//        var playlistId = $('#myForm input[name=rbnNumber]:checked').val(); 
//        //$('p').html('<br/>Selected Radio Button Value is : <b>' + playlistId + '</b>');
//        add(playlistId,trackId);
//        $("#myform").hide(400);
//    });
//});

const app = {};

app.apiUrl = 'https://api.spotify.com/v1';

var access_token = "BQA51DPYQIxB-G5zncyy1FPdN9XGGQbq9m1xw6i9Q18DruAB2eGDFdd6hIsVj63YFGFCRLk4t5ClzThq_thz_Y6Pr30eAqUl-xiWmT2mbgo4CAZvhzA2dbJo-Eq0H-H5QdiTRbOmJ8Ql9SqpA4D1gxHdxx3giOAyJU3rIr-1VCCmsLvOW7xdhIviqEDbTzZdCYJfoB-Br_au2M6AZzmqi6TMTXgbL8niQc3pOoG_NflLYoob6aawahV3jZH90fiNSLHkYUTYsAJuVmcrNg";

app.getPlaylists = function(){
	// The XMLHttpRequest is simple this time:
    //console.log("clicked");
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", "getPlaylists.php", true);
	xmlHttp.addEventListener("load", app.getPlaylistsCallback, false);
	xmlHttp.send(null);
};
 
app.getPlaylistsCallback = function(event){
    console.log("callback");
    console.log(event.target.responseText);
    var jsonData = JSON.parse(event.target.responseText);
        
    console.log("json data: " +  jsonData);
    for(var e in jsonData){
        if(jsonData[e].success){
            var playlistId = jsonData[e].id;
            var playlistName= jsonData[e].name;
            
            var radioBtn = $(`<input type="radio" name="rbnNumber" value=${playlistId} />${playlistName}</br>`);
            radioBtn.appendTo('#myform');
        }
        else{
            console.log("failure");
        }
    }
	
};


app.add = function(playlistId, trackId,trackName,trackType){
    console.log("Selected Radio Button Value is " + playlistId);
    
	//var trackId = '276572174';
    //var trackName = 'Captain Underpants - Stinky Jones x Max Gertler x Dashel [prod. stinky jones & max gertler]';
	//var trackType = 'soundcloud';
    
	// Make a URL-encoded string for passing POST data:
	var dataString = "trackId=" + encodeURIComponent(trackId) + "&trackName=" + encodeURIComponent(trackName) +"&trackType=" + encodeURIComponent(trackType) +"&playlistId=" + encodeURIComponent(playlistId);
 
	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST", "addToPlaylist.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
	xmlHttp.addEventListener("load", function(event){
        console.log(event.target.responseText);
		var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
		if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
			alert("Added to Playlist! " + jsonData.message);
		}else{
			alert("Could not add to playlist.  "+jsonData.message);
		}
	}, false); // Bind the callback to the load event
	xmlHttp.send(dataString); // Send the data
}


//$(document).ready(function(){
//    getPlaylists();
//    $('#btnAddToPlaylist').click(function() {
//        var playlistId = $('#playlists input[name=rbnNumber]:checked').val(); 
//        $('p').html('<br/>Selected Radio Button Value is : <b>' + playlistId + '</b>');
//        add(playlistId);
//    });
//    //$('#btnAddToPlaylist').click(add);
//});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////


SC.initialize({
  client_id : '72e56a72d70b611ec8bcab7b2faf1015'
});



app.searchArtist = (artistName) => $.ajax({
    //url: '${app.apiUrl}/search',
    url: 'https://api.spotify.com/v1/search',
    headers: { 'Authorization': 'Bearer ' + access_token },
    method : 'GET',
    dataType: 'json',
    data: {
        q: artistName,
        type: 'artist'
    }
});


//with the ids we want to get the albums
app.getArtistAlbums = (artistId) => $.ajax({
    //url: '${app.apiUrl}/artists/${artistId}/albums',
    url: 'https://api.spotify.com/v1/artists/'+artistId+'/albums',
    headers: { 'Authorization': 'Bearer ' + access_token },
    method: 'GET',
    dataType: 'json',
    data: {
        album_type: 'album'
    }
});

//now we want to get the tracks
app.getArtistTracks = (id) => $.ajax({
    url:  'https://api.spotify.com/v1/albums/'+id+'/tracks',
    headers: { 'Authorization': 'Bearer ' + access_token },
    method: 'GET',
    dataType: 'json'
});



app.retrieveArtistTracks = function(artistAlbums) {
    //console.log(artistAlbums);
    $.when(...artistAlbums)
        .then((...albums) =>{
            albumIds = albums.map(getFirstElement)
                .map(res => res.items)
                //.reduce((prev,curr) => [...prev,...curr],[]) //we are searching for multiple artists so reduce 'flattens' the arrays into one array
                .reduce(flatten,[])
                .map(album => album.id)
                .map(ids => app.getArtistTracks(ids));
                
                //app.buildPlaylist(albumIds);
                console.log(albumIds);
                app.showTracks(albumIds);
                
            
        });
};





app.showTracks = function(tracks) {
    $.when(...tracks)
    .then((...tracksResults) =>{
        tracksResults = tracksResults.map(getFirstElement)
        .map(item => item.items)
        .reduce(flatten,[])
        
        .map(item => item.id);
        console.log(tracksResults);
        if(tracksResults.length<100){
            for (i = 0; i < tracksResults.length; i++) {
                //console.log("did it add?");
				//console.log("spotify:track:" + tracksResults[i]);
				var trackId = "spotify:track:" + tracksResults[i];
                $("#results").append(`<li><div class = "spotify-embeds"><iframe class="embed-responsive-item" src="https://embed.spotify.com/?them=white&uri=spotify:track:${tracksResults[i]}" width="300" height="80" frameborder="0"></iframe></div></li>`);
                var addToPlaylistBtn = $(`<p class="addToPlaylist" value='${trackId}' name = '' title = 'spotify' >Add To Playlist</button>`);
            
                $("#results").append(addToPlaylistBtn);
                $('#results').append(document.createElement("hr"));
                $('#results').append(document.createElement("br"));
            }
        }
        
        
        });
    
   
};


const getFirstElement = (item) => item[0]; //we make this function because we retrieve the first element in the json data alot

const flatten = (prev,curr) => [...prev,...curr]; ////we make this function because we flatten the multiple arrays we get alot



app.retrieveArtistInfo = function(search) {
     $.when(...search)
            .then((...results) =>{
                //results = results.map(res => res[0].artists.items[0].id)
                //        .map(id => app.getArtistAlbums(id));
               results = results.map(getFirstElement)
                    .map(res => res.artists.items[0].id)
                    .map(id => app.getArtistAlbums(id));
               app.retrieveArtistTracks(results);
            });
};


app.events = function() {
    //$('#btnSearch').click(function(){
        $("#myform").dialog({
			autoOpen: false,
			show: {
				effect: "blind",
				duration: 1000
			},
			hide: {
				effect: "explode",
				duration: 1000
			}
		});
		
		app.getPlaylists();
		
		$("#results").on("click", "p.addToPlaylist", function(){
			console.log("Clicked!!");
			//$("#myform #valueFromMyButton").text($(this).val().trim());
			console.log("id: " + $(this).attr('value'));
			var trackId = $(this).attr('value');
			var trackTitle = $(this).attr('name');
			
			var trackType = $(this).attr('title');
			
			console.log("name: " + trackTitle);
			$("#myform #trackToAddTitle").text(trackTitle);
			$("#myform #valueFromMyButton").val(trackId);
			$("#myform #valueFromMyButton").attr('title',trackType);
			$("#myform").dialog("open");
			//$("#myform input[type=text]").val('');
			//$("#valueFromMyModal").val('');
			//$("#myform").show(500);
		});
		
		$("#btnOK").click(function() {
        
			//$("#valueFromMyModal").val($("#myform input[type=text]").val().trim());
			//var trackId = $("#myform #valueFromMyButton").val().trim();
			var trackId = $("#myform #valueFromMyButton").val();
			console.log("track id: " + trackId);
			
			var trackTitle = $("#myform #trackToAddTitle").text();
			
			var trackType = $("#myform #valueFromMyButton").attr('title');
			
			var playlistId = $('#myForm input[name=rbnNumber]:checked').val();
			
			
			//$('p').html('<br/>Selected Radio Button Value is : <b>' + playlistId + '</b>');
			app.add(playlistId,trackId,trackTitle,trackType);
			//$("#myform").hide(400);
			$("#myform").dialog('close');
		});
		
		$('#btnSearch').click(function() {
			console.log("clicked");
			$("#results").empty();
			let searchVal = $('#search').val();
			//SOUNDCLOUD
			SC.get('/tracks',{q:`${searchVal}`}).then(function(tracks){
			  for (var i = 0; i < tracks.length; i++) {
				  $('#results').append($('<li></li>').html(tracks[i].title));
				//var span2 = document.createElement('span');
				//span2.innerHTML = `<button class="addQueue"  id = addQueue${tracks[i].id} onclick="addQueue(${tracks[i].id})"> Add To Queue </button>`;
				//var span = document.createElement('span');
				//var trackTitle = tracks[i].title;
				//span.innerHTML = `<button id=PlayPause${tracks[i].id} onclick="player(${tracks[i].id})"> play/pause </button>`;
				//$('#results').append(span);
				//$('#results').append(span2);
				
				  var addToPlaylistBtn = $(`<p class="addToPlaylist" value=${tracks[i].id} name = '${tracks[i].title}' title = 'soundcloud' >Add To Playlist</button>`);
				
				//var $something= $('<input/>').attr({ type: 'button', name:'btn1', value:'am button'});
				  $("#results").append(addToPlaylistBtn);
				  $('#results').append(document.createElement("hr"));
				  $('#results').append(document.createElement("br"));
				
			  }
			});
			//SPOTIFY
			console.log("Spotify results now?");
			let artists = $('#search').val();
			artists = [artists,artists];
			let search = artists.map(artistName => app.searchArtist(artistName));
			 app.retrieveArtistInfo(search);
		});
    //});
};


app.init = function() {
    app.events();
};

$(app.init);










//$('#playQueue').click(playQueue());



