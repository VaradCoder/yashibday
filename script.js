/* Cursor */
const cursor=document.querySelector('.cursor');
const dot=document.querySelector('.cursor-dot');
document.addEventListener('mousemove',e=>{
  cursor.style.left=dot.style.left=e.clientX+'px';
  cursor.style.top=dot.style.top=e.clientY+'px';
});

/* Hero */
gsap.to("#heroTitle",{opacity:1,duration:1});
gsap.to("#heroSub",{opacity:1,duration:1,delay:.6});

/* Slider */
const images=[
  "assets/images/1.png",
  "assets/images/2.png",
  "assets/images/3.png",
  "assets/images/4.png",
  "assets/images/5.png"
];
const slider=document.getElementById('slider');
let idx=0;
images.forEach(i=>{
  slider.innerHTML+=`<div class="slide"><div class="frame"><img src="${i}"></div></div>`;
});
function move(){slider.style.transform=`translateX(-${idx*100}%)`}
prev.onclick=()=>{idx=(idx-1+images.length)%images.length;move()}
next.onclick=()=>{idx=(idx+1)%images.length;move()}

/* Letter */
const openLetter=document.getElementById('openLetter');
const flap=document.getElementById('flap');
const letter=document.getElementById('letter');
const overlay=document.getElementById('overlay');
const closeBtn=document.getElementById('close');
const letterText=document.getElementById('letterText');

openLetter.onclick=()=>{
  gsap.to(flap,{rotateX:-180});
  overlay.style.display=letter.style.display='block';
  typeLetter();
  gsap.to(bgMusic,{volume:.25});
};
function closeLetter(){
  overlay.style.display=letter.style.display='none';
  gsap.to(flap,{rotateX:0});
  gsap.to(bgMusic,{volume:.5});
}
closeBtn.onclick=overlay.onclick=closeLetter;

/* Typewriter */
function typeLetter(){
  const text=letterText.textContent;
  letterText.textContent='';
  let i=0;
  (function t(){
    if(i<text.length){
      letterText.textContent+=text[i++];
      letter.scrollTop=letter.scrollHeight;
      setTimeout(t,25);
    }
  })();
}

/* Wishes */
gsap.utils.toArray('.card').forEach((c,i)=>{
  gsap.to(c,{opacity:1,y:0,delay:i*.15,scrollTrigger:{trigger:c,start:"top 80%"}});
});

/* Music — MOBILE SAFE */
const bgMusic=document.getElementById('bgMusic');
const muteToggle=document.getElementById('muteToggle');
let started=false;

muteToggle.onclick=()=>{
  if(!started){
    bgMusic.currentTime=24;
    bgMusic.volume=.5;
    bgMusic.play().then(()=>{
      started=true;
      muteToggle.textContent='🔊';
    });
    return;
  }
  bgMusic.muted=!bgMusic.muted;
  muteToggle.textContent=bgMusic.muted?'🔇':'🔊';
};

/* Confetti + Replay */
replayBtn.onclick=()=>{
  for(let i=0;i<60;i++){
    const c=document.createElement('div');
    c.style.cssText=`position:fixed;left:${Math.random()*100}vw;top:-10px;
    width:6px;height:12px;background:${Math.random()>.5?'#FFD84D':'#8B5CF6'};
    z-index:9999;pointer-events:none`;
    document.body.appendChild(c);
    gsap.to(c,{y:innerHeight+100,rotation:720,duration:3,onComplete:()=>c.remove()});
  }
  gsap.to(bgMusic,{volume:0,duration:1});
  window.scrollTo({top:0,behavior:'smooth'});
  setTimeout(()=>location.reload(),1800);
};
