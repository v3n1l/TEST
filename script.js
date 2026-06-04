/* =========================
   ① loadingタイル生成
========================= */
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

window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
　const progress = Math.min(window.scrollY / 200, 1);
  if (!header) return;

  if (window.scrollY > 50) {
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  }
});


/* =========================
   ② IntersectionObserver
========================= */
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


/* =========================
   ③ loadingアニメ + 終了処理（統合版）
========================= */
window.addEventListener("load", () => {
  const loading = document.getElementById("loading");
  const tiles = document.querySelectorAll(".tile");

  if (!loading) return;

  // タイル崩壊アニメ
  tiles.forEach((tile, i) => {
    setTimeout(() => {
      tile.classList.add("hide");
    }, i * 15);
  });

  // 全体フェードアウト
  setTimeout(() => {
    loading.style.opacity = "0";
    loading.style.transition = "0.6s";

    setTimeout(() => {
      loading.remove();
    }, 600);
  }, 900);
});
