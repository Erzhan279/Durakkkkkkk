document.addEventListener('DOMContentLoaded', () => {

    // DOM элементтері
    const startGameBtn = document.getElementById('start-game-btn');
    const playerHandDiv = document.getElementById('player-hand');
    const opponentHandDiv = document.getElementById('opponent-hand');
    const deckDiv = document.getElementById('deck');
    const trumpCardDiv = document.getElementById('trump-card');

    // Карталардың негізгі параметрлері
    const SUITS = ['♥', '♦', '♣', '♠']; // Құрт (черви), Буби (бубны), Шыбын (крести), Кере (пики)
    const RANKS = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']; // Валет, Дама, Король, Туз

    // Ойынның негізгі айнымалылары
    let playerHand = [];
    let opponentHand = [];
    let deck = [];
    let trumpSuit = '';
    let isPlayerTurn = true;

    // Ойынды бастау
    startGameBtn.addEventListener('click', startGame);

    /**
     * Ойынды бастау функциясы
     */
    function startGame() {
        console.log('Ойын басталды!');
        
        // 1. Барлық карталарды тазалау
        playerHandDiv.innerHTML = '';
        opponentHandDiv.innerHTML = ''; // Компьютер карталарын да тазалау
        trumpCardDiv.innerHTML = ''; // Козырьді тазалау
        trumpCardDiv.classList.remove(...SUITS); // Козырьдің түсін алып тастау

        // 2. Карта колодасын жасау
        deck = createDeck();
        console.log('Колода жасалды:', deck.length + ' карта');

        // 3. Колоданы араластыру
        shuffleDeck(deck);
        console.log('Колода араластырылды.');

        // 4. Козырьді анықтау
        // (Бұл логика келесі қадамда қосылады)

        // 5. Ойыншыларға 6 картадан тарату
        // (Бұл логика келесі қадамда қосылады)

        // 6. Ойын алаңын жаңарту
        // updateUI();

        alert('Колода жасалып, араластырылды! Келесі қадам - карта тарату.');
    }

    /**
     * 36 картадан тұратын колода жасайды
     * @returns {Array} Карталар массиві (объектілер)
     */
    function createDeck() {
        const newDeck = [];
        // Әрбір түс (suit) үшін...
        for (let suit of SUITS) {
            // Әрбір ранг (rank) үшін...
            for (let rank of RANKS) {
                // Жаңа карта объектісін жасап, массивке қосамыз
                newDeck.push({ suit: suit, rank: rank });
            }
        }
        return newDeck;
    }

    /**
     * Колоданы араластырады (Fisher-Yates әдісі)
     * @param {Array} deck - Араластырылатын колода
     */
    function shuffleDeck(deck) {
        // Массивтің соңынан басына қарай жүреміз
        for (let i = deck.length - 1; i > 0; i--) {
            // 0 мен i арасында кездейсоқ индексті таңдаймыз
            const j = Math.floor(Math.random() * (i + 1));
            
            // Екі картаның орнын ауыстырамыз (deck[i] және deck[j])
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }

    /**
     * Ойын алаңын жаңартады (карталарды көрсетеді)
     */
    function updateUI() {
        // Бұл функция ойыншының қолындағы карталарды HTML-ге айналдырады
        // (Келесі қадамдарда толтырамыз)
        console.log('Интерфейс жаңартылуда...');
    }
    
    // --- Ойынның басқа логикалары (әзірге бос) ---

});
