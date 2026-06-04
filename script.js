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
// ② headerスクロール縮小
//////////////////////////////
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (!header) return;

  if (window.scrollY > 50) {
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  }
});


//////////////////////////////
// ③ IntersectionObserver
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
// ④ loadingアニメ + 終了処理
//////////////////////////////
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
