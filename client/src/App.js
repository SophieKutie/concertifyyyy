import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import './App.css';
import Show from "./Show"
import Spotify from 'spotify-web-api-js';
//import queryString from 'query-string';


const spotifyWebApi = new Spotify();

class App extends Component {
  constructor(props){
  super(props);
  const params = this.getHashParams();
  const token = params.access_token;
 
  
  this.state = {
  //  loggedIn: token ? true : false,
   //hasEvents: events ? true : false,
    topArtistName : 
                       [
                        { index: 1, id: '', name: '', img: ''},
                      
                        { index: 2, id: '', name: '', img: ''},

                        { index: 3, id: '', name: '', img: ''},

                        { index: 4, id: '', name: '', img: ''},

                        { index: 5, id: '', name: '', img: ''},

                        { index: 6, id: '', name: '', img: ''},

                        { index: 7, id: '', name: '', img: ''},

                        { index: 8, id: '', name: '', img: ''},

                        { index: 9, id: '',  name: '', img: ''},

                        { index: 10, id: '', name: '', img: ''},

                        { index: 11, id: '', name: '', img: ''},

                        { index: 12, id: '', name: '', img: ''},

                        { index: 13, id: '', name: '', img: ''},

                        { index: 14, id: '', name: '', img: ''},

                        { index: 15, id: '', name: '', img: ''},

                        { index: 16, id: '', name: '', img: ''},

                        { index: 17, id: '', name: '', img: ''},

                        { index: 18, id: '', name: '', img: ''},

                        { index: 19, id: '', name: '', img: ''},

                        { index: 20, id: '', name: '', img: ''},
                              
                      ]                    
    // test: [],
    // topArtistEvent : [{event: ''}],
    //                    city: ''
  };
 
  for (var key in this.state) {
    console.log(key)
  }
  var thisstateArray = this.state[key];

  for (var i in thisstateArray) {
  console.log(thisstateArray[i]); 
  }
  
  // var item = thisstateArray[i];
  //  for (var i in item) {
  //console.log(item[this.state.topArtistName.name]);}
  //for (var i in this.state.topArtistName) {
  //}
  // console.log(Object.keys(this.state.topArtistName));
  // this.getTopTwentyArtists = this.getTopTwentyArtists.bind(this);
  
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


  componentDidMount(){
  //getTopTwentyArtists() {
      let uri = "https://api.spotify.com/v1/me/top/artists?limit=20"
      let h = new Headers();
      h.append('Accept', 'application/json');
      h.append('Content-Type', 'application/json')
      //let encoded = window.btoa('sophiekutie:concertify');
      let access_token = 'BQAxmOXurAiCJTpEYQgaynY1_GbH2Fe023l2MYitLkvs77CjOnuhi7iTVCEIm_6qmCewbiAP5aMZbvwOWDEYPUorJnVTyEJnnsJeWuIWpGhIxo6n42iRslJTpcnXJDddwdZidlnxR0xW6TxgkTFfm3r2xWQtG_Y7sPc7m9kSinCbMcEvlX-9mXrLJRVmRkJNVWSGH3EhILLTxXTCW29RiILABrZnMTsDIlr-GSBqK0L86LZ6'
      let auth = 'Bearer ' + access_token;
      h.append('Authorization', auth );

      let req = new Request(uri, {
        method: 'GET',
        headers: h,
      });
      
      let concerts = fetch(req)
      .then((response) => {
        if(response.ok){
          return response.json();
        }else{
          throw new Error('Bad HTTP stuff');
        }
      }).then ((jsonData) => { 
    
      var i;
      for( i = 1; i < Object.keys(this.state.topArtistName).length; i++) {
        { this.setState({
           topArtistName: jsonData.items.map(item => {
              
             return {
            id: item.id,
            name: item.name,
            img: item.images[1].url
          }
                  
        })
        })
          console.log(this.state.topArtistName); //log the state
        }}})
       } 
       

getEvent() {
   // var artist = this.state.topArtistName.name;
    
const artist = this.state.topArtistName.name.map(thing => <li key = {thing.id}> </li>) 
 
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
    // let showsToRender = this.state.topArtistName || {}
    const data = this.state.topArtistName;
// const showList = data.map(name => {
//   console.log(name)
// })
    return (
      <div className="App"> 
      <a href='http://localhost:8888'> 
      <button>Login With Spotify</button>
      </a>

         <div>
           <h3>Don't miss these events from 
             your favorite artists.  
           </h3>     
        </div>

        <div>
        {this.state.topArtistName.map((thisstateArray) => { 
          let item = thisstateArray;
          return (
             <div key={item.index}> 
             <h4> Name : {item.name} </h4>
             <img src= {item.img} alt= " " style={{ height: 140}}/>
             </div>
             ); 
        })}
       </div>
    
       
       {/* <div>
         { data.map(name => {
          console.log(name)
         return (
           <ul>
             <li> Artist(s):
             {this.state.topArtistName.name}
               <img src= {this.state.topArtistName.name} alt= " " style={{ height: 140}}/></li> <li>{this.state.topArtistName.name}</li>
           </ul>
         )})}
       </div>
      */}
       {/* <div>
       {showsToRender.map((name, i) => 
            <li name={name} index={i} />
          )}
       </div> */}


        {/* <button onClick={() => this.getTopTwentyArtists()}>
            Check Top Artist!
         </button> */}

      </div>
    );
  }

}


// class Show extends Component {
//   render() {
//     let show = this.state.topArtistName.img
//     return (
//       <div style={{ display: 'inline-block', width: "25%"}}>
//         <img src= {show} alt= " " style={{ height: 140}}/>
       
//         <ul>
//           { show.map(item => 
//             <li>{item.img}</li>
//           )}
//         </ul>
//       </div>
//     );
//   }
// }

export default App;



