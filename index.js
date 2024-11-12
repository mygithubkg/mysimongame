var buttoncolours = ["red","blue","green","yellow"];
var gamepattern = [];
var userClickedPattern = [];
var level = 0;

function nextsequence(){
    $('#level-title').text("Level "+level);
    level++;
    var randomnum = Math.floor(Math.random() *4);
    var randomChosenColour = buttoncolours[randomnum];
    gamepattern.push(randomChosenColour);
    playsound(randomChosenColour);
    animatePress(randomChosenColour);
}

function playsound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(name){
    $('#'+name).addClass("pressed");
    setTimeout(function(){
        $('#'+name).removeClass("pressed");
    },100);
}
function wrongPress(name){
    $('body').css('background-color',"red");
    setTimeout(function(){
        $('body').css('background-color',"#011F3F");
    },100);
    $('#'+name).addClass("pressed");
    setTimeout(function(){
        $('#'+name).removeClass("pressed");
    },100);

}
function checkAnswer(currentlevel,name){
    var i =0;
    while(i<=currentlevel){
        if (gamepattern[i] == userClickedPattern[i]){
            i++;
        }else{
            wrongPress(name);
            playsound("wrong");
            startover();
            return false;
        }
    }
    userClickedPattern =[];
    return true;
}


$('.btn').click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    if (userClickedPattern.length == gamepattern.length){
        if (checkAnswer(level,userChosenColour)){
            setTimeout(nextsequence(),80000);
        }
    }else if(gamepattern[userClickedPattern.length-1] != userChosenColour){
        wrongPress(userChosenColour);
        playsound("wrong");
    }
    animatePress(userChosenColour);
    playsound(userChosenColour);
        
      
})



function startover(){
    $('#level-title').text("Game Over! Press A/Start to start again");
    level = 0;
    gamepattern = [];
    userClickedPattern = [];
}

function starting(){
    level = 0;
    gamepattern = [];
    userClickedPattern = [];
    nextsequence();
}
$('body').keydown(function(event){
    if (event.key == 'A'){
        starting();
    }
})

$('.startbtn').click(function(){
    $('.startbtn').fadeOut(100).fadeIn(100);
    starting();
})

$('.resetbtn').click(function(){
    $('.resetbtn').fadeOut(100).fadeIn(100);
    startover();
}
);




