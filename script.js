document.addEventListener('DOMContentLoaded', () => {

    const singlePlayerBtn = document.getElementById('single-player-btn');
    const multiplayerBtn = document.getElementById('multiplayer-btn');
    
    // Ескерту: Бұл код тек басты бетті көрсетеді. 
    // Ойынға көшу үшін толық логика қажет.

    singlePlayerBtn.addEventListener('click', () => {
        // Жеке ойнау режимін бастау логикасы осында келеді
        alert('Жеке ойнау режиміне өту... (Келесі қадамда ойын алаңын жүктейміз)');
        
        // *Келесі қадам*: Ойын алаңы бар index.html мазмұнына ауысу немесе жаңа бетке өту
    });

    multiplayerBtn.addEventListener('click', () => {
        // Көп ойыншылы режимге өту логикасы
        alert('Telegram Mini App арқылы көп ойыншымен ойнау... (Бұл үшін Telegram API интеграциясы қажет)');
        
        // Telegram-ға сілтеме немесе терезе ашу
        // window.open('https://t.me/your_bot_name?startapp', '_blank');
    });

});
