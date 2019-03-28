import React, { Component } from 'react';


import './App.css';
import Show from "./Show"
import showsData from "./showsData"
import Spotify from 'spotify-web-api-js';
import queryString from 'query-string';
import nowPlaying from "./nowPlaying"




const spotifyWebApi = new Spotify();

class App extends Component {
  constructor(){
  super();
  const params = this.getHashParams();
  const token = params.access_token;
  this.state = {
    loggedIn: token ? true : false,
    nowPlaying: { 
        name: '', 
        image: '' },  
    topArtistNames : [{ name: ''}]
  }
  
  if (token) {
    spotifyWebApi.setAccessToken(token);
  }

}



  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying(){
    spotifyWebApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: { 
              name: response.item.name, 
              image: response.item.album.images[0].url
            }
        });
        console.log(this.state.nowPlaying)
      })
  }

  // getTopArtist(){spotifyWebApi.getMyTopArtists({
  //  limit : 1}
  // ).then(response => response.json())
  //    .then(data => //console.log(data))
  //   {this.setState({
  //                 topArtist: data.items.name }) 
  //   //                 name: response.items.name,   
  //   //                  }
  //   //        });
  //   //        console.log(this.state.getTopArtist)
  //        })
  //   }
    
    doFetch() {
      let uri = "https://api.spotify.com/v1/me/top/artists?limit=20"
      let h = new Headers();
      h.append('Accept', 'application/json');
      h.append('Content-Type', 'application/json')
      //let encoded = window.btoa('sophiekutie:concertify');
      let access_token = 'BQBeVTYpEgErjgQozUgb1VI8QNd7l3BJgksJd5tO8K3hBao-gjXPHfcgZHEkeCrEpjTUgnQYKmbqn9KWh3s6hJNIhB_LJpSXmS4IMg4NdE4niwv_KZegVMiPk3KhQkkhkzrA0gw-S-pPGMXfLb8NiqP4xs4me1aANq_q7pRlVhxYsAK4eQZaggSjhF54K2lrQ3k-p_MB7SkScsogRd3MKJ9yGh_DDX5bnG1vw6kgbZ2Uul4V'
      let auth = 'Bearer ' + access_token;
      h.append('Authorization', auth );

      let req = new Request(uri, {
        method: 'GET',
        headers: h,
        
      });
      
      fetch(req)
      .then((response) => {
        if(response.ok){
          return response.json();
        }else{
          throw new Error('Bad HTTP stuff');
        }
      }).then ((jsonData) =>{
       //console.log(jsonData)
       //{ // const {names} = jsonData.items.name
        //console.log(names[0])
        var i; 
        for(i = 0; i <20; i++) 
        {
          console.log(jsonData.items[i].name)
        }
        //  this.setState({
        //   topArtistNames :  [{

        //           name: jsonData[0].items[5].name }]
               
        //   }) 
        //}
      
        } 
      )
    }

    componentDidMount() {
      console.log(this.state.topArtistNames)
    }

  render() {
   let topArtistNames = [this.state.topArtistNames.name]
   //let topArtist = []
   let topArtistList = topArtistNames.map(name => <li>{name} </li>)
    return (
      <div className="App">
      <a href='http://localhost:8888'> 
      <button>Login With Spotify</button>
      </a>
         {/* <div>
          Now Playing: { this.state.nowPlaying.name }
        </div> 
        <div>
          <img src={this.state.nowPlaying.image} style={{ width: 100 }}/>
        </div>

        <button onClick={() => this.getNowPlaying()}>
            Check what's Now Playing
          </button>  */}

         <div>
           <h1>Top Artists List :  </h1> 
           <ul> {topArtistList}</ul> 
           
        </div>

        <button onClick={() => this.doFetch()}>
            Check Top Artist!
          </button>
        
      </div>
    );
  }
}

//console.log('Listening on 3000');
export default App;



