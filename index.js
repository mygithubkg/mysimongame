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
        startover();  
    }
    animatePress(userChosenColour);
    playsound(userChosenColour);      
})



function startover(){
    $('#level-title').text("Game Over! Press A to start again");
    level = 0;
    gamepattern = [];
    userClickedPattern = [];
    $('body').keydown(function(event){
        if (event.key == 'A'){
            nextsequence();
            $('body').off("keydown")
        }
    });  

}
$('body').keydown(function(event){
    if (event.key == 'A'){
        nextsequence();
        $('body').off("keydown")
    }
    

})





























// var gamepattern = [];

// function random_color() {
//   var randonnumber = Math.floor(Math.random() * 4);
//   var available_colors = ["green", "red", "yellow", "blue"];
//   var chosencolor = available_colors[randonnumber];
//   gamepattern.push(chosencolor);
//   return gamepattern;
// }

// var list = random_color();

// function sequence(list) {
//   $("#" + list[list.length - 1])
//     .fadeOut(100)
//     .fadeIn(100);
//   var audio = new Audio("sounds/" + list[list.length - 1] + ".mp3");
//   audio.play();
//   $("#" + list[list.length - 1]).addClass("pressed");
//   setTimeout(function () {
//     $("#" + list[list.length - 1]).removeClass("pressed");
//   }, 100);
// }

// function check(list, ok, i) {
//   if (list[i] == ok) {
//     return true;
//   } else {
//     return false;
//   }
// }

// var i = 0;
// var level = 1;

// function repeat() {
//   $("body").keydown(function (event) {
//     if (event.key == "A") {
//       sequence(list);
//       $("body").off("keydown");
//       move();
//     }
//   });
// }

// repeat();

// function move() {
//   var t = true;
//   while (t != false) {
//     $(".btn").click(function () {
//       $(this).addClass("pressed");
//       let self = this;
//       setTimeout(function () {
//         $(self).removeClass("pressed");
//       }, 100);
//       var ok = $(this).attr("id");
//       if (check(list, ok, i)) {
//         list = random_color();
//         setTimeout(sequence(list), 1000);
//       } else {
//         t = false;
//       }
//     });
//   }
// }

// function play_1(){
//     var gamepattern = random_color();
//     var selected = gamepattern[gamepattern.length -1];
//     $('.'+selected).fadeOut(100).fadeIn(100);
//     var audio = new Audio('./sounds/'+selected+'.mp3');
//     audio.play();
//     start(gamepattern);
// }

// play_1();

// function check(list){
//     $('.btn').click(function(){
//         if ($(this).attr('id') == list[j]){

//         }
//     })

// }
// function start(list){
//     $('.btn').off('click');
//     $('.btn').click(function(){
//         console.log(list);
//         for (var j = 0; j < list.length; j++){
//             console.log($(this).attr('id') == list[j])
//             if ($(this).attr('id') == list[j]){
//                 $(this).fadeOut(100).fadeIn(100);
//                 var audio = new Audio('./sounds/'+list[i]+'.mp3');
//                 audio.play();
//                 level++;
//                 setTimeout(play_1(),100000);
//             }else{
//                 gamepattern = [];
//                 $(this).fadeOut(100).fadeIn(100);
//                 $('body').css("background-color","red");
//                 setTimeout(function(){
//                 $('body').css("background-color","#011F3F");
//                 },100)
//                 var audio = new Audio('./sounds/wrong.mp3');
//                 audio.play();
//                 $('#level-title').text("Wrong!! Press A Key to Start");
//                 level = 0;
//                 break;
//             }

//         }

//     })
// }

// function wrong(){
//     $('.btn').click(function(){
//         $(this).fadeOut(100).fadeIn(100);
//         $('body').css("background-color","red");
//         setTimeout(function(){
//             $('body').css("background-color","#011F3F");
//         },100)
//         $('#level-title').text("Press A Key to Start");
//         var audio = new Audio('./sounds/wrong.mp3');
//         audio.play();
//     })
// }
