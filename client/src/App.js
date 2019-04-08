import React, { Component } from 'react';


import './App.css';
//import Show from "./Show"
//import showsData from "./showsData"
import Spotify from 'spotify-web-api-js';
//import queryString from 'query-string';
//import ErrorBoundary from './ErrorBoundary';





const spotifyWebApi = new Spotify();

class App extends Component {
  constructor(){
  super();
  const params = this.getHashParams();
  const token = params.access_token;
 
  
  this.state = {
    loggedIn: token ? true : false,
   //hasEvents: events ? true : false,
    topArtistName : 
                       [{ name: ''}],
                        img: '',
    topArtistEvent : [{event: ''}],
                       city: ''
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


    
    getTopTwentyArtists() {
      let uri = "https://api.spotify.com/v1/me/top/artists?limit=20"
      let h = new Headers();
      h.append('Accept', 'application/json');
      h.append('Content-Type', 'application/json')
      //let encoded = window.btoa('sophiekutie:concertify');
      let access_token = 'BQB_2gbsYimx0rGknMFOmlgUzLLelhambasRFDKpHCMDeQCWx1hgud3wNFKec4SOijcL54Gi1gW4XDig6CefIFBhlBenBxGBamfNUQsfHHGg5KBTHGrzEa4IDqBhpoId_9oFanuiVbdPAbi_-0nYhYl77bjPPXZD02WQrI0B5RqsN5lA0CgRkEi9iqtwAu_MAiVYx23-XCQc_f5pe8w6R_GJEuSOvWuhJuFtenqwB_RkAMKS'
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
      
        var i; 
         for(i = 0; i < 20; i++) 
        {
         
          console.log(jsonData.items[i].name)
          this.setState({
           topArtistName:{
            name: jsonData.items[i].name,
            img: jsonData.items[i].images[1].url
          }
          });
          setTimeout(i, 100);
           

        }
       
        } 
      )
    }
   
//  doSearch() {

//   var artist = this.state.topArtistName.name;
//   var uri = 'http://api.songkick.com/api/3.0/search/artists.json?apikey=QCFZoZJso4HKBsfS&query=' + artist  +'&per_page=1'
  

//   let re = new Request(uri, {
//     method: 'GET',
//   });

//   fetch(re)
//   .then((response) => {
//     if(response.ok){
//       return response.json();
//     }else{
//       throw new Error('Bad HTTP stuff');
//     }
//   })
//   .then ((data) =>{
//           console.log(data.resultsPage.results.artist[0].id)
//           // data.resultsPage.results.artist.forEach(function(a){
//           //   console.log(a.id);
//           //})
//           //may need this.state here for id to use for event query
//           this.setState({
//             topArtistId:{
//               id: data.resultsPage.results.artist[0].id   
//               }
//               });
//                  })
// }

getEvent() {
  var artist = this.state.topArtistName.name;
  var uri = 'https://api.songkick.com/api/3.0/events.json?apikey=QCFZoZJso4HKBsfS&artist_name=' + artist  + '&per_page=1'
  

  let re = new Request(uri, {
    method: 'GET',
  });

  fetch(re)
  .then((response) => {
    if(response.ok){
      return response.json();
    }else{
      throw new Error('Bad HTTP stuff');
    }
  })

  .then ((data) =>{
    console.log(data.resultsPage.results.event[0].displayName)
    console.log(data.resultsPage.results.event[0].location)

    //data.resultsPage.results.artist.forEach(function(a){
    //console.log(a.id);
    //})
    //may need this.state here for id to use for event query
    this.setState({
    topArtistEvent:{
    event: data.resultsPage.results.event[0].displayName,
    city:  data.resultsPage.results.event[0].location.city
    }
    });
            })
}



  render() {

    return (
      <div className="App">
      <a href='http://localhost:8888'> 
      <button>Login With Spotify</button>
      </a>

         <div>
           <h1>Concerts List :  </h1> 
               <ul>
                 {
                  //  (this.state.topArtistName.name || []).map(item => (
                  //  <li key={item}>{item}</li>
                  //  ))
                  this.state.topArtistName.name 
                 }
               </ul>
           
        </div>

        <div>
          <img src= {this.state.topArtistName.img} alt= " " style={{ height: 140}}/>
          </div>

        <button onClick={() => this.getTopTwentyArtists()}>
            Check Top Artist!
          </button>

          <div>
          <p> {this.state.topArtistEvent.event} </p>
          </div>

          <div>
          <p> {this.state.topArtistEvent.city} </p>
          </div>

          <button onClick={() => this.getEvent()}>
            Find Event!
          </button>

          
          


      </div>
    );
  }
}

export default App;



