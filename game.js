var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

$(document).on("keypress", function(){
   if(!started){
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
   }
});

$(".btn").on("click", function() { 
   var userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);

   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length - 1);
});

function nextSequence(){
   userClickedPattern = [];
   level++;
   $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

   playSound(randomChosenColour);
   animatePress(randomChosenColour);
   
}

function playSound(name){
   var audio = new Audio("sounds/" + name + ".mp3");
   audio.play();
}

function animatePress(currentColour){
   var activeButton = $("." + currentColour).addClass("pressed");
   setTimeout(function() {$("." + currentColour).removeClass("pressed")} , 100);
}

function checkAnswer(currentLevel){
   if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
      console.log("successs");
   

   if(userClickedPattern.length === gamePattern.length){
      setTimeout( function(){nextSequence();} , 1000);
   }
   }else{
      console.log("wrong");
      var wrong = new Audio("sounds/wrong.mp3");
      wrong.play();

      $("body").addClass("game-over");
      setTimeout(function(){
         $("body").removeClass("game-over");
      } , 200);

      $("h1").text("Game Over. Press Any Key to Restart")
      startOver();
   }
}

function startOver(){
   level = 0;
   started = false;
   gamePattern = [];
  
}






