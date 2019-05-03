

let cards = ["far fa-gem", "far fa-gem", "far fa-paper-plane", "far fa-paper-plane", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];
let opened=[];
let moves = 0;
let matches= 0;
let timer;

createCards();
play();
playAgain();
startTimer();

//Shuffle the cards
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
// Function to give 4secs at first
$( document ).ready(function() {
    start()
    setTimeout(start, 4000);
})
//function on start : to hide all cards at first
function start(){
    $(".card").toggleClass("flipInY open show");
}

//function to randomly create all the cards when the game reloads
function createCards(){
    shuffle(cards);
    for (let i=0; i< cards.length; i++){
        $(".deck").append(`<li><i class="card  ${cards[i]}"></i></li>`);
    }
}
// On clicking on a card it shows it and then compare
function play (){
    $(".card").on("click", function(e){
        // to prevent another click when already open
        if ($(this).hasClass("open show")) { return; }
        var clicked = $(this);
        //display the clicked card by passing parameter
        display(clicked);
        //add to openlist
        addToOpen(clicked);
        if(opened.length===2){           
            compare(opened);
            updateMoves();
        }        
    })
}
//function to show the card when clicking on it
function display(card){
    card.toggleClass("flipInY open show");
}
//function to add the opened card to a list
function addToOpen(card){
    opened.push(card);
}
//to compare the second opened card with the first one
function compare(opened){
    if (opened[0][0].classList[2] === opened[1][0].classList[2]) {
    opened[0][0].classList.add("bounceIn", "match");
    opened[1][0].classList.add("bounceIn", "match");
    $(opened[0]).off('click');
    $(opened[1]).off('click');
    matches++
    removeOpenCards();
    winGame();
    } else {
    opened[0][0].classList.add("shake", "unmatch");
    opened[1][0].classList.add("shake", "unmatch");
    setTimeout(removeClasses, 1100);
    setTimeout(removeOpenCards, 1100);   
    }
    stars();
}

// remove the cards from the opened card list
function removeOpenCards() {
    opened= [];
}

// Remove all classes except "match"
function removeClasses() {
    opened.forEach(function(card){
        card.removeClass("show open flipInY bounceIn shake unmatch");
    })
}
// Update after each round
function updateMoves(){
    moves++
    if (moves === 1){
        $("#movesText").text(" Move");
    } else {
        $("#movesText").text(" Moves");
    }
    $(".moves").text(moves.toString());
}
// to check if you finished the game
function winGame() {
    if(matches === 8){
    $(".main").css("display","none");
    $(".header").css("display","none");    
    $(".winner").css("display","block");
    clearInterval(timer)
    } 
}
// refresh key 
function playAgain() {
    $(".refresh").on("click", function() {
        location.reload()
    });
}
// function for rating your score
function stars() {
    if(moves >= 8 && moves <= 13){
        $(".noStars").text("2");
        $(".stars li:nth-child(3)").css("color", "lightgray")
    } else if (moves >= 14 && moves <= 20 ){
        $(".noStars").text("1");
        $(".stars li:nth-child(2)").css("color", "lightgray")
    } else if (moves >= 21){
        $(".noStars").text("Zero");
        $(".stars li:nth-child(1)").css("color", "lightgray")
    } else {
        $(".noStars").text("3");
    } 
}
// a timer triggerd after the first click to show how much time you will take to finish the game
function startTimer(){
   let secs=0,
       clicks=0;     
    $(".card").on("click", function(){
        clicks ++;
        // when secs and mins are less than 10 put "0" before the value
        function time ( val ) { return val > 9 ? val : "0" + val; }   
        if (clicks === 1){
            timer = setInterval(function(){
                secs++;
                $(".secs").html(time(secs % 60));
                $(".mins").html(time(parseInt(secs / 60)));
            },1000)
        }
    })
}
