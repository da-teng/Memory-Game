/*
 * Create a list that holds all of your cards
 */
let icons = [
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bomb",
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bomb"
];

const c1 = $(".card1");
const c2 = $(".card2");
const c3 = $(".card3");
const c4 = $(".card4");
const c5 = $(".card5");
const c6 = $(".card6");
const c7 = $(".card7");
const c8 = $(".card8");
const c9 = $(".card9");
const c10 = $(".card10");
const c11 = $(".card11");
const c12 = $(".card12");
const c13 = $(".card13");
const c14 = $(".card14");
const c15 = $(".card15");
const c16 = $(".card16");

const cards = [
    c1,
    c2,
    c3,
    c4,
    c5,
    c6,
    c7,
    c8,
    c9,
    c10,
    c11,
    c12,
    c13,
    c14,
    c15,
    c16
];


let oldCards = [];
let oldIcons = [];
let moves = 0;
const timer = $('.timer').text();
const arr = timer.split(':');
let minutes = arr[0];
let seconds = arr[1];
let active = true;
let countMatch = 0;
let countStar = '3 stars';
let timeOut;
let countClicks = 0;


document.addEventListener('DOMContentLoaded', function() {
    startGame();
    // alert("Hello! I am an alert box!");
}, true);


/**
 * @function shuffle(array)
 * @description shuffle the list of icons
 */

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    icons = array;
    return icons;
}


/**
 * @function rateStars(a)
 * @description display star rating according to the number of moves
 */

function rateStars(a) {
    if (moves > 15 && moves < 30) {
        $('.stars').html("<li><i class = 'fa fa-star'></i></li>" +
            "<li><i class = 'fa fa-star'></i></li>");
        countStar = '2 stars';
    }
    if (moves >= 30) {
        $('.stars').html("<li><i class = 'fa fa-star'></i></li>");
        countStar = '1 stars';
    }
}

/**
 * @function clickCard()
 * @description main functional funtion of this game and attach click event listener to card
 */

function clickCard() {
    $(".card").click(function(e) {
            let targetCard = e.target;
            rateStars(moves);
            if (targetCard.classList.contains('match') === false) {
                countClicks++;
                if (countClicks === 1) {
                    startTimer();
                }
                $(targetCard).addClass("open");
                $(targetCard).addClass("show");
                let thisIcon = $(targetCard).children().attr("class");
                if (oldCards.length === 0 && oldIcons.length === 0) {
                    oldCards[0] = targetCard;
                    oldIcons[0] = thisIcon;
                } else {
                    if (oldIcons[0] === thisIcon && oldCards[0] !== targetCard) {
                        $(targetCard).addClass("match");
                        $(oldCards[0]).addClass("match");
                        moves++;
                        countMatch++;
                        $('.moves').text(moves);
                        oldIcons = [];
                        oldCards = [];
                    }
                    if (oldIcons[0] !== thisIcon && oldCards.length === 1 && oldIcons.length === 1 && oldCards[0] !== targetCard) {
                        setTimeout(function() {
                            $(targetCard).removeClass("open");
                            $(targetCard).removeClass("show");
                        }, 100);
                        $(oldCards[0]).removeClass("open");
                        $(oldCards[0]).removeClass("show");
                        if (targetCard.classList.contains("match") === false && oldCards[0] !== targetCard && oldCards.length !== 0 && oldIcons.length !== 0) {
                            moves++;
                            $('.moves').text(moves);
                            oldIcons = [];
                            oldCards = [];
                        }
                    }
                }
                winGame();
              }
            });
    }


    /**
     * @function startGame()
     * @description start the game
     */


    function startGame() {
        $('.stars').html("<li><i class = 'fa fa-star'></i></li>" +
            "<li><i class = 'fa fa-star'></i></li>" + "<li><i class = 'fa fa-star'></i></li>");
        active = true;
        $(".card").off('click');
        moves = 0;
        $('.moves').text(moves);
        $(".card").children().removeClass();
        $(".card").removeClass("open");
        $(".card").removeClass("show");
        $(".card").removeClass("match");
        shuffle(icons);
        for (let i = 0; i < cards.length; i++) {
            cards[i].children().addClass(icons[i]);
        }
        countClicks = 0;
        oldIcons = [];
        oldCards = [];
        clickCard();
    }


    /**
     * @function winGame()
     * @description create new interface after winning this game
     */

    function winGame() {
        let finalMoves = $('.moves').text();
        if (countMatch === 8) {
            $('.container').toggle();
            $('body').append("<div class = 'winning'></div>");
            $('.winning').append("<p class = 'modal'></p>");
            $('.modal').append("<p><i class='fa fa-trophy' aria-hidden='true'></i></p>");
            $('.winning').append("With " + finalMoves + " moves " + " and " + countStar + " in " + minutes + " minutes " + seconds + " seconds ");
            $('.winning').append("<button>Play Again!</button>");
            $('button').click(function() {
                $('.container').toggle();
                $('.winning').toggle();
                countMatch = 0;
                stopTimer();
                $('.stars').html("<li><i class = 'fa fa-star'></i></li>" +
                    "<li><i class = 'fa fa-star'></i></li>" + "<li><i class = 'fa fa-star'></i></li>");
                startGame();
            });
        }
    }


    $(".fa-repeat").click(function() {
        stopTimer();
        startGame();
    });


    /**
     * @function startTimer()
     * @description start the timer
     */


    function startTimer() {
        if (active) {
            if (seconds === 59) {
                minutes++;
                seconds = 0;
            }
            seconds++;
            if (seconds < 10) {
                $('.timer').html(minutes + " : 0" + seconds);
            } else {
                $('.timer').html(minutes + " : " + seconds);
            }
            timeOut = window.setTimeout(startTimer, 1000);
        }
    }


    /**
     * @function stopTimer()
     * @description reset the timer
     */

    function stopTimer() {
        active = false;
        seconds = 0;
        minutes = 0;
        $('.timer').html(minutes + " : " + seconds);
        clearTimeout(timeOut);
    }
