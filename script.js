// ① loadingタイル生成（最初にやる）
window.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("loading-grid");

  const cols = 12;
  const rows = 20;

  const count = cols * rows;

  for(let i = 0; i < count; i++){
    const tile = document.createElement("div");
    tile.className = "tile";
    grid.appendChild(tile);
  }
});

window.addEventListener("load", () => {
  const loading = document.getElementById("loading");
  const tiles = document.querySelectorAll(".tile");

  tiles.forEach((tile, i) => {
    setTimeout(() => {
      tile.classList.add("hide");
    }, i * 15); // ←ここが“気持ちよさ”
  });

  setTimeout(() => {
    loading.style.opacity = "0";
    loading.style.transition = "0.6s";

    setTimeout(() => {
      loading.remove();
    }, 600);
  }, 800);
});

// ② IntersectionObserver
const observer = new IntersectionObserver((entries) => {
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


// ③ loading消す処理
window.addEventListener("load", () => {
  const load = document.getElementById("loading");

  if (!load) return;

  setTimeout(() => {
    load.style.opacity = "0";
    load.style.transition = "0.6s";

    setTimeout(() => {
      load.style.display = "none";
    }, 600);
  }, 800);
});
