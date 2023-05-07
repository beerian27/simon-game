const gameOverText = 'Game Over, Press Any Key to Restart';

let buttonColours = ['blue', 'green', 'yellow', 'red'];
let gamePattern = [];
let userClickedPattern = [];
let audio;
let gameState = {
    level: 0,
    started: false,
    lost: false
}

$(window).ready(function() {
    $(window).keydown(function (e) {
        if (!gameState.started) {
            $('#level-title').html('Level ' + gameState.level);
            nextSequence();
            gameState.started = true;
        }
    });
})

$('div.btn').click((event) => {
    let userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    if (userClickedPattern.length === gamePattern.length) {
        if (checkAnswer()) {
            userClickedPattern = [];
            setTimeout(nextSequence, 1000);
        } else {
            playSound('wrong');
            $('#level-title').html(gameOverText);
            $('body').toggleClass('game-over');
            setTimeout(function(){
                $('body').toggleClass('game-over');
            }, 200);
            startOver();
        }
    }
});

function nextSequence() {
    let randomNumber = (Math.floor(Math.random() * 3));
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#' + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    gameState.level++;
    $('#level-title').html('Level ' + gameState.level);
}

function playSound(name) {
    let audio = new Audio('/sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(colour) {
    $('#' + colour).toggleClass('pressed');
    setTimeout(function() {
        $('#' + colour).toggleClass('pressed');
    }, 100);
}

function checkAnswer() {
    for (let i = 0; i < gamePattern.length; i++) {
        if (gamePattern[i] != userClickedPattern[i]) {
            return false;
        }
    }
    return true;
}

function startOver() {
    gameState = {level: 0, started: false};
    gamePattern = [];
    userClickedPattern = [];
}
