import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import './App.css';
import Show from "./Show"
import Spotify from 'spotify-web-api-js';
//import queryString from 'query-string';


/**********
* Displays a list of concerts by
* top 20 artists listened to by a Spotify user and 
* direction to the event.
*
*
*****/

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor(props){
  super(props);
  const params = this.getHashParams();
  const token = params.access_token;
 
  
  this.state = {
  loggedIn: token ? true : false,
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
                              
                      ] ,                  
    // test: [],
    topArtistEvent : 
      {index: 1, event: '',
                       city: ''},
    
  
  venue: { directions: ''}
                       
  };
 
  for (var key in this.state) {
    console.log(key)
  }
  // var thisstateArray = this.state[key];

  // for (var i in thisstateArray) {
  // console.log(thisstateArray[i]); 
  // }
  
  // var item = thisstateArray[i];
  //  for (var i in item) {
  // console.log(item[this.state.topArtistName.name]);}
  // for (var i in this.state.topArtistName) {
  // }
  // console.log(Object.keys(this.state.topArtistName));



  
  
  this.getEvent = this.getEvent.bind(this);
  this.getDirections = this.getDirections.bind(this);

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
  // load the top twenty artists retrieved from Spotify API call when the app component loads
    this.getTopTwentyArtists();   
   // getEvent(); 
  }

  
  getTopTwentyArtists() {
      let uri = "https://api.spotify.com/v1/me/top/artists?limit=20"
      let h = new Headers();
      h.append('Accept', 'application/json');
      h.append('Content-Type', 'application/json');
      //let encoded = window.btoa('sophiekutie:concertify');
      let access_token = '*****************************************************************************'      
      let auth = 'Bearer ' + access_token;
      h.append('Authorization', auth );

      let req = new Request(uri, {
        method: 'GET',
        headers: h,
      });
      
      const artistsToGetConcertsFor = fetch(req)
      .then((response) => {
        if(response.ok){
          return response.json();
        }else{
          throw new Error('Bad HTTP stuff');
        }
      }).then ((jsonData) => { 
    
      var i;
      for( i = 1; i < Object.keys(this.state.topArtistName).length; i++) {
        
         this.setState({
           topArtistName: jsonData.items.map(item => {
              
             return {
            id: item.id,
            name: item.name,
            img: item.images[1].url
            }          
         })
        })
       }  
       console.log(this.state.topArtistName); //log the state
      })
      } 
       
getEvent() {
      for (var key in this.state.topArtistName)    // for all the keys i.e . index, id, name, img in topArtistName from positions 0 to 19,
      var thisStateTopArray = this.state.topArtistName[19];  // fill the array with the actual value of the keys 
      for (var property in thisStateTopArray)  // for all the properties in the array; log the value of the names
      console.log(thisStateTopArray.name)  //log the value of the names and pass this value to the uri string below
      var uri = 'https://api.songkick.com/api/3.0/events.json?apikey=APIKEY&artist_name=' + thisStateTopArray.name   + '&per_page=1'
     
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
       //console.log(data.resultsPage.results.event[0].displayName + ' Venue: ' + data.resultsPage.results.event[0].location.city)
        {
       this.setState({
       topArtistEvent:{
       event: data.resultsPage.results.event[0].displayName,
       city:  data.resultsPage.results.event[0].location.city
       }
       });}console.log(this.state.topArtistEvent);
       
               })
   }
   
   
  getDirections() {
   
    var thisStateEvent = this.state.topArtistEvent[1];
    for (var property in thisStateEvent) 
    console.log(thisStateEvent.city + thisStateEvent.event)
      var venue = thisStateEvent.city + thisStateEvent.event;
      var uri = 'https://maps.googleapis.com/maps/api/directions/json?origin=Huddersfield&destination=' + 
                 thisStateEvent.city + 
                '&key=APIKEY&mode=transit&per_page=1'

      let r = new Request(uri, {
        method: 'GET',
      });
    
      fetch(r)
      .then((response) => {
        if(response.ok){
          return response.json();
        }else{
          throw new Error('Bad HTTP stuff');
        }
      })
    
      .then ((data) =>{
        this.setState({
       venue:{
        directions:  data.resultsPage.routes.legs.steps[3].html_instructions
        }
        });
                })
}
  


render() {

    return (
      <div className="App">
      <div className="App-header"> </div> 
      
      
      <a href='http://localhost:8888'> 
      <button>Login With Spotify</button>
      </a> 

         <div>
           <h2 style = {{color: "Purple"}}> Don't miss these events from 
             your favorite artists.  
           </h2>     
        </div>

        <div className="main">
        {/* style={{display: "block", */}
        {/* // width: '10px', */}
        {/* // height:'10px', */}
        {/* // float: 'centre', */}
        {/* // padding: '45px', */}
        {/* // }}> */}
        
        
        {this.state.topArtistName.map((thisstateArray) => { 
          let item = thisstateArray;
          return (
             <div key={item.index}> 
             
               <img src= {item.img} alt= " " style={{ height: 120}}/>
             <h4 style = {{color: "purple"}}> {item.name} </h4>
            
             </div>
             ); 
        })}
       
    </div>
       
    {/* <div className="newspaper"> */}
        {/* style={{display: "block", */}
        {/* // width: '10px', */}
        {/* // height:'10px', */}
        {/* // float: 'centre', */}
        {/* // padding: '45px', */}
        {/* // }}> */}
        
        
        {/* {this.state.topArtistEvent.map((thisstateArray) => {  */}
          {/* let item = thisstateArray; */}
          {/* return (
             <div key={item.index}> 
             
              
             <h4 style = {{color: "purple"}}> {item.event} </h4>
             <h4 style = {{color: "purple"}}> {item.city} </h4>
            
             </div>
             ); 
        })}
       
    </div> */}
    
    <div>
      <p>     </p>
      <h1>    </h1>
      <h1>    </h1>
            <p style = {{color: "Brown"}}> Definitely attend this!    </p>
            
            {/* {this.state.topArtistName.name} */}
            {this.state.topArtistEvent.event}
           
    </div>
               {this.state.topArtistEvent.city}{/* {thisStateTopArray.name} */}
              <p>    </p>

        <button onClick={() => this.getEvent()}>
            Concertify!
         </button>


         <div>
            
         <p>    </p>
    </div>


         <button onClick={() => this.getDirections()}>
            Take me there!
         </button>
      <div className="footer"> </div>
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



