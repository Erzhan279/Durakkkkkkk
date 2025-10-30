// Card status description:
// 0 - stack,
// 1 - first hand (Player 1),
// 2 - second hand (Player 2 / Computer),
// 3 - on field,
// 4 - out (trash)
function Card(id) {
    this.id = id;
    this.status = 0;
    this.hide = function(){
        document.getElementById(this.id).style
            .backgroundImage = "url('0.png')";
    }
    this.show = function(){
        document.getElementById(this.id).style
            .backgroundImage = "url('" + id + ".png')";
    }
}

const FIRST_HAND_OFFSET_X = 100;
const FIRST_HAND_OFFSET_Y = 300;
const SECOND_HAND_OFFSET_X = 100;
const SECOND_HAND_OFFSET_Y = 0;
const CENTER_OFFSET_Y = 120;
const CENTER_OFFSET_Y2 = 170;
const TRASH_OFFSET_X = 600;
const CARD_HAND_WIDTH = 85;

var allCards = [];
var cards = [];
var allCardsString = [];
var centerStack = [];
var compHand = [];
var currentPlayer = 1;
var mainKind = 0;

var stackSetup = function (){
    console.log("stack setup");
    var canvas = document.getElementById("canvas");
    for(var i = 1; i<5; i++) {
        for(var j=6;j<15;j++) {
            var cardId = i * 100 + j;
            allCards.push(cardId);
            allCardsString.push(cardId + "");
            var el = document.createElement('div');
            el.id = cardId;
            el.classList.add("card-back");
            canvas.appendChild(el);
            cards.push(new Card(cardId));
        }
    }
    for (var i = 0; i < cards.length; i++) {
      cards[i].status = 0;   
    }
}

var shuffle = function(array) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

var relayoutStack =  function() {
    console.log("stack relayout");
    var stackCards = cards.filter(card => card.status === 0);
    for (var i = 0; i < stackCards.length; i++) {
        var el = document.getElementById(stackCards[i].id);
        el.style.top = (i * 2) + "px";
        el.style.left = (i * 2) + "px";
        el.style.zIndex = i+"";
        stackCards[i].hide();
    }
    
    mainKind = getKind(cards[0].id);
    var mainEl = document.getElementById(cards[0].id);
    mainEl.style.top = (150) + "px";
    cards[0].show();
}

var refillHand = function(playerStatus) {
    var currentSize = getSize(playerStatus);
    if (currentSize >= 6) return; 
    var cardsToDraw = 6 - currentSize;
    var drawnCount = 0;
    
    for (var i = cards.length - 1; i >= 0 && drawnCount < cardsToDraw; i--) {
        if (cards[i].status === 0) { 
            cards[i].status = playerStatus; 
            drawnCount++;
        }
    }
}

var refillFirstHand = function() { refillHand(1); }
var refillSecondHand = function() { refillHand(2); }

function computerMove(){
    if(currentPlayer === 1 ) return;
    compHand = [];
    for(let i=0;i<cards.length;i++) {
        if (cards[i].status === 2) {
            compHand.push(i);
        }
    }
    var secondHandSize = compHand.length;
    let validMoveIndex = -1;
    for(let i = 0; i < secondHandSize; i++) {
        let globalIndex = compHand[i];
        if(isValidMove(globalIndex)){
            validMoveIndex = globalIndex;
            break; 
        }
    }
    
    if (validMoveIndex !== -1) {
        moveToCenter(validMoveIndex);
    } else {
        document.getElementById("next_move").click();
    }
}

function moveToCenter(index) {
    if(isGameOver()) {
        var winner = getWinner();
        alert("winner is " + winner);
        return;
    }
    
    if (cards[index].status === currentPlayer) {
        if(isValidMove(index)) {
            cards[index].status = 3;
            centerStack.push(index);
            renderSecondHand();
            renderFirstHand();
            renderCenter();
            if(centerStack.length % 2 === 0) {
                 changePlayer();
                 computerMove();
            } 
        }
    }
}

function getKind(id){ return (id - (id%100))/100; }
function getValue(id){ return id % 100; }

function isValidValue(id) {
  var values = [];  
  for(let i=0;i<centerStack.length;i++){
       values.push(cards[centerStack[i]].id % 100);
  }
  return values.includes(id%100);
}

