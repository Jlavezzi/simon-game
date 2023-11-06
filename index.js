
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$('.btn').on('touchstart', function() {
  if (!started) {
    $('#level-title').text('Level ' + level);
    nextSequence();
    started = true;
  }
});

$('.btn').on('click', function() {
  var userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    var failed = new Audio('sounds/wrong.mp3');
    failed.play();
    $('body').addClass('game-over');
    setTimeout(function() {
      $('body').removeClass('game-over');
    }, 200);
    $('#level-title').text('Game Over, Click Any Button to Restart');
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $('#level-title').text('Level ' + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);

  $('#' + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
}

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColor) {
  $('#' + currentColor).addClass('pressed');
  setTimeout(function() {
    $('#' + currentColor).removeClass('pressed');
  }, 100);
}

function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
}
