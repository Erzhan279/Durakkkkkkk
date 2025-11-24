document.addEventListener('DOMContentLoaded', async () => {

    const singlePlayerBtn = document.getElementById('single-player-btn');
    const multiplayerBtn = document.getElementById('multiplayer-btn');

    // Тест үшін сұрақ
    const message = "Сәлем";

    try {
        const res = await fetch('https://n8n-render-6p2r.onrender.com/webhook-test/1d10ea87-7c62-46cd-8022-2da4df2252bd', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({question: message})
        });
        const data = await res.json();
        console.log('n8n жауап:', data);
    } catch(err) {
        console.error('Fetch қатесі:', err);
    }

    singlePlayerBtn.addEventListener('click', () => {
        alert('Жеке ойнау режиміне өту...');
    });

    multiplayerBtn.addEventListener('click', () => {
        alert('Telegram Mini App арқылы көп ойыншымен ойнау...');
    });

});
