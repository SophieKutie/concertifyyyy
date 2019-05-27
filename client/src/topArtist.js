

// import React from 'react';

// class TopArtist extends React.Component {
//     render() {
//         console.log(this.state.)
//     }
// }



//let topArtist = jsonData.results

    //  console.log("This could be the id " + data.resultsPage.results.artist); 
    //  var i; 
    //  var j;
    //  var artistid = [data.resultsPage.results.artist];
    //  for(i = 0; i <= artistid.length; ++i) 
    //  {
    //     var artistid2 = [artistid[i]];
    //   for(j = 0; j <= artistid2.length; ++j)
    //   {
    //     console.log("inner for loop " + artistid2[j]);
    //   }
    //   console.log("length of the array " + data.resultsPage.results.artist.length);
    //   //console.log("This is the artistid length " + artistid[i]);











    for (var key in this.state.topArtistName) 
    var thisStateTopArray = this.state.topArtistName[1];
  
    // for (var property in thisStateTopArray) 
    // console.log(thisStateTopArray.name)
  //   var item = thisStateTopArray[i];
  //  //  for (var i in item) {
  //   console.log(item[i]);//}
    //}
    //var i = this.state.topArtistName[3]

//for(var i = this.state.topArtistName[0]; i < Object.keys(this.state.topArtistName).length; i++) {














//SOME FOR LOOP



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
