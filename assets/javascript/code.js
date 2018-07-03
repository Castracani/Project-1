

$(document).ready(function () {


   // Steam api =========================================================================================================================
   function getSteamId(steamId) {
      // Fetch steam user ID number
      var queryURL = "http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=597FC535B0A81C139B5227A808EAA15B&vanityurl=" + steamId
      $.ajax({
         url: queryURL,
         method: "GET"
      }).then(function (response) {
         steamNumber = response.steamid;
         getSteamProfile(steamNumber);
      })
   }
   $(document).on("click", "steam-id", function (event) {
      event.prevendDefault();
      var steamId = $("#steam-id-input").val().trim();
      addGames(steamId);
   })


   // Fetch steam user profile page

   // nick's steam ID for testing purposes: 76561197972752173

   function getSteamProfile(steamNumber) {
      var queryURL = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=597FC535B0A81C139B5227A808EAA15B&steamids=" + steamNumber;
      $.ajax({
         url: queryURL,
         method: "GET"
      }).then(function (response) {

      })
   }
   // ==================================================================================================================================

   // xboxAPI key 40687e73c58e72dd8d225be86a8a11de96b04dda

   // giantbomb API start =================================================================>>>
   var gameLibrary = [];
   var searchResults = [];

   function addGames(game) {

      var queryURL = "https://www.giantbomb.com/api/search/?api_key=47d89cf2776025d8ace3e66e641a4eb8bd066fc5&format=json&query=" + game + "&resources=game&format=json"
      $.ajax({
         url: queryURL,
         method: "GET"
      }).then(function (response) {
         console.log(response)
         // create a new list for the upcoming results
         var newList = $("<ul>");
         ("#game-div").append(newList);
         // clear searchResults array
         searchResults = [""];
         //  cycle through results
         for (i = 0; i < response.length; i++) {
            var newButton = $("<button>" + "add to library" + "</button");
            newButton.addClass("add-game");
            newButton.val([i]);
            var list = $("<li>");
            var gameName = $("<h1>").text(response.name);
            var gameImage = $("<img>").attr("src", response.thumb_url);
            var gameInfo = $("<p>").text(response.deck);

            // push game title to search array
            searchResults.push(gameName); // this will only save the title. We could decide to save an image instead

            // prints game name, game image, game info, and an 'add to library' button to DIV
            $("#game-div").append(list, gameName, gameImage, gameInfo, newButton);
         }

      })

      // game search input+++++++++++++++++++++++++++++++++++++++++

      $(document).on("click", "add-game", function (event) {
         event.prevendDefault();
         var inputGame = $("#game-input").val().trim();
         addGames(inputGame);
      })
   }

   // add game to library
   $(document).on("click", ".add-game", function () {
      event.preventDefault(); 
      var x = $(this).val(); //grabs value that will match location within array and assigns to a new variable
      var newGame = searchResults[x]; //grabs game title from searchResults array
      console.log(newGame);
      gameLibrary.push(newGame); //adds to libray variable
      // update DIV that contains game library
      // store within firebase
      
   })


   // giantbomb API end <<<=================================================================


   // Profile creation start ============================================================>>>

   // object that will hold user profile locally
   var curUser = {
      name: "",
      avatar: "",
      steamName: "",
      psnName: "",
      xboxName: "",
      nintendoId: "",
      aboutMe: "",
      status: "",
      // will add more later
   }

   $(document).on("click", "#user-submit", function () {
      curUser.name = ("#name-input").val().trim();
      curUser.steamName = ("#steam-input").val().trim();
      curUser.psnName = ("#psn-input").val().trim();
      curUser.xboxName = ("#xbox-input").val().trim();
      curUser.nintendoId = ("#nintendo-input").val().trim();
      curUser.aboutMe = ("#about-input").val().trim();

      // print and format data to DIV containing user info on profile page
      // store data into firebase
   })

   $('.carousel.carousel-slider').carousel({
      fullWidth: true,
      indicators: true,
      next: 3
   });

   setInterval(function () {
      $('.carousel').carousel('next');
   }, 5000);

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

