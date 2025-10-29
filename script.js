const tg = window.Telegram.WebApp;
tg.expand(); // толық экран

const chatId = new URLSearchParams(window.location.search).get("chat");

document.getElementById("soloBtn").onclick = () => {
  document.getElementById("status").innerText = "🎮 Жеке ойын басталды!";
  tg.sendData(JSON.stringify({mode: "solo", chatId}));
};

document.getElementById("groupBtn").onclick = () => {
  document.getElementById("status").innerText = "👥 Топтық ойынға қосылдың!";
  fetch("https://<ТВОЙ-RENDER-АДРЕС>/join", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({chat_id: chatId, user_id: tg.initDataUnsafe?.user?.id})
  })
  .then(res => res.json())
  .then(() => {
    tg.sendData(JSON.stringify({mode: "group", chatId}));
  });
};
