require('dotenv').config();

const express = require('express');
const hbs = require('hbs');

// require spotify-web-api-node package here:

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// setting the spotify-api goes here:

const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });
  
  // Retrieve an access token
  spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));

// Our routes go here:
app.get('/artist-search', (req, res, next) => {
  //
  // afficher la liste des artistes correspondants a ce qui a ete tape
  //
  // 1. recupere le mot tape
  // 2. interroger spotify pour la liste des artiste de ce mot
  // 3. afficher le template de ces artistes
  //

  // 1. 
  const artistname = req.query.artist;
  
  
  

  // 2.
  spotifyApi
    .searchArtists(artistname)
    .then(data => {
      console.log('The received data from the API: ', data.body.artists.items[0]);
      // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'

      // 3.
      res.render('artist-search-results', {
        artists: data.body.artists.items
      })
    })
    .catch(err => console.log('The error while searching artists occurred: ', err));

})


app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));
