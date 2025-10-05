// tabs.js — tab behavior
(() => {
  const $ = (s,el=document)=>el.querySelector(s);
  const $$ = (s,el=document)=>Array.from(el.querySelectorAll(s));
  $$(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
      $$(".tab").forEach(t=>t.classList.remove("active"));
      $$(".tabpanel").forEach(t=>t.classList.remove("active"));
      tab.classList.add("active");
      $("#"+tab.dataset.tab).classList.add("active");
    });
  });
})();