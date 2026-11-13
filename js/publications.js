(function(){ "use strict";
const root=document.querySelector(".publications-section");
if(!root)return;
const input=root.querySelector("#pub-search"),buttons=Array.from(root.querySelectorAll("[data-pub-year]")),items=Array.from(root.querySelectorAll(".pub-entry")),label=root.querySelector("#pub-results-count"),noResults=root.querySelector("#pub-no-results");
const arabic=document.documentElement.lang==="ar";
let year="all";
function clean(value){return String(value||"").normalize("NFKC").toLowerCase().trim().replace(/\s+/g," ");}
function update(){
 const query=clean(input.value);
 let count=0;
 for(const article of items){
  const matchesYear=year==="all"||article.dataset.year===year;
  const matchesSearch=!query||clean(article.dataset.search).includes(query);
  const visible=matchesYear&&matchesSearch;
  article.hidden=!visible;if(visible)count++;
 }
 label.textContent=arabic?("عرض "+count+" من "+items.length+" أوراق"):("Showing "+count+" of "+items.length+" papers");
 noResults.hidden=count!==0;
}
input.addEventListener("input",update);
for(const button of buttons){button.addEventListener("click",()=>{
 year=button.dataset.pubYear;
 for(const other of buttons){let active=other===button;other.classList.toggle("is-active",active);other.setAttribute("aria-pressed",String(active));}
 update();
});}
update();
})();

