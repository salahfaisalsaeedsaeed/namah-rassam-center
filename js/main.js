(function(){"use strict";
const menu=document.getElementById("menuToggle"),nav=document.getElementById("mainNav"),topBtn=document.getElementById("backToTop");
const ar=document.documentElement.lang==="ar";
function closeMenu(){if(!menu||!nav)return;nav.classList.remove("open");menu.setAttribute("aria-expanded","false");menu.setAttribute("aria-label",ar?"فتح القائمة":"Open menu")}
if(menu&&nav){
menu.addEventListener("click",()=>{const now=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(now));menu.setAttribute("aria-label",now?(ar?"إغلاق القائمة":"Close menu"):(ar?"فتح القائمة":"Open menu"))});
nav.addEventListener("click",event=>{if(event.target.closest("a"))closeMenu()});
document.addEventListener("keydown",event=>{if(event.key==="Escape"){closeMenu();menu.focus()}});
document.addEventListener("click",event=>{if(!nav.contains(event.target)&&!menu.contains(event.target))closeMenu()});
window.addEventListener("resize",()=>{if(window.innerWidth>920)closeMenu()});
}
function onScroll(){const h=document.getElementById("siteHeader");if(h)h.classList.toggle("scrolled",window.scrollY>10);if(topBtn)topBtn.classList.toggle("visible",window.scrollY>420)}
window.addEventListener("scroll",onScroll,{passive:true});onScroll();
if(topBtn)topBtn.addEventListener("click",()=>window.scrollTo({top:0,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"}));
document.querySelectorAll(".filter-bar").forEach(bar=>{const buttons=Array.from(bar.querySelectorAll(".filter-btn")),section=bar.closest(".section"),items=Array.from(section?section.querySelectorAll(".filter-item"):[]);
buttons.forEach(btn=>btn.addEventListener("click",()=>{const category=btn.dataset.filter;buttons.forEach(b=>{const active=b===btn;b.classList.toggle("active",active);b.setAttribute("aria-pressed",String(active))});items.forEach(el=>el.classList.toggle("hidden",category!=="all"&&el.dataset.category!==category))}))});
const year=document.getElementById("year");if(year)year.textContent=String(new Date().getFullYear());
const form=document.getElementById("contactForm");if(!form)return;
form.addEventListener("submit",event=>{event.preventDefault();let valid=true;const data={};
["name","email","service","message"].forEach(id=>{const field=document.getElementById(id),row=field.closest(".form-row"),error=row.querySelector(".error");const v=field.value.trim();data[id]=v;const missing=!v,invalid=id==="email"&&!!v&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
error.textContent=missing?(ar?"هذا الحقل مطلوب.":"This field is required."):invalid?(ar?"يرجى إدخال بريد إلكتروني صحيح.":"Enter a valid email address."):"";field.setAttribute("aria-invalid",String(missing||invalid));if(missing||invalid)valid=false});
if(!valid){const first=form.querySelector('[aria-invalid="true"]');first?.focus();return}
const subject=encodeURIComponent(ar?"استفسار - مركز نعمة رسام":"Inquiry - Na'mah Rassam Center");
const body=encodeURIComponent((ar?"الاسم: ":"Name: ")+data.name+"\n"+(ar?"البريد: ":"Email: ")+data.email+"\n"+(ar?"نوع الطلب: ":"Inquiry: ")+data.service+"\n\n"+data.message);
window.location.href="mailto:info@namahrassam.org?subject="+subject+"&body="+body;
});
})();