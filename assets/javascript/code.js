

$(document).ready(function () {

  // Initialize Firebase here (currently at bottom of page)








   // Steam api =========================================================================================================================
   function getSteamId(steamId) {
    // Fetch steam user ID number
    var queryURL = "https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=597FC535B0A81C139B5227A808EAA15B&vanityurl=" + steamId
    $.ajax({
       url: queryURL,
       method: "GET"
    }).then(function (data) {
     
       var steamNumber = data.response.steamid;
     
       getSteamProfile(steamNumber);
       
    })
 }
//  get steam ID from vanity URL search
 $("#steam-submit").on("click", function(){
    event.preventDefault();
    var steamId = $("#steam-input").val().trim();
    
   getSteamId(steamId);
 })


 // Fetch steam user profile page

 // nick's steam ID for testing purposes: 76561197972752173

 function getSteamProfile(number) {
    var queryURL = "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=597FC535B0A81C139B5227A808EAA15B&steamids=" + number;
    $.ajax({
       url: queryURL,
       method: "GET"
    }).then(function (data) {


     var avatar = data.response.players[0].avatarmedium;
     var playerOnline;
     var image = $("<img src='" + avatar + "' />")
     var name = $("<h3>").text(data.response.players[0].personaname)
     var lastLogOff = data.response.players[0].lastlogoff;
     var newDate = $.parseJSON(lastLogOff);
     var formatDate = new Date(1000*newDate);
     var lastOnline = $("<p>").text("Last online: " + formatDate);
     // check if online 
     var online = data.response.players[0].personastate;
     if (online === 0){
       online = "no";
     } else if (online === 1){
       online = "yes";
     }
    playerOnline = $("<p>").text("online: " + online)
    
     $("#steam-div").append(image, name, playerOnline, lastOnline);
    })
 }

 // ==================================================================================================================================

  // xboxAPI key 40687e73c58e72dd8d225be86a8a11de96b04dda

  // giantbomb API start =================================================================>>>
  var gameLibrary = [];
  var searchResults = {};

  function addGames(game) {


    $.ajax({
      type: 'GET',
      dataType: 'jsonp',
      crossDomain: true,
      jsonp: 'json_callback',
      url: 'https://www.giantbomb.com/api/search/?format=jsonp&api_key=47d89cf2776025d8ace3e66e641a4eb8bd066fc5&query=' + game
    }).done(function (data) {
      var results = data.results
      console.log(results)
      $("#search-results").html("")
      // clear search array
      searchResults = [];
      for (i = 0; i < 10; i++) {
        //  game icon
        var gameImg = results[i].image.icon_url;
        var image = $("<img src='" + gameImg + "' />")
        //  game name
        var gameName = $("<h3>").text(results[i].name)
        //  is there a release date available? if so...
        if (results[i].original_release_date !== undefined) {
          //  format release date
          var date = new Date(results[i].original_release_date);
          var newDate = date.toString('dd-MM-yy')
          // gets rid of unnecessary data
          newDate = newDate.replace(/00:00.*/, "");
          // save the release date
          var gameRelease = $("<p>").text("Release date: " + newDate);
          // if there is no release date, return 'unknown'
        } else if (results[i].original_release_date == undefined) {
          var gameRelease = $("<p>").text("Release date: unknown");
        }
        //  game description
        var gameInfo = $("<p>").text("Description: " + results[i].deck);
        //  add library button
        var newButton = $("<button>" + "add to library" + "</button>");
        newButton.addClass("add-game");
        newButton.val([i]);
        //  create a horizontal line
        var hr = $("<hr>")
        //  push game to search array
        searchResults.push(results[i].name);

        $("#search-results").append(gameName, image, gameInfo, gameRelease, newButton, hr)
      }

    }).fail(function () {
      console.log("error");
    }).always(function () {

    });

  }

  // game search input+++++++++++++++++++++++++++++++++++++++++

  $("#search-game").on("click", function (event) {
    event.preventDefault();
    var inputGame = $("#search-input").val().trim();
    //  console.log(inputGame)
    addGames(inputGame);
  })


  // add game to library
  $(document).on("click", ".add-game", function () {
    event.preventDefault();
    var x = $(this).val(); //grabs value that will match location within array and assigns to a new variable

    var newGame = searchResults[x]; //grabs game title from searchResults array
    gameLibrary.push(newGame); //adds to libray variable
    console.log(gameLibrary)
    // still need to add to game library DIV on profile page
    // store within firebase

  })


  // giantbomb API end <<<=================================================================


  // Profile creation start ============================================================>>>

  // object that will hold user profile locally
  var curUser = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    avatar: "",
    steamName: "",
    psnName: "",
    xboxName: "",
    nintendoId: "",
    aboutMe: "",
    status: "",
    // will add more later
  }

  $(document).on("click", "#profile-submit", function () {
    curUser.firstName = ("#first_name").val().trim();
    curUser.lastName = ("#last_name").val().trim();
    curUser.username = ("username").val().trim();
    curUser.email = ("#email").val().trim();
    curUser.steamName = ("#steam-name").val().trim();
    curUser.psnName = ("#psn-name").val().trim();
    curUser.xboxName = ("#gamer-tag").val().trim();
    curUser.nintendoId = ("#nintendo-id").val().trim();
    curUser.aboutMe = ("#about-input").val().trim();

    // print and format data to DIV containing user info on profile page
    // store data into firebase
  })

  $('.carousel.carousel-slider').carousel({
    fullWidth: true,
    indicators: true,
    next: 3
  });

  $('.sidenav').sidenav();
  $('.tabs').tabs({ swipeable: true });

  //  setInterval(function () {
  //     $('.carousel').carousel('next');
  //  }, 5000);

// find steam id.....
$(document).on("click", "#get-steam", function(){
  event.preventDefault();
  var vanityName = $("#steam-name").val().trim();
  getSteamName(vanityName)
})
function getSteamName(name){
  // Fetch steam user ID number
  var queryURL = "https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=597FC535B0A81C139B5227A808EAA15B&vanityurl=" + name
  $.ajax({
     url: queryURL,
     method: "GET"
  }).then(function (data) {
   
     var steamNumber = data.response.steamid;
   
     returnSteamName(steamNumber);
     
  })
}
function returnSteamName(id){
  var queryURL = "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=597FC535B0A81C139B5227A808EAA15B&steamids=" + id;
    $.ajax({
       url: queryURL,
       method: "GET"
    }).then(function (data) {
      var steamName = data.response.players[0].personaname;
      console.log(steamName)
      $("#steam-name").val(steamName);
    })
}


})

// Profile creation end <<<=================================================================


// firebase

   // firebase is blanked out for now until we work on it

/*


   

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



*/

