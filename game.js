var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var game_started = false;
var level = 0;

document.addEventListener("keydown", handleKeypress);

function handleKeypress(){
    if(!game_started){
        gamePattern = [];
        userClickedPattern = [];
        level = 0;
        game_started = true;
        nextSequence();
    }
}


$(".btn").click(function(event) {
    handler(event);
});

function handler(event){
    var userChoosenColor = event.currentTarget.id;
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length - 1);
}


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(currentLevel === gamePattern.length - 1){
            setTimeout(function(){
                userClickedPattern = [];
                nextSequence();
            }, 500);
        }
    }else{
        var wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")}
        ,200);
        game_started = false;
        $("#level-title").html("Game Over, Press Any Key To Continue");
    }
}

function playSound(name){
    var aud = new Audio("./sounds/" + name + ".mp3");
    aud.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}


function nextSequence(){
    $("#level-title").html("Level " + level);
    level++;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#" + randomChoosenColor).fadeIn(50).fadeOut(50).fadeIn(50);
    playSound(randomChoosenColor);
}
