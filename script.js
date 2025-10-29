/* Professional Mini App frontend
   - uses Telegram WebApp API (tg.sendData / showAlert)
   - calls backend endpoints on same origin: /join, /startgame, /advice
   - renders cards, select, send sample payload
*/

const tg = window.Telegram?.WebApp;
if (tg) tg.expand();

// helper UI
const toast = document.getElementById('toast');
function showToast(text, ms = 2000){
  toast.textContent = text;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), ms);
}

// backend base (same origin, change if needed)
const BACKEND = window.location.origin;

// get chat param (bot attaches ?chat=CHAT_ID when opening WebApp)
const params = new URLSearchParams(window.location.search);
const CHAT_ID = params.get('chat') ? Number(params.get('chat')) : null;

// sample deck images (use DeckOfCards API images)
const SAMPLE_CARDS = ['AS','AH','AD','AC','JS','JC','JD','JH','10S','9H'];
// map short code to image url
const cardImg = (code) => `https://deckofcardsapi.com/static/img/${code}.png`;

// state
let hand = []; // array of codes like 'AS'
let selected = new Set();

// DOM
const handEl = document.getElementById('hand');
const tableCardsEl = document.getElementById('tableCards');
const trumpEl = document.getElementById('trump');

function renderHand(){
  handEl.innerHTML = '';
  if(hand.length === 0){
    const hint = document.createElement('div');
    hint.style.opacity = '.7';
    hint.textContent = 'Қолыңызда карта жоқ — Ойынды бастау керек';
    handEl.appendChild(hint);
    return;
  }
  hand.forEach((code, i) => {
    const c = document.createElement('div');
    c.className = 'card';
    c.dataset.code = code;
    // use image
    const img = document.createElement('img');
    img.src = cardImg(code);
    img.alt = code;
    c.appendChild(img);

    // click => toggle select
    c.addEventListener('click', () => {
      if(selected.has(code)){
        selected.delete(code);
        c.classList.remove('selected');
      } else {
        selected.add(code);
        c.classList.add('selected');
      }
    });

    handEl.appendChild(c);
  });
}

function renderTableCards(arr){
  tableCardsEl.innerHTML = '';
  arr.forEach(code => {
    const c = document.createElement('div');
    c.className = 'card small';
    const img = document.createElement('img');
    img.src = cardImg(code);
    img.alt = code;
    c.appendChild(img);
    tableCardsEl.appendChild(c);
  });
}

// initial visual setup (non-game)
trumpEl.textContent = 'Козыр: —';
renderHand();
renderTableCards([]);

// UI buttons
document.getElementById('joinBtn').addEventListener('click', async () => {
  if(!tg) return alert('Telegram ішінде ашыңыз');
  if(!CHAT_ID) return showToast('Chat id табылмады');
  const user = tg.initDataUnsafe?.user;
  if(!user) { tg.showAlert('Telegram ішінде ашып көріңіз'); return; }
  try{
    await fetch(`${BACKEND}/join`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({user_id:user.id, chat_id: CHAT_ID})
    });
    tg.showAlert('Топқа қосылу сұранысы жіберілді ✅');
  }catch(e){
    console.error(e);
    showToast('Қате — қосылмады');
  }
});

document.getElementById('startBtn').addEventListener('click', async () => {
  if(!tg) return alert('Telegram ішінде ашыңыз');
  if(!CHAT_ID) return showToast('Chat id табылмады');
  try{
    const res = await fetch(`${BACKEND}/startgame`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({chat_id: CHAT_ID})
    });
    const j = await res.json();
    if(j.ok){
      // use returned state if provided; otherwise fake deal
      if(j.state){
        // map counts -> create sample hand
        const myId = tg.initDataUnsafe?.user?.id;
        if(j.state.hands_count && myId && j.state.hands_count[myId]){
          // just generate random sample hand of that length
          const n = j.state.hands_count[myId];
          hand = SAMPLE_CARDS.slice(0,n);
        } else {
          hand = SAMPLE_CARDS.slice(0,6);
        }
        // render trump if available
        if(j.state.trump) trumpEl.textContent = `Козыр: ${j.state.trump}`;
        else trumpEl.textContent = 'Козыр: —';
      } else {
        // fallback: generate a hand
        hand = SAMPLE_CARDS.slice(0,6);
        trumpEl.textContent = 'Козыр: ♠';
      }
      renderHand();
      showToast('Ойын басталды — карталар берілді');
    } else {
      showToast(j.error || 'Ойынды бастау мүмкін емес');
    }
  }catch(e){
    console.error(e);
    showToast('Серверге қосылу қатесі');
  }
});

document.getElementById('adviceBtn').addEventListener('click', async () => {
  if(!tg) { alert('Telegram ішінде ашыңыз'); return; }
  const user = tg.initDataUnsafe?.user;
  if(!user) { tg.showAlert('Telegram ішінде ашып көріңіз'); return; }
  // build minimal payload
  const handArr = Array.from(selected);
  const tableArr = []; // could be filled from table state
  const move = handArr.length>0? handArr[0] : (hand.length>0? hand[0] : null);
  try{
    const res = await fetch(`${BACKEND}/advice`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        user_id: user.id,
        chat_id: CHAT_ID,
        hand: handArr.length? handArr : hand.slice(0,3),
        table: tableArr,
        move: move
      })
    });
    const j = await res.json();
    // server posts advice into chat; show local confirmation
    if(j.ok) tg.showAlert('🤖 Кеңес жіберілді — чатта көрсетіледі');
    else tg.showAlert('Кеңес жіберу мүмкін болмады');
  }catch(e){
    console.error(e);
    tg.showAlert('Серверге қосылу қатесі');
  }
});