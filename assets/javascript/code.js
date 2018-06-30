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