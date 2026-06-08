//////////////////////////////
// ① loadingタイル生成
//////////////////////////////
window.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("loading-grid");
  if (!grid) return;

  const cols = 12;
  const rows = 20;
  const count = cols * rows;

  for (let i = 0; i < count; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    grid.appendChild(tile);
  }
});


//////////////////////////////
// ② スクロール値管理（統合）
//////////////////////////////
let scrollY = 0;

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
});


//////////////////////////////
// ③ smooth header（rAF統合）
//////////////////////////////
const header = document.querySelector("header");

let current = 0;

function animate() {
  if (!header) return;

  current += (scrollY - current) * 0.1;

  const progress = Math.min(current / 200, 1);

  // shrink代替（統合）
  if (scrollY > 50) {
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  }

  // ガラス濃度
  header.style.background = `rgba(255,255,255,${0.45 + progress * 0.25})`;

  // transformアニメ
  header.style.transform = `
    scale(${1 - progress * 0.05})
    translateY(${progress * -4}px)
  `;

  requestAnimationFrame(animate);
}

animate();


//////////////////////////////
// ④ IntersectionObserver
//////////////////////////////
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
});

document.querySelectorAll(".fade").forEach(el => {
  observer.observe(el);
});


//////////////////////////////
// ⑤ loadingアニメ
//////////////////////////////
window.addEventListener("load", () => {
  const loading = document.getElementById("loading");
  const tiles = document.querySelectorAll(".tile");

  if (!loading) return;

  tiles.forEach((tile, i) => {
    setTimeout(() => {
      tile.classList.add("hide");
    }, i * 15);
  });

  setTimeout(() => {
    loading.style.opacity = "0";
    loading.style.transition = "0.6s";

    setTimeout(() => {
      loading.remove();
    }, 600);
  }, 900);
});

// =========================
// CURSOR
// =========================

const glow = document.querySelector('.cursor-glow');

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor(){
  currentX += (mouseX - currentX) * 0.12;
  currentY += (mouseY - currentY) * 0.12;

  glow.style.transform =
    `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;

  requestAnimationFrame(animateCursor);
}

animateCursor();

// =========================
// LIGHTBOX
// =========================

const images = document.querySelectorAll('.work-images img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

if(lightbox){

  images.forEach(img => {

    img.addEventListener('click', () => {

      lightboxImg.src = img.src;
      lightbox.classList.add('show');

    });

  });

  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('show');
  });

}


