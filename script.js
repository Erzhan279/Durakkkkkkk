const tg = window.Telegram.WebApp;
tg.expand();

document.getElementById("joinBtn").addEventListener("click", () => {
  tg.sendData("join_group");
  tg.showAlert("Топқа қосылу сұранысы жіберілді ✅");
});

document.getElementById("startBtn").addEventListener("click", () => {
  tg.sendData("start_game");
  tg.showAlert("Ойын басталды! 🎮");
});

document.getElementById("adviceBtn").addEventListener("click", () => {
  tg.sendData("ask_advice");
  tg.showAlert("🤖 Кеңес сұрау жіберілді");
});