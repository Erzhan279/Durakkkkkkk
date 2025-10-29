// DOM элементтері жүктелгенде ғана іске қосылады
document.addEventListener('DOMContentLoaded', () => {

    // Негізгі элементтерді анықтау
    const startGameBtn = document.getElementById('start-game-btn');
    const playerHandDiv = document.getElementById('player-hand');
    const opponentHandDiv = document.getElementById('opponent-hand');
    const deckDiv = document.getElementById('deck');
    const trumpCardDiv = document.getElementById('trump-card');

    // Ойынның негізгі айнымалылары (бос)
    let playerHand = [];
    let opponentHand = [];
    let deck = [];
    let trumpSuit = '';
    let isPlayerTurn = true;

    // Ойынды бастау батырмасын басқанда
    startGameBtn.addEventListener('click', startGame);

    /**
     * Ойынды бастау функциясы
     */
    function startGame() {
        console.log('Ойын басталды!');

        // 1. Барлық карталарды тазалау (егер қайта бастаса)
        playerHandDiv.innerHTML = '';
        opponentHandDiv.innerHTML = '';
        // ...басқа алаңдарды да тазалау

        // 2. Карта колодасын (36 карта) жасау
        deck = createDeck();

        // 3. Колоданы араластыру
        shuffleDeck(deck);

        // 4. Козырьді анықтау
        // (Колоданың соңғы картасын алып, көрсету)
        
        // 5. Ойыншыларға 6 картадан тарату
        // dealCards();

        // 6. Ойын алаңын жаңарту
        // updateUI();

        // 7. Алғашқы жүрісті анықтау
        // (Кіші козырь картасы бар ойыншы)
        
        alert('Сәттілік! Ойын логикасы әлі жазылған жоқ.');
    }

    /**
     * 36 картадан тұратын колода жасайды
     * @returns {Array} Карталар массиві
     */
    function createDeck() {
        // Бұл жерде 36 картаны (объект ретінде) жасайтын логика болуы керек
        // Мысалы: { suit: 'hearts', rank: '6' }, { suit: 'hearts', rank: '7' }...
        console.log('Карта колодасы жасалуда...');
        return []; // Әзірге бос массив
    }

    /**
     * Колоданы араластырады (Fisher-Yates әдісі)
     * @param {Array} deck - Араластырылатын колода
     */
    function shuffleDeck(deck) {
        // Бұл жерде массивті араластыру логикасы болуы керек
        console.log('Колода араластырылуда...');
    }

    /**
     * Ойыншыларға карта таратады
     */
    function dealCards() {
        // Ойыншыларға 6 картадан тарату логикасы
        console.log('Карталар таратылуда...');
    }

    /**
     * Ойын алаңын жаңартады (карталарды көрсетеді)
     */
    function updateUI() {
        // playerHandDiv-ке карталарды HTML элемент ретінде қосу
        // ...
        console.log('Интерфейс жаңартылуда...');
    }

    // --- Ойынның басқа негізгі логикалары ---
    
    // function handleCardClick(card) {
    //     // Ойыншы картаны басқанда не болатынын шешеді (жүру, қорғану)
    // }

    // function handleOpponentTurn() {
    //     // Компьютердің (AI) жүрісін анықтайтын логика
    // }

    // function checkWinner() {
    //     // Жеңімпазды немесе "дуракты" анықтау
    // }

});
