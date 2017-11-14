const app = {};

app.apiUrl = 'https://api.spotify.com/v1';


app.events = function() {
    $('form').on('submit',function(e){
        e.preventDefault();
        $("#results ul").empty();
        let artists = $('input[type=search]').val();
        //artists = artists.split(',');
        artists = [artists,artists];
        
        let search = artists.map(artistName => app.searchArtist(artistName));
        
        //let search = app.searchArtist(artists);
        
       app.retrieveArtistInfo(search);
        
    });
};
var access_token = 'BQAnPjlBDBVaPvcF_jAgVbDDLOc-jAdQOrKpVjpZFNfqW7a_kMdZ-te1VblqVo69W4rbnwp_-kBhzOWZ0s9l6BUeYvy1frpfhbXTVRMClaryt0IePs1pDSTbAY9HZu7gRbC3yC0rc0U_RbQmuw';
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


//then build playlist
app.buildPlaylist = function(tracks) {
  $.when(...tracks)
    .then((...tracksResults) => {
        tracksResults = tracksResults.map(getFirstElement)
            .map(item => item.items)
            .reduce(flatten,[])
            .map(item => item.id);
        //console.log(tracksResults);
        const randomTracks = [];
        for(let i =0; i< 30; i++){
            randomTracks.push(getRandomTrack(tracksResults));
        }
        //randomTracks = randomTracks.join();
        const baseUrl = `https://embed.spotify.com/?them=white&uri=spotify:trackset:My Playlist:${randomTracks.join()}`;
        console.log(baseUrl);
        
        $('.playlist').html(`<iframe src="${baseUrl}" height = 400></iframe>`);
    });
};


app.showTracks = function(tracks) {
    $.when(...tracks)
    .then((...tracksResults) =>{
        tracksResults = tracksResults.map(getFirstElement)
        .map(item => item.items)
        .reduce(flatten,[])
        //.map(item => [item.name,item.id]);
        //for (i = 0; i < 30; i++) {
        //    var song = `<li>${tracksResults[i][0]}</li>`;
        //    $('ul').append(song);
        //}
        .map(item => item.id);
        console.log(tracksResults);
        if(tracksResults.length<100){
            for (i = 0; i < tracksResults.length; i++) {
                //var baseUrl = `https://embed.spotify.com/?them=white&uri=spotify:track:${tracksResults[i]}`;
                //var randoNum = Math.floor(Math.random() * trackArray.length);
                
                //$("#results ul").append(`<li><iframe src="https://embed.spotify.com/?them=white&uri=spotify:track:${tracksResults[i]}" height = 400></iframe></li>`);
                 $("#results ul").append(`<li><div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="https://embed.spotify.com/?them=white&uri=spotify:track:${tracksResults[i]}" width="300" height="80" frameborder="0"></iframe></div></li>`);
                 //$("#results ul").append(`<li><div class = "spotify-embeds"><iframe class="embed-responsive-item" src="https://embed.spotify.com/?them=white&uri=spotify:track:${tracksResults[i]}" width="1000" height="80" frameborder="0"></iframe></div></li>`);
            }
        }
        else{
             for (i = 0; i < 100; i++) {
                //var baseUrl = `https://embed.spotify.com/?them=white&uri=spotify:track:${tracksResults[i]}`;
                //var randoNum = Math.floor(Math.random() * trackArray.length);
                
                //$("#results ul").append(`<li><iframe src="https://embed.spotify.com/?them=white&uri=spotify:track:${tracksResults[i]}" height = 400></iframe></li>`);
                 $("#results ul").append(`<li><div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="https://embed.spotify.com/?them=white&uri=spotify:track:${tracksResults[i]}" width="300" height="80" frameborder="0"></iframe></div></li>`);
                 //$("#results ul").append(`<li><div class = "spotify-embeds"><iframe class="embed-responsive-item" src="https://embed.spotify.com/?them=white&uri=spotify:track:${tracksResults[i]}" width="1000" height="80" frameborder="0"></iframe></div></li>`);
            }
        }
        });
    
   
};


const getFirstElement = (item) => item[0]; //we make this function because we retrieve the first element in the json data alot

const flatten = (prev,curr) => [...prev,...curr]; ////we make this function because we flatten the multiple arrays we get alot

const getRandomTrack = (trackArray) => {
    const randoNum = Math.floor(Math.random() * trackArray.length);
    return trackArray[randoNum];
};

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


app.init = function() {
    app.events();
};

$(app.init);