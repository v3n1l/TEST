const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

observer.unobserve(entry.target);
}

});

});

document.querySelectorAll(".fade").forEach((el)=>{

observer.observe(el);

});

window.addEventListener("load",()=>{
  const load = document.getElementById("loading");

  setTimeout(()=>{
    load.style.opacity = "0";
    load.style.transition = "0.6s";

    setTimeout(()=>{
      load.style.display = "none";
    },600);

  },800);
});
