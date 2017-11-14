//var SC = require('soundcloud');
SC.initialize({
  //client_id: 'f4323c6f7c0cd73d2d786a2b1cdae80c'
  //client_id: 278594df9a311b2a1a56251b3a2b0fbe
  //client_id: 'b8f06bbb8e4e9e201f9e6e46001c3acb'
  //client id: '17a992358db64d99e492326797fff3e8'
  client_id: '309011f9713d22ace9b976909ed34a80'
  
});




$(document).ready(function() {
   $('#btnSearch').click(function() {
    $("#results").empty();
    let searchVal = $('#search').val();
    SC.get('/tracks',{q:`${searchVal}`}).then(function(tracks){
     for (var i = 0; i < tracks.length; i++) {
        console.log(tracks[i]);
        $('#results').append($('<li></li>').html(tracks[i].title + ' - ' + tracks[i].genre + '-' + tracks[i].id));
       
        //$('#results').append($('<button/>',{
        //    text: tracks[i].title,
        //    id: tracks[i].id,
        //    click: playIt(tracks[i].id)
        //}));
        
        //var button = document.createElement("BUTTON");
        //button.name = tracks[i].title;
        //button.value = tracks[i].title;
        //button.onclick = playIt(tracks[i].id);
        //$('#results').append(button);
        
    //    var button=$('<input/>').attr({
    //      type: "button",
    //      id: tracks[i].id,
    //      value: tracks[i].title,
    //      onclick:playIt(tracks[i].id)
    //});
    //  $('#results').append(button);  
    //  }
    var span = document.createElement('span');
    span.innerHTML = `<button id=${tracks[i].id} onclick="playIt(${tracks[i].id})"> ${tracks[i].title} </button>`;
    $('#results').append(span);  
     }
});
    
  });
  
  
  
//SC.get('/tracks',{user:'950176648'}).then(function(tracks){



//SC.get('/tracks',{q:'maxgertler'}).then(function(tracks){
//     for (var i = 0; i < tracks.length; i++) {
//        console.log(tracks[i]);
//        $('#results').append($('<li></li>').html(tracks[i].title + ' - ' + tracks[i].genre + '-' + tracks[i].id));
//       
//        //$('#results').append($('<button/>',{
//        //    text: tracks[i].title,
//        //    id: tracks[i].id,
//        //    click: playIt(tracks[i].id)
//        //}));
//        
//        //var button = document.createElement("BUTTON");
//        //button.name = tracks[i].title;
//        //button.value = tracks[i].title;
//        //button.onclick = playIt(tracks[i].id);
//        //$('#results').append(button);
//        
//    //    var button=$('<input/>').attr({
//    //      type: "button",
//    //      id: tracks[i].id,
//    //      value: tracks[i].title,
//    //      onclick:playIt(tracks[i].id)
//    //});
//    //  $('#results').append(button);  
//    //  }
//    var span = document.createElement('span');
//    span.innerHTML = `<button id=${tracks[i].id} onclick="playIt(${tracks[i].id})"> ${tracks[i].title} </button>`;
//    $('#results').append(span);  
//     }
//});




});

function playIt(songId){
  //console.log(songId);
 SC.stream(`/tracks/${songId}`).then( function(sound){
    //console.log("trying to play track id: " + title);
    sound.play();
 });
}
// //stream track id 293
//SC.stream('/tracks/293').then(function(player){
//  player.play();
//});


//$(document).ready(function() {
//  SC.get('/tracks', { genres: 'rock' }, function(tracks) {
//    $(tracks).each(function(index, track) {
//      $('#results').append($('<li></li>').html(track.title + ' - ' + track.genre + '-' + track.id));
//      console.log(track.title + " " + track.id);
////      $('#results').append($('<button/>', {
////        text: track.title, //set text 1 to 10
////        id: track.id,
////        click: function () { SC.stream(`/tracks/${track.id}`).then(function(player){
////  player.play();
////}); }
////   })
//                           //);
//    });
//  });
//});
    
//$(document).ready(function() {
//  SC.get('/tracks', { genres: 'rap' }, function(tracks) {
//    console.log(tracks);
//    $(tracks).each(function(index, track) {
//      $('#results').append($('<li></li>').html(track.title + ' - ' + track.genre));
//      console.log(track.title + " " + track.id);
//    });
//  });
//});



