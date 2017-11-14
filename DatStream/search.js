  search() {
    console.log('this.state', this.state);        
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    const FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';    
    var accessToken = 'YOUR_ACCESS_TOKEN'
    var myHeaders = new Headers();

    var myOptions = {
      method: 'GET',
      headers:  {
        'Authorization': 'Bearer ' + accessToken
     },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, myOptions )
      .then(response => response.json())
      .then(json => console.log(json))
  }
  
    constructor(props) {
    super(props);
    this.state = {
      query: ""
    }
  }

// Calling portion

<InputGroup.Addon onClick={() => this.search()}>