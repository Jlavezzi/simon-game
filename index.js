//array of colors
var buttonColors = ["red" , "blue", "green", "yellow"];
//global scope of randomly chosen color submitted by the push keyword (seriers of random chosen colors)
var gamePattern = [];
// records what the user has inputed with clicks(series of clicks)
var userClickedPattern =[];
//to keeptrack of when the game starts
var started= false;
//game level
var level = 0;

//keypress event listener
$(document).on('keypress' ,function(){
  //code to be executed when a key id pressed

  // started is triggered by pressing a key on the keyboard, if keyboard is pressed, it deactivates this function by moving to nextSequence, if not,
if(!started){
  $('#level-title').text('level ' + level);
  nextSequence();
  started=true;
}
})

// click event listener
$('.btn').on('click',function() {
  //stores the id of the clicked button
  var userChosenColor= $(this).attr('id');
  //saving the id of the clicked button in userClickedPattern
  userClickedPattern.push(userChosenColor);
// refactored animate press function to give an effect to a mouse clicked button
         animatePress(userChosenColor)
         //refactored playsound to  give soundeffect when a user has clicked on a function
         playsound(userChosenColor)
         // refactored checkAnswer function to check the previous clicked answer if its correct or not
         checkAnswer(userClickedPattern.length-1)
})

//checks the answer by comparing the randomly selected answer against the use clicked color
function checkAnswer(currentLevel){
// checking if the game pattern is equal to the user clicked pattern
 if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
 //  checking if the lenght of the userClickedPattern and gamePattern are equal, if yes it sets timeout and runsa the next sequence
   if (userClickedPattern.length === gamePattern.length) {

     setTimeout(function(){
       nextSequence();
     },1000)

   }
// if the gamePattern isnt equal to userClickedPattern then run the code below
 }else{
   //console.log('wrong')
   //play the failure sound, add gameove class to the body, remove the gameover class in 2 milli secs,
// change level title , on keypress start the game over again
   var failed = new Audio('sounds/wrong.mp3')
   failed.play();
   $('body').addClass('game-over');
   setTimeout(function(){
     $('body').removeClass('game-over')
   },200);
   $('#level-title').text('Game Over, Press Any Key to Restart')
   startOver()
 }
}

// this function randomly selects colors and updates the game
function nextSequence(){
// emptying user clicked color patterns
  userClickedPattern=[]
// increasing the level when userClickedPattern == gamePattern
  level++
// updatiing the game to the next level
  $('#level-title').html('level ' +level)
// randomly selecting numbers between 0 and 3
  var randomNumber = Math.floor(Math.random() * 4);
  // binding randomly chosen number to select the color related to its index in the color array
  var randomChosenColor = buttonColors[randomNumber];
  // pushing the randomChosenColor into the global array 
  gamePattern.push(randomChosenColor);
  // the randomChosenColor is linked to its id in the html to make the button fade in and out
  $("#"+randomChosenColor)
  .fadeIn(100)
  .fadeOut(100)
  .fadeIn(100);
  // refactored function to make sound when a random chosen has been chosen
  playsound(randomChosenColor);
  }

// function to make sound, ts going to be passed into other functions to makesoud once some cinditions have been fullfilled
    function playsound(name){
       var baudio = new Audio('sounds/'+ name +".mp3")
          baudio.play()
     }

//animated function to also be passed later wen some conditions are fullfilled
//when a button is clicked add and remove pressed class within 1 milli second
  function animatePress(currentColor) {
    $('#'+currentColor).addClass('pressed')
    window.setTimeout(function(){
      $('#'+currentColor).removeClass("pressed")
    }, 100)
    }
// function to be called when gamePattern is not equal to userClickedPattern
//back tpo defaul arrangement
  function startOver(){
    started = false
    level = 0
    gamePattern =[]
  }
