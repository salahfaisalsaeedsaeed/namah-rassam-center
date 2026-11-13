(function(){"use strict";
const mount=document.getElementById("opportunities-list");
if(!mount)return;
const lang=document.documentElement.lang==="ar"?"ar":"en";
const messages=lang==="ar"?{empty:"لا توجد فرص منشورة ببيانات مؤكدة في السجل حاليًا.",error:"تعذّر تحميل سجل الفرص. جرّب تحديث الصفحة.",source:"المصدر الرسمي",deadline:"آخر موعد مثبت",noDeadline:"لم يؤكد تاريخ الإغلاق",all:"جميع الفئات",found:"فرص متاحة في الفهرس"}:{empty:"No opportunities with verified details are listed yet.",error:"Unable to load opportunities. Try refreshing.",source:"Official source",deadline:"Verified deadline",noDeadline:"No verified deadline",all:"All categories",found:"verified listings"};
const query=document.getElementById("opp-search"),select=document.getElementById("opp-category"),count=document.getElementById("opp-count");
let rows=[];
function node(tag,cls,t){const e=document.createElement(tag);if(cls)e.className=cls;if(t!==undefined)e.textContent=t;return e}
function render(){
 mount.replaceChildren();
 const q=(query.value||"").toLocaleLowerCase().trim(),cat=select.value;
 const items=rows.filter(x=>(cat==="all"||x.category===cat)&&((x.title_ar+" "+x.title_en+" "+x.description_ar+" "+x.description_en+" "+x.organization).toLocaleLowerCase().includes(q)));
 count.textContent=items.length+" "+messages.found;
 if(!items.length){mount.append(node("p","up-empty",messages.empty));return}
 for(const x of items){
  const card=node("article","up-opp-card");
  card.append(node("h2","",x[lang==="ar"?"title_ar":"title_en"]||x.title_en));
  card.append(node("p","",x[lang==="ar"?"description_ar":"description_en"]||""));
  card.append(node("p","",x.organization+" · "+(x.deadline?messages.deadline+": "+x.deadline:messages.noDeadline)));
  const link=document.createElement("a");
  link.href=x.source_url;link.target="_blank";link.rel="noopener noreferrer";link.textContent=messages.source+" ↗";card.append(link);mount.append(card)
 }
}
fetch("/data/opportunities.json",{cache:"no-cache"}).then(r=>{if(!r.ok)throw Error(r.status);return r.json()}).then(d=>{
 rows=Array.isArray(d.items)?d.items.filter(x=>x&&typeof x.title_en==="string"&&typeof x.source_url==="string"&&/^https:\/\//.test(x.source_url)): [];
 const options=[...new Set(rows.map(x=>x.category).filter(Boolean))].sort();
 for(const cat of options){const o=document.createElement("option");o.value=cat;o.textContent=cat;select.append(o)}
 render();
}).catch(()=>{mount.replaceChildren(node("p","up-empty",messages.error));});
query.addEventListener("input",render);select.addEventListener("change",render);
})();