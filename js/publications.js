(function(){"use strict";
const root=document.querySelector(".publications-section");if(!root)return;
const input=root.querySelector("#pub-search"),buttons=Array.from(root.querySelectorAll("[data-pub-year]")),items=Array.from(root.querySelectorAll(".pub-entry")),list=root.querySelector("#publication-list"),label=root.querySelector("#pub-results-count"),noResults=root.querySelector("#pub-no-results");
const topic=root.querySelector("#pub-topic-filter"),kind=root.querySelector("#pub-kind-filter"),order=root.querySelector("#pub-order");
const arabic=document.documentElement.lang==="ar";
const original=new Map(items.map((entry,i)=>[entry,i]));
const clean=value=>String(value||"").normalize("NFKC").toLocaleLowerCase().trim().replace(/\s+/g," ");
let year="all";
function populate(select,selector){
 if(!select)return;
 const values=[...new Set(items.map(item=>item.querySelector(selector)?.textContent?.trim()).filter(Boolean))].sort((a,b)=>a.localeCompare(b,arabic?"ar":"en"));
 for(const v of values){const o=document.createElement("option");o.value=v;o.textContent=v;select.append(o)}
}
populate(topic,".pub-topic");populate(kind,".pub-kind");
function update(){
 const q=clean(input?.value),vTopic=topic?.value||"all",vKind=kind?.value||"all",sort=order?.value||"newest";
 if(list&&sort){const sorted=[...items].sort((a,b)=>{
 const diff=(Number(b.dataset.year)||0)-(Number(a.dataset.year)||0);
 return (sort==="newest"?diff:-diff)||original.get(a)-original.get(b);
 });for(const article of sorted)list.append(article);}
 let count=0;
 for(const article of items){
 const ok=(year==="all"||article.dataset.year===year)&&
 (vTopic==="all"||article.querySelector(".pub-topic")?.textContent.trim()===vTopic)&&
 (vKind==="all"||article.querySelector(".pub-kind")?.textContent.trim()===vKind)&&
 (!q||clean(article.dataset.search).includes(q));
 article.hidden=!ok;if(ok)count++;
 }
 if(label)label.textContent=arabic?"عرض "+count+" من "+items.length+" أوراق":"Showing "+count+" of "+items.length+" papers";
 if(noResults)noResults.hidden=count!==0;
}
input?.addEventListener("input",update);
topic?.addEventListener("change",update);
kind?.addEventListener("change",update);
order?.addEventListener("change",update);
for(const button of buttons){button.addEventListener("click",()=>{
 year=button.dataset.pubYear;
 for(const b of buttons){const active=b===button;b.classList.toggle("is-active",active);b.setAttribute("aria-pressed",String(active))}
 update();
});}
const url=new URL(window.location.href);const q=url.searchParams.get("q");if(q&&input)input.value=q;
update();
})();