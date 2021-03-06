
// firebase
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
  var database = firebase.database();

  // maybe set these values initally to the firebase values?
var curUser = {
  username: "", 
  firstName: "",
  lastName: "",
  email: "",
  avatar: "",
  steamName: "",
  psnName: "",
  xboxName: "",
  nintendoId: "",
  aboutMe: "",
  status: "",
  steamOnline: "",
  steamLastOnline: "",
  gameLibrary: []
}




$(document).ready(function () {


  

  // giantbomb API start (for game library) =================================================================>>>
  
  var newLibrary = [];
  var searchResults = [];

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
        var gameImg = results[i].image.small_url;
        var image = $("<img src='" + gameImg + "' height='300px';width:auto/>")
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
        searchResults.push(results[i].image.small_url);
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
    
    newLibrary.push(newGame); //adds to libray variable
    localStorage.setItem("gamesArr", JSON.stringify(newLibrary))
    console.log(newLibrary)
    

  })

  


  // giantbomb API end <<<=================================================================


  







// gamer id card ends  <<<==================================================================

// start page floating button
$('.fixed-action-btn').floatingActionButton();

// tabs
$('.tabs').tabs();

$('.carousel.carousel-slider').carousel({
  fullWidth: true,
  indicators: true,
  next: 3
});

$('.sidenav').sidenav();

$('.tabs').tabs();

setInterval(function () {
  $('.carousel').carousel('next');
}, 5000);


$("#signout-btn").click(function () {
  firebase.auth().signOut();
  localStorage.clear();
  window.location = "startpage.html";

});


})

function populatePage(){
  // draw();
  // game library
  if(localStorage.getItem("gamesArr") !== null){
  var retrievedData = localStorage.getItem("gamesArr");
  var gamesLibrary = JSON.parse(retrievedData);
  for(i=0; i<gamesLibrary.length; i++){
    var newImage = $("<img src='" + gamesLibrary[i] + "' height='200px';width=auto/>")
    $("#library").append(newImage);

  }
}
  firebase.auth().onAuthStateChanged( user => {

    firebase.database().ref('/users/' + firebase.auth().currentUser.uid).once('value').then(function(snapshot) {
   
      

       // // username
       if(snapshot.val().username !== null){
    $("#nameOfUser").html("<h1>" + snapshot.val().username + "</h1>");
       } else {
        $("#nameOfUser").html("<h1>John Smith</h1>");
       }
    // real name
    if (snapshot.val().firstname !== null && snapshot.val().lastName !== null) {
    $("#real-name").html("<h3>(" + snapshot.val().firstname + " " + snapshot.val().lastName + ")</h3>");
    } else if (snapshot.val().firstname !== undefined && snapshot.val().lastName == null){
      $("#real-name").html("<h3>(" + snapshot.val().firstname + ")</h3>");
    } else{
      $("#real-name").html("");
    }
    // // status
    if(snapshot.val().status !== undefined){
    $("#status").html("<p>" + snapshot.val().status + "</p>");
    } else {
      $("#status").html("<p>Update your status here</p>");
    }
    // // avatar
    if(snapshot.val().avatar !== undefined){
    $("#profileImage").html("<img src='" + snapshot.val().avatar + "' />");
    } else {
      $("#profileImage").html("<img src='assets/images/empty-photo.jpg' />");
    }
    // // psn
    $("#playStationUsername").html(snapshot.val().psnName);
    // // xbox
    $("#xboxUsername").html(snapshot.val().xboxName);
    // // steam
    $("#steamUsername").html(snapshot.val().steamName);
    // // game library
    
 

    // contact stuff
    if(snapshot.val().firstname !== undefined){
    $("#firstName").html(snapshot.val().firstname);
    } else {
      $("#firstName").html("not listed"); 
    }if(snapshot.val().lastName !== undefined){
      $("#lastName").html(snapshot.val().lastName);
      } else {
        $("#lastName").html("not listed");
      } 
      
    
    
    $("#emailOfUser").html(snapshot.val().email);
    });
   
   });



  // //  / Get the modal
  //  var modal = document.getElementById('modalEditStatus');
   
  //  // Get the button that opens the modal
  //  var btn = document.getElementById("buttonEditStatus");
   
  //  // Get the <span> element that closes the modal
  //  var span = document.getElementsByClassName("close")[0];
   
  //  // When the user clicks the button, open the modal 
  //  btn.onclick = function() {
  //     modal.style.display = "block";
  //  }
   
  //  // When the user clicks on <span> (x), close the modal
  //  span.onclick = function() {
  //     modal.style.display = "none";
  //  }
   
  //  // When the user clicks anywhere outside of the modal, close it
  //  window.onclick = function(event) {
  //     if (event.target == modal) {
  //         modal.style.display = "none";
  //     }
  //  }

   

}


// gamer id card start ==================================================================>>>>

// need to add onload="draw();" to body of page <---------------------!!!!!!
function draw() {
  var newImg;
  firebase.auth().onAuthStateChanged( user => {

    firebase.database().ref('/users/' + firebase.auth().currentUser.uid).once('value').then(function(snapshot) {
   
      newImg = $("<img src='" + snapshot.val().avatar + "' />");
      newImg.attr("id", "image-source");
      $("#image-share").html(newImg);
      console.log(snapshot.val().avatar);
      
      var ctx = canvas.getContext('2d');
      ctx.drawImage(document.getElementById('image-source'), 8, 60, 180, 180)
      // if(snapshot.val().avatar !== undefined){
      // newImg = $("<img src='" + snapshot.val().avatar + "' />");
      // console.log(snapshot.val().avatar);
      // newImg.attr("id", "image-source");
      // var ctx = canvas.getContext('2d');
      // ctx.drawImage(document.getElementById('image-source'), 8, 60, 180, 180)
      // $("#image-share").html(newImg);
      // } else {
      //   newImg = $("<img src='assets/images/empty-photo.jpg' style='height: 150px; width: auto'/>");
      //   newImg.attr("id", "image-source");
      // $("#image-share").html(newImg);
      // var ctx = canvas.getContext('2d');
      // ctx.drawImage(document.getElementById('image-source'), 8, 60, 180, 180)
      // }
    });
   
   });
  
 
  // text
  var par = document.getElementById('canvas').getContext('2d');
  par.font = '30px serif';
  par.fillText("Gamer ID Card", 8, 40);
  // psn name
  if (curUser.psnName !== undefined) {
    par.fillText("psn: " + curUser.psnName, 220, 100);
  } else {
    par.fillText("psn: none", 220, 100);
  }
  // xbox name
  if (curUser.xboxName !== undefined) {
    par.fillText("xbox: " + curUser.xboxName, 220, 150);
  } else {
    par.fillText("xbox: none", 220, 150);
  }
  // steam name
  if (curUser.steamName !== undefined) {
    par.fillText("steam: " + curUser.steamName, 220, 200);
  } else {
    par.fillText("steam: none", 220, 200);
  }

  // avatar image
 
}

// change status
$("#status-button").on("click", function(){
  var newStatus = $("#status-input").val().trim();
  database.ref("users/" + firebase.auth().currentUser.uid).update({
    status: newStatus
  })
  $("#status").html("<p>" + newStatus + "</p>");
})