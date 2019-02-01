import React, { Component } from 'react';

import './App.css';
import Spotify from 'spotify-web-api-js';
import queryString from 'query-string';




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
    topArtist: {
     name: '',
    image: ''},
    savedTrack: { 
      name: '',
      image: ''
    }
  }
  
  if (token) {
    spotifyWebApi.setAccessToken(token);
  }

}
// componentDidMount() {
//   let parsed = queryString.parse(window.location.search);
//   let accessToken = parsed.access_token;
//   if (!accessToken)
//     return;
//     fetch(`https://api.spotify.com/v1/me/top/tracks`, 
//     {
//       method: "GET",
//       headers: {'Authorisation': 'Bearer ' + accessToken}})
//       .then(function (response) {
//         return response.json()
//       })
//       .then(function (data) {
//         console.log('the data', data)
//       })

    

//   }



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
    // .then(function (response) {
    //          return response.json()
    //        })
    //        .then(function (data) {
    //          console.log('the data', data)
    //        })
    //   };






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

  getTopArtist(){spotifyWebApi.getMyTopArtists({
   limit : 1}
  ).then
  // }).then(function(data){
  //      console.log(data);
  //    }, function(err){
  //      console.log(err);
  //    });}
     ((response) => {
            this.setState({
                 topArtist: { 
                    name: response.name, 
                     image: response.images           
                     }
           });
           console.log(this.state.topArtist)
         })
      }
      
      getSavedTrack(){spotifyWebApi.getMySavedTracks({
        limit : 1, offset : 1})
        .then((response) => {
          this.setState({
            topTrack: { 
               name: response.items.name, 
                image: response.items.images[0].url
        }
      });
    })
 }
  
  
  
// getTopArtist(){
//   let parsed = queryString.parse(window.location.search);
//   let accessToken = parsed.access_token;
  
//   if (!accessToken)
//     return;
//     fetch(`https://api.spotify.com/v1/me/top/artists?limit=1`, 
//     {
//       method: "GET",
//       headers: {'Authorisation': 'Bearer ' + accessToken}})
//       .then((response) => {
//         this.setState({
//           topArtist: { 
//               name: response.item.name, 
//               image: response.item.images[0].url
//       }
//     });
//   })
// }
  


  render() {
    return (
      <div className="App">
      <a href='http://localhost:8888'> 
      <button>Login With Spotify</button>
      </a>
         <div>
          Now Playing: { this.state.nowPlaying.name }
        </div> 
        <div>
          <img src={this.state.nowPlaying.image} style={{ width: 100 }}/>
        </div>

        <button onClick={() => this.getNowPlaying()}>
            Check what's Now Playing
          </button> 

        <div>
          Top Artist: { this.state.topArtist.name }
        </div> 

        <div>
          <img src={this.state.topArtist.image} style={{ width: 100 }}/>
        </div>


        <button onClick={() => this.getTopArtist()}>
            Top Artist!
          </button>
        



          <div>
          Saved Track: { this.state.savedTrack.name }
        </div> 

        <div>
          <img src={this.state.savedTrack.image} style={{ width: 100 }}/>
        </div>


        <button onClick={() => this.getSavedTrack()}>
            U saved this!
          </button>
      </div>
    );
  }
}

console.log('Listening on 3000');
export default App;



