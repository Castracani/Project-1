
// Steam api =========================================================================================================================
function getSteamId(steamId){
// Fetch steam user ID number
var queryURL = "http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=597FC535B0A81C139B5227A808EAA15B&vanityurl=" + steamId
$.ajax({
   url: queryURL,
   method: "GET"
 }).then(function(response) {
    steamNumber = response.steamid;
    getSteamProfile(steamNumber);
 })
}
 $(document).on("click", "steam-id", function(event){
   event.prevendDefault();
   var steamId = $("#steam-id-input").val().trim();
   addGames(steamId);
 })


// Fetch steam user profile page
function getSteamProfile(steamNumber)
var queryURL = "http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=313690&key=597FC535B0A81C139B5227A808EAA15B&steamid=" + steamNumber;
$.ajax({
   url: queryURL,
   method: "GET"
 }).then(function(response) {
    
 })

// ==================================================================================================================================

// xboxAPI key 40687e73c58e72dd8d225be86a8a11de96b04dda

// gamebomb API start =================================================================
function addGames(game) {

var queryURL = "https://www.giantbomb.com/api/search/?api_key=47d89cf2776025d8ace3e66e641a4eb8bd066fc5&format=json&query=" + game + "&resources=game&format=json"
$.ajax({
   url: queryURL,
   method: "GET"
 }).then(function(response) {
    console.log(response)
    var list = $("<li>")
    var gameName = $("<h1>").text(response.name);
    var gameImage = $("<img>").attr("src", response.thumb_url);
    var gameInfo = $("<p>").text(response.deck);

    
   $("#game-div").append(list, gameName, gameImage, gameInfo);

 })
// game input+++++++++++++++++++++++++++++++++++++++++

 $(document).on("click", "add-game", function(event){
   event.prevendDefault();
   var inputGame = $("#game-input").val().trim();
   addGames(inputGame);
 })
}

// gamebomb API end =================================================================




$(document).ready(function() {
  $('.carousel').carousel();

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


