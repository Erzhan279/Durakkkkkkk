document.addEventListener('DOMContentLoaded', () => {

    // ... (Басқа DOM элементтері мен айнымалылар өзгеріссіз қалады) ...

    const startGameBtn = document.getElementById('start-game-btn');
    const playerHandDiv = document.getElementById('player-hand');
    const opponentHandDiv = document.getElementById('opponent-hand');
    const deckDiv = document.getElementById('deck');
    const trumpCardDiv = document.getElementById('trump-card');

    const SUITS = ['♥', '♦', '♣', '♠']; 
    const RANKS = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']; 

    let playerHand = [];
    let opponentHand = [];
    let deck = [];
    let trumpSuit = '';
    let isPlayerTurn = true;

    startGameBtn.addEventListener('click', startGame);

    /**
     * Картаның түсіне байланысты CSS классын қайтарады
     */
    function getSuitClass(suit) {
        // Қызыл түстер: Құрт (♥), Буби (♦)
        if (suit === '♥' || suit === '♦') {
            return 'red-suit';
        }
        // Қара түстер: Шыбын (♣), Кере (♠)
        return 'black-suit';
    }

    /**
     * Ойынды бастау функциясы
     */
    function startGame() {
        console.log('Ойын басталды!');
        
        // 1. Барлық карталарды тазалау
        playerHandDiv.innerHTML = '';
        opponentHandDiv.innerHTML = '';
        trumpCardDiv.innerHTML = '';
        trumpCardDiv.className = 'card'; // Бастапқы класс

        // 2. Карта колодасын жасау және араластыру
        deck = createDeck();
        shuffleDeck(deck);

        // 3. Козырьді анықтау
        setTrump();

        // 4. Ойыншыларға 6 картадан тарату
        dealCards();

        // 5. Ойын алаңын жаңарту
        updateUI();

        console.log('Сіздің карталарыңыз:', playerHand);
        console.log('Козырь:', trumpSuit);

        // Бастау батырмасын жасыру
        startGameBtn.style.display = 'none';
    }

    // --- ҚОСЫЛҒАН ЛОГИКА ---

    /**
     * Колодадан соңғы картаны алып, козырь ретінде орнатады
     */
    function setTrump() {
        // Колоданың соңғы картасы козырь болады
        const trumpCard = deck.pop(); 
        
        trumpSuit = trumpCard.suit;
        
        // Козырь картасын дисплейде көрсету
        trumpCardDiv.innerHTML = `
            <span class="${getSuitClass(trumpSuit)}">${trumpCard.rank}${trumpCard.suit}</span>
        `;
        trumpCardDiv.classList.add(getSuitClass(trumpSuit));
        
        // Козырь картаны колоданың астына қайта қою (кейін қолдану үшін)
        deck.unshift(trumpCard);
        
        // Колодадағы карта саны жаңартылады
        deckDiv.innerHTML = `${deck.length}`; 
    }

    /**
     * Ойыншыларға 6 картадан таратады
     */
    function dealCards() {
        // Әр ойыншыға 6 картадан тарату
        for (let i = 0; i < 6; i++) {
            playerHand.push(deck.pop());
            opponentHand.push(deck.pop());
        }
    }

    // --- UI ЖАҢАРТУ ЛОГИКАСЫ ---

    /**
     * Ойын алаңын жаңартады (карталарды көрсетеді)
     */
    function updateUI() {
        // Ойыншының қолындағы карталарды дисплейде көрсету
        playerHandDiv.innerHTML = ''; // Қолды тазалау
        playerHand.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = `card ${getSuitClass(card.suit)}`;
            cardElement.innerHTML = `
                <span class="card-rank">${card.rank}</span>
                <span class="card-suit">${card.suit}</span>
            `;
            // Картаны басқандағы функцияны қосу (Келесі қадамда)
            // cardElement.addEventListener('click', () => handleCardClick(card)); 

            playerHandDiv.appendChild(cardElement);
        });

        // Қарсыластың қолындағы карталарды көрсету (тек сыртқы түрі)
        opponentHandDiv.innerHTML = '';
        for (let i = 0; i < opponentHand.length; i++) {
            const cardElement = document.createElement('div');
            cardElement.className = 'card card-back';
            opponentHandDiv.appendChild(cardElement);
        }
    }
    
    // --- Бұрынғы createDeck және shuffleDeck функциялары өзгеріссіз қалады ---
    
    function createDeck() {
        const newDeck = [];
        for (let suit of SUITS) {
            for (let rank of RANKS) {
                newDeck.push({ suit: suit, rank: rank });
            }
        }
        return newDeck;
    }

    function shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }

    // --- Ойынның басқа логикалары (әлі де жазылмаған) ---

});
