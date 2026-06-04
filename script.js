// ① loadingタイル生成（最初にやる）
window.addEventListener("DOMContentLoaded", () => {
  const loading = document.getElementById("loading");

  if (!loading) return;

  for (let i = 0; i < 100; i++) {
    const div = document.createElement("div");
    div.className = "tile";
    loading.appendChild(div);
  }
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
