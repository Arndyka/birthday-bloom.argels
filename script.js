const BIRTHDAY = new Date("2026-07-20T00:00:00+07:00").getTime();
const BIRTHDAY_END = new Date("2026-07-21T00:00:00+07:00").getTime();
const notes = [
  "Senyummu selalu berhasil membuat hari biasa terasa istimewa.",
  "Terima kasih sudah menjadi rumah paling nyaman untuk pulang.",
  "Aku suka caramu membuat hal kecil terasa sangat berarti.",
  "Kalau bahagia punya nama, aku akan memanggilnya Angel.",
  "Bersamamu, aku ingin merayakan ribuan hari kecil berikutnya."
];
let noteIndex = 0;
let musicOn = false;
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const song = $("#birthdaySong");

const petals = [[4,1,12,9],[12,7,15,12],[21,2,11,8],[29,11,14,10],[38,4,17,13],[47,9,12,9],[56,0,15,11],[66,6,11,8],[74,2,16,12],[83,10,13,10],[91,4,15,11],[97,8,11,8]];
petals.forEach(([left,delay,duration,size]) => {
  const petal = document.createElement("i");
  Object.assign(petal.style,{left:`${left}%`,animationDelay:`-${delay}s`,animationDuration:`${duration}s`,width:`${size}px`,height:`${size}px`});
  $("#petals").appendChild(petal);
});

function setMusic(next) {
  musicOn = next;
  if (musicOn) song.play().catch(() => { musicOn = false; updateMusicButtons(); });
  else song.pause();
  updateMusicButtons();
}
function updateMusicButtons() {
  $$(".music-toggle").forEach((button) => {
    button.classList.toggle("playing", musicOn);
    button.setAttribute("aria-label", musicOn ? "Matikan musik" : "Putar musik");
  });
  const pill = $(".music-pill b"); if (pill) pill.textContent = musicOn ? "Playing" : "Music";
  const floatingIcon = $(".floating-music > span"); if (floatingIcon) floatingIcon.textContent = musicOn ? "Ⅱ" : "♪";
  const floatingText = $(".floating-music small"); if (floatingText) floatingText.textContent = musicOn ? "our little song" : "play our song";
}

function updateCountdown() {
  const distance = BIRTHDAY - Date.now();
  const arrived = distance <= 0;
  const safe = Math.max(distance, 0);
  $("#days").textContent = String(Math.floor(safe / 86400000)).padStart(2,"0");
  $("#hours").textContent = String(Math.floor((safe / 3600000) % 24)).padStart(2,"0");
  $("#minutes").textContent = String(Math.floor((safe / 60000) % 60)).padStart(2,"0");
  $("#seconds").textContent = String(Math.floor((safe / 1000) % 60)).padStart(2,"0");
  if (arrived) { $("#countEyebrow").textContent = "The day is finally here"; $("#countTitle").textContent = "Hari ini milik Angel!"; }
}

function showBirthday() {
  $("#birthdayModal").hidden = false;
  const confetti = $("#confetti"); confetti.hidden = false; confetti.innerHTML = "";
  Array.from({length:34}).forEach((_,index) => { const piece=document.createElement("i"); piece.style.left=`${(index*29)%100}%`; piece.style.animationDelay=`${(index%8)*.12}s`; confetti.appendChild(piece); });
  setTimeout(() => { confetti.hidden = true; },6500);
}

$("#openGift").addEventListener("click", () => {
  $("#giftGate").hidden = true; $("#siteShell").classList.add("is-open"); setMusic(true);
  const now=Date.now(); if(now>=BIRTHDAY && now<BIRTHDAY_END) setTimeout(showBirthday,850);
});
$$('.music-toggle').forEach((button)=>button.addEventListener('click',()=>setMusic(!musicOn)));
$$('.open-letter').forEach((button)=>button.addEventListener('click',()=>$("#letterModal").hidden=false));
$$('.close-letter').forEach((button)=>button.addEventListener('click',()=>$("#letterModal").hidden=true));
$$('.close-birthday').forEach((button)=>button.addEventListener('click',()=>$("#birthdayModal").hidden=true));
$("#letterModal").addEventListener("click",(event)=>{if(event.target===event.currentTarget) event.currentTarget.hidden=true;});
$("#previewNote").addEventListener("click",showBirthday);
$("#nextNote").addEventListener("click",()=>{noteIndex=(noteIndex+1)%notes.length;$("#noteNumber").textContent=String(noteIndex+1).padStart(2,"0");$("#noteText").textContent=notes[noteIndex];});
updateCountdown(); setInterval(updateCountdown,1000);
