
// Steam api =========================================================================================================================
var steamName = "";
var steamID = 0;
// Fetch steam user ID number
var queryURL = "http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=597FC535B0A81C139B5227A808EAA15B&vanityurl=" + steamName
$.ajax({
   url: queryURL,
   method: "GET"
 }).then(function(response) {
    steamID = response.steamid;
 })

// Fetch steam user profile page
var queryURL = " http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=313690&key=597FC535B0A81C139B5227A808EAA15B&steamid=" + steamID;
$.ajax({
   url: queryURL,
   method: "GET"
 }).then(function(response) {
    console.log(response)
 })
// ==================================================================================================================================
=======
// steam api key 597FC535B0A81C139B5227A808EAA15B

$(document).ready(function() {


// Initialize Firebase
var config = {
  apiKey: "AIzaSyBZvq3N02QOEG6fa-6qiDLwOHoSeIBza0Q",
  authDomain: "game-website-9813e.firebaseapp.com",
  databaseURL: "https://game-website-9813e.firebaseio.com",
  projectId: "game-website-9813e",
  storageBucket: "game-website-9813e.appspot.com",
  messagingSenderId: "70919236665"
};
firebase.initializeApp(config);

});


