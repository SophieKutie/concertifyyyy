import React, {Component} from "react"

// class Show extends Component {
 
const Show = (props) => {
    return (
        <div>
            
            <li>{this.state.topArtistName.name}</li>
             {/* {props.children} */}
        {/* <ul>
        <img src= {this.state.topArtistName.img} alt= " " style={{ height: 140}}/>
        </ul> */}
    
        </div>
    )

}

export default Show





















































// import React from "react";


// import Spotify from 'spotify-web-api-js';

// const spotifyWebApi = new Spotify();

// class Show extends React.Component {
//   constructor(){
//     super();
//     const params = this.getHashParams();
//     const token = params.access_token;
   
    
//     this.state = {
//       loggedIn: token ? true : false,
//      //hasEvents: events ? true : false,
//       topArtistName : 
//                          [{ name: ''}],
//                           img: '',
//                           id: '',
//       // topArtistEvent : [{event: ''}],
//       //                    city: ''
//     }
    
//     if (token) {
//       spotifyWebApi.setAccessToken(token);
//     }
  
//   }
  
  
  
//     getHashParams() {
//       var hashParams = {};
//       var e, r = /([^&;=]+)=?([^&;]*)/g,
//           q = window.location.hash.substring(1);
//       e = r.exec(q)
//       while (e) {
//          hashParams[e[1]] = decodeURIComponent(e[2]);
//          e = r.exec(q);
//       }
//       return hashParams;
//     }
    
// getTopTwentyArtists() {
//   const firebase = require("firebase");
//   let uri = "https://api.spotify.com/v1/me/top/artists?limit=20"
//   let h = new Headers();
//   h.append('Accept', 'application/json');
//   h.append('Content-Type', 'application/json')
//   //let encoded = window.btoa('sophiekutie:concertify');
//   let access_token = 'BQBdDqMbulva6b05FNne-LZdxIGqjqGYSOqRVS9Xtl_hHYknzk6WS34C7wc0E7q2fGaRtzKYE37vYBfYNN5hknCXlfd3jPLa2kCmsSgYe-6GTBB1WAZgdwMhMlgbg3gI7SRqfqM9GCDxMbxG1wSZ3YRZW9aPq-FAl0uvwSDdB3lPTT1PR2d1Q19v1-5Umy2cJ1ZsgKGuTBES3F0OudzJe32d7vn_MjbrojfP7FO4kumUH-2i'
//   let auth = 'Bearer ' + access_token;
//   h.append('Authorization', auth );

//   let req = new Request(uri, {
//     method: 'GET',
//     headers: h,
    
//   });
  
//   fetch(req)
//   .then((response) => {
//     if(response.ok){
//       return response.json();
//     }else{
//       throw new Error('Bad HTTP stuff');
//     }
//   }).then ((jsonData) =>{
      
//     var i; 
//      for(i = 0; i < 20; i++) 
//     {
     
//       console.log(jsonData.items[i].name)
//       this.setState({
//        topArtistName:{
//         id: jsonData.items[i].id,
//         name: jsonData.items[i].name,
//         img: jsonData.items[i].images[1].url
//       }
//       });
//       // setTimeout(i, 100);
//        console.log(this.state); //log the state

//     }
   
//     } 
//   )
// }
// render(){
// let arr = new Array(this.state.topArtistName)
// let names = arr.map(item => <li>{item}</li>)
// //this.state.topArtistName.map(item => <li>{item}</li>)

// return (
//   <div> 
  
//     {names}
    
//   </div>
// );

// }
// }
  
// export default Show;