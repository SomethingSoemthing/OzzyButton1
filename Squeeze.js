let hoverStartTime;
let hoverDuration;
let audio = new Audio('Fart.mp3');
const fart = document.getElementById('Poop');
const Tip = document.getElementById('Poop2');
const element = document.getElementById('Oz');
var fadeInterval;
const minSize = 150; // initial size
const maxSize = 600; // maximum size
let currentSize = minSize;
const step = 1; // size change per frame
let animationId = null;
let isGrowing = false;
let isShrinking = false;


Poop.style.display = "none";
Poop2.style.display = "none";

function animateGrow() {
  if (currentSize >= maxSize) {
    cancelAnimationFrame(animationId);
    return;
  }
  currentSize += step;
  element.style.width = currentSize + 'px';
  element.style.height = currentSize + 'px';
  animationId = requestAnimationFrame(animateGrow);
}

function animateShrink() {
  if (currentSize <= minSize) {
    cancelAnimationFrame(animationId);
    return;
  }
  currentSize -= step;
  element.style.width = currentSize + 'px';
  element.style.height = currentSize + 'px';
  animationId = requestAnimationFrame(animateShrink);
}


element.addEventListener('touchstart', () => {
  hoverStartTime = Date.now();
  
  if (animationId) cancelAnimationFrame(animationId);
  isGrowing = true;
  isShrinking = false;
  animateGrow();
});

element.addEventListener('touchend', () => {
  if (hoverStartTime) { 
    if (animationId) cancelAnimationFrame(animationId);
  isShrinking = true;
  isGrowing = false;
  animateShrink();
    console.log('2');
    hoverDuration = Date.now() - hoverStartTime;
    // You can now use hoverDuration for further actions or display
    hoverStartTime = null; // Reset for next hover
    
    runForDuration(Boom, 1000, hoverDuration);
  }
});

function Boom() {
    element.style.transform = 'scale(1,1)'
}

function runForDuration(func, intervalMs, durationMs) {

  if (durationMs > 8000) {
    durationMs = 8000;
  }
  audio.volume = 1;
  audio.currentTime = 0.4;
  audio.play()
  navigator.vibrate(300);
  // Start the function repeating at the specified interval
  const intervalId = setInterval(func, intervalMs);
  
  // After the duration, clear the interval to stop the function
  setTimeout(() => {
    clearInterval(intervalId);
    element.style.pointerEvents = 'auto'; 
    Fadeout();
  }, durationMs);
  
}

function Fadeout() {
  const Fade = setInterval(function () {
    audio.volume -= 0.05;
  }, 20)

  setTimeout(() => {
    clearInterval(Fade);
    audio.pause()
  },360);
}





