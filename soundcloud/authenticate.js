<script src="https://connect.soundcloud.com/sdk/sdk-3.2.2.js"></script>
<script>
SC.initialize({
  client_id: '309011f9713d22ace9b976909ed34a80',
  redirect_uri: 'http://34.203.219.137/g9/callback.html'
});

// initiate auth popup
SC.connect().then(function() {
  return SC.get('/me');
}).then(function(me) {
  alert('Hello, ' + me.username);
});
</script>