function isValidMove(index) {
    var currentCardId = cards[index].id;
    var currentKind = getKind(currentCardId);
    if(centerStack.length === 0) return true;
    if(centerStack.length % 2 === 1) {
        var prevCardId = cards[centerStack[centerStack.length - 1]].id;
        var prevKind = getKind(prevCardId);
        if (currentKind === prevKind) {
            return getValue(currentCardId) > getValue(prevCardId);
        } else if (currentKind === mainKind && prevKind !== mainKind) {
            return true;
        } else return false;
    } else {
      return isValidValue(currentCardId); 
    }
}

function changePlayer() {
    currentPlayer === 2 ? currentPlayer = 1 : currentPlayer = 2;
}

var isGameOver = function(){
    var stackSize = getSize(0);
    var firstHandSize = getSize(1);
    var secondHandSize = getSize(2);
    return stackSize === 0 && (firstHandSize === 0 || secondHandSize === 0);
}

var getWinner = function(){
    var firstHandSize = getSize(1);
    var secondHandSize = getSize(2);
    if (firstHandSize === 0 && secondHandSize === 0) return 0;
    if(firstHandSize === 0) return 1;
    if(secondHandSize === 0) return 2;
    return 0;
}

var renderFirstHand = function() {
    var localCounter = 0;
    for(let i=0;i<cards.length;i++){
        if(cards[i].status===1) {
            localCounter++;
            var el = document.getElementById(cards[i].id);
            el.style.left = FIRST_HAND_OFFSET_X + localCounter * CARD_HAND_WIDTH+"px";
            el.style.top = FIRST_HAND_OFFSET_Y+"px";
            cards[i].show();
        }
    }
}

var renderSecondHand = function() {
    var localCounter = 0;
    for(let i=0;i<cards.length;i++){
        if(cards[i].status===2) {
            localCounter++;
            var el = document.getElementById(cards[i].id);
            el.style.left = SECOND_HAND_OFFSET_X + localCounter * CARD_HAND_WIDTH+"px";
            el.style.top = SECOND_HAND_OFFSET_Y+"px";
            cards[i].hide();
        }
    }
}

var renderCenter = function() {
    var localCounter = 0;
    for(let i=0;i<centerStack.length;i++){
        var el = document.getElementById(cards[centerStack[i]].id);
        el.style.left = SECOND_HAND_OFFSET_X + Math.floor((localCounter + 2) / 2) * CARD_HAND_WIDTH+"px";
        el.style.top = localCounter %2==0? CENTER_OFFSET_Y+"px": CENTER_OFFSET_Y2+"px";
        cards[centerStack[i]].show();
        el.style.zIndex = localCounter+"";
        localCounter++;
    }
}

var renderTrash = function() {
    var localCounter = 0;
    for(let i=0;i<cards.length;i++){
        if(cards[i].status===4) {
            localCounter++;
            var el = document.getElementById(cards[i].id);
            el.style.left = TRASH_OFFSET_X + localCounter * 2+"px";
            el.style.top = CENTER_OFFSET_Y+"px";
        }
    }
}

var getSize = function(status) {
    var counter = 0;
    for(let i=0;i<cards.length;i++){
        if(cards[i].status === status) counter++;
    }
    return counter;
}

function setupClickHandlers() {
    for(let i=0;i<cards.length;i++) {
        document.getElementById(cards[i].id).onclick = (function(index) {
            return function() { moveToCenter(index); }
        })(i);
    }
    
    document.getElementById("next_move").onclick = function(){
        if (centerStack.length === 0) return;
        var defenderWon = centerStack.length % 2 === 0; 
        for(let i=0;i<cards.length;i++) {
            if(cards[i].status===3) {
                if (defenderWon) {
                    cards[i].status = 4;
                    cards[i].hide();
                } else {
                    cards[i].status = currentPlayer; 
                }
            }
        }
        centerStack = [];
        if(isGameOver()) {
            var winner = getWinner();
            alert("winner is " + winner);
            return;
        }
        if (defenderWon) changePlayer();
        renderTrash();
        refillFirstHand();
        refillSecondHand();
        renderFirstHand();
        renderSecondHand();
        computerMove();
    };
}

// Initial game setup
stackSetup();
shuffle(cards);
relayoutStack();
refillFirstHand();
refillSecondHand();
renderFirstHand();
renderSecondHand();
setupClickHandlers();