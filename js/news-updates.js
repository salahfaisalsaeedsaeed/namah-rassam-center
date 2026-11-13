(function(){"use strict";const root=document.getElementById("verified-news");if(!root)return;
const ar=document.documentElement.lang==="ar";
const card=(tag,t,cls)=>{const el=document.createElement(tag);if(t!==undefined)el.textContent=t;if(cls)el.className=cls;return el};
fetch("/data/updates.json",{cache:"no-cache"}).then(r=>{if(!r.ok)throw Error(r.status);return r.json()}).then(data=>{
 const items=Array.isArray(data.items)?data.items.filter(x=>x&&typeof x.title_en==="string"&&/^https:\/\//.test(x.source_url||"")):[];
 root.replaceChildren();
 if(!items.length){root.append(card("p",ar?"لا توجد أخبار موثقة مُضافة إلى سجل الموقع حتى الآن.":"No verified updates have been added to the site yet.","up-empty"));return}
 for(const x of items){const article=card("article",undefined,"up-opp-card");
 article.append(card("h2",ar?(x.title_ar||x.title_en):x.title_en));
 article.append(card("p",ar?(x.description_ar||x.description_en||""):(x.description_en||"")));
 if(x.date)article.append(card("small",x.date));
 const a=card("a",ar?"عرض المصدر الرسمي ↗":"Read original source ↗");a.href=x.source_url;a.target="_blank";a.rel="noopener noreferrer";article.append(a);root.append(article)}
}).catch(()=>{root.replaceChildren(card("p",ar?"تعذّر تحميل سجل الأخبار.":"Unable to load verified updates.","up-empty"))});
})();