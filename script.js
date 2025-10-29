const tg = window.Telegram.WebApp;
tg.expand(); // экранды кеңейту

function pulse(btn) {
  btn.style.transform = 'scale(0.9)';
  setTimeout(() => btn.style.transform = 'scale(1)', 150);
}

document.getElementById('join').addEventListener('click', (e) => {
  pulse(e.target);
  tg.showAlert('👥 Топқа қосылу сұранысы жіберілді!');
});

document.getElementById('start').addEventListener('click', (e) => {
  pulse(e.target);
  tg.showAlert('🎮 Ойын басталды!');
});

document.getElementById('help').addEventListener('click', (e) => {
  pulse(e.target);
  tg.showAlert('🤖 Кеңес сұрау орындалды!');
});