/* ===============================
   CURSOR
================================ */
const cursor = document.querySelector('.cursor');
const dot = document.querySelector('.cursor-dot');

document.addEventListener('mousemove', e => {
  cursor.style.left = dot.style.left = e.clientX + 'px';
  cursor.style.top = dot.style.top = e.clientY + 'px';
});


/* ===============================
   HERO ANIMATION
================================ */
gsap.to("#heroTitle", { opacity: 1, duration: 1 });
gsap.to("#heroSub", { opacity: 1, duration: 1, delay: 0.6 });


/* ===============================
   SLIDER
================================ */
const images = [
  "assets/images/1.png",
  "assets/images/2.png",
  "assets/images/3.png",
  "assets/images/4.png",
  "assets/images/5.png"
];

const slider = document.getElementById('slider');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let index = 0;

images.forEach(src => {
  slider.insertAdjacentHTML(
    'beforeend',
    `<div class="slide">
       <div class="frame">
         <img src="${src}" alt="Memory">
       </div>
     </div>`
  );
});

function updateSlider() {
  slider.style.transform = `translateX(-${index * 100}%)`;
}

prev.addEventListener('click', () => {
  index = (index - 1 + images.length) % images.length;
  updateSlider();
});

next.addEventListener('click', () => {
  index = (index + 1) % images.length;
  updateSlider();
});


/* ===============================
   LETTER + TYPEWRITER
================================ */
const openLetter = document.getElementById('openLetter');
const flap = document.getElementById('flap');
const letter = document.getElementById('letter');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('close');
const letterText = document.getElementById('letterText');

const originalLetter = letterText.textContent.trim();

function typeLetter(speed = 25) {
  letterText.textContent = '';
  let i = 0;

  (function type() {
    if (i < originalLetter.length) {
      letterText.textContent += originalLetter.charAt(i++);
      letter.scrollTop = letter.scrollHeight;
      setTimeout(type, speed);
    }
  })();
}

openLetter.addEventListener('click', () => {
  gsap.to(flap, { rotateX: -180, duration: 0.8, ease: "power2.out" });
  overlay.style.display = 'block';
  letter.style.display = 'block';

  typeLetter();
  gsap.fromTo(letter, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1 });
  gsap.to(bgMusic, { volume: 0.25, duration: 0.6 });
});

function closeLetterFn() {
  gsap.to(letter, {
    scale: 0.9,
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      letter.style.display = 'none';
      overlay.style.display = 'none';
      gsap.to(flap, { rotateX: 0, duration: 0.6 });
    }
  });
  gsap.to(bgMusic, { volume: 0.5, duration: 0.6 });
}

closeBtn.addEventListener('click', closeLetterFn);
overlay.addEventListener('click', closeLetterFn);


/* ===============================
   WISHES (SCROLL ANIMATION)
================================ */
gsap.utils.toArray('.card').forEach((card, i) => {
  gsap.to(card, {
    opacity: 1,
    y: 0,
    delay: i * 0.15,
    scrollTrigger: {
      trigger: card,
      start: "top 80%"
    }
  });
});


/* ===============================
   AUDIO (MOBILE SAFE)
================================ */
const bgMusic = document.getElementById('bgMusic');
const muteToggle = document.getElementById('muteToggle');
const audioGate = document.getElementById('audioGate');
const startBtn = document.getElementById('startExperience');

let audioStarted = false;

startBtn.addEventListener('click', () => {
  bgMusic.currentTime = 24;
  bgMusic.volume = 0.5;

  bgMusic.play().then(() => {
    audioStarted = true;
    audioGate.style.display = 'none';
    muteToggle.textContent = '🔊';
  }).catch(err => {
    console.log('Audio blocked:', err);
  });
});

muteToggle.addEventListener('click', () => {
  if (!audioStarted) return;
  bgMusic.muted = !bgMusic.muted;
  muteToggle.textContent = bgMusic.muted ? '🔇' : '🔊';
});


/* ===============================
   CONFETTI + REPLAY
================================ */
const replayBtn = document.getElementById('replayBtn');

replayBtn.addEventListener('click', () => {

  // 🎉 Confetti
  for (let i = 0; i < 60; i++) {
    const conf = document.createElement('div');
    conf.style.cssText = `
      position:fixed;
      left:${Math.random() * 100}vw;
      top:-10px;
      width:6px;
      height:12px;
      background:${Math.random() > 0.5 ? '#FFD84D' : '#8B5CF6'};
      z-index:9999;
      pointer-events:none;
    `;
    document.body.appendChild(conf);

    gsap.to(conf, {
      y: window.innerHeight + 120,
      rotation: Math.random() * 720,
      duration: 3,
      ease: "power2.out",
      onComplete: () => conf.remove()
    });
  }

  // 🔇 Fade out music
  gsap.to(bgMusic, { volume: 0, duration: 1 });

  // ⬆ Scroll to hero
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // 🔄 Reload after animation
  setTimeout(() => location.reload(), 1800);
});
