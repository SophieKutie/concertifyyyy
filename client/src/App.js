import React, { Component } from 'react';

import './App.css';
import Show from "./Show"
import showsData from "./showsData"
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

//const showComponents = showsData.map(item => <Show Key = {item.id} show={item}/>)  //for mapping hypothetical json array


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
          You've been listening to: { this.state.topArtist.name }
        </div> 

        <div>
          <img src={this.state.topArtist.image} style={{ width: 100 }}/>
        </div>


        <button onClick={() => this.getTopArtist()}>
            Check Top Artist!
          </button>
        



        {/* <div> // only testing getSavedTrack API, turned out forbidden
          Saved Track: { this.state.savedTrack.name }
        </div> 

        <div>
          <img src={this.state.savedTrack.image} style={{ width: 100 }}/>
        </div>


        <button onClick={() => this.getSavedTrack()}>
            U saved this!
          </button> */}
          
          {/* <div>   //for mapping images from showsData hypothetical json
          {showComponents}
          </div> */}
          

          <Show imgUrl = "https://shoobs.com/media/W1siZiIsIjIwMTgvMDcvMjAvMTEvNTkvMzgvMjM0L0RBVklET19zb2NpYWxzX0lOU1RBX21pbi5KUEciXSxbInAiLCJ0aHVtYiIsIjk2MHg5NjAiXSxbInAiLCJvcHRpbSJdXQ/DAVIDO_socials_INSTA-min.JPG?sha=ab2809d4"/>    
          <Show imgUrl = "https://i.ytimg.com/vi/YRhSh7sN3FQ/hqdefault.jpg"/>  
          <Show imgUrl = "https://i.ytimg.com/vi/amWQHuhyW4Y/hqdefault.jpg"/>  
          <Show imgUrl = "https://live-timely-fzn9b7gebi.time.ly/wp-content/uploads/2018/10/022219-ellamai.jpg"/>  
      </div>
    );
  }
}

console.log('Listening on 3000');
export default App;



