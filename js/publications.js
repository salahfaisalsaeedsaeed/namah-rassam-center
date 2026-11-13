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

/* Lazy first-page thumbnail rendering via Mozilla PDF.js (Apache 2.0). */
(function(){
  "use strict";
  const items=Array.from(document.querySelectorAll(".pub-preview-paper[data-pdf-src]"));
  if(!items.length)return;
  const arabic=document.documentElement.lang==="ar";
  const lib=window.pdfjsLib;
  const errorText=arabic?"المعاينة غير متاحة مؤقتًا؛ استخدم رابط DOI.":"Preview unavailable; use the DOI link.";
  const loadingText=arabic?"جاري تجهيز معاينة الصفحة الأولى…":"Rendering first-page preview…";
  const status=(el,message,isError)=>{
    const block=el.querySelector(".pub-preview-loading");
    const label=el.querySelector(".pub-preview-status-text");
    if(label)label.textContent=message;
    if(block)block.classList.toggle("is-error",Boolean(isError));
  };
  if(!lib || !lib.getDocument){
    for(const el of items)status(el,errorText,true);
    return;
  }
  lib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  let running=0;
  const queue=[];
  const limit=2;
  async function draw(el){
    let documentTask=null,pdf=null;
    try{
      const url=el.dataset.pdfSrc;
      const canvas=el.querySelector("canvas");
      if(!url||!canvas)throw new Error("Missing PDF source or canvas");
      status(el,loadingText,false);
      documentTask=lib.getDocument({url:url});
      pdf=await documentTask.promise;
      const page=await pdf.getPage(1);
      const nativeViewport=page.getViewport({scale:1});
      // Scale just the first page. A 2x cap keeps memory usage reasonable on phones.
      const cssWidth=Math.max(120,Math.floor(el.clientWidth-18));
      const pixelRatio=Math.min(2,Math.max(1,window.devicePixelRatio||1));
      const scaled=page.getViewport({scale:(cssWidth/nativeViewport.width)*pixelRatio});
      canvas.width=Math.ceil(scaled.width);
      canvas.height=Math.ceil(scaled.height);
      canvas.style.width=cssWidth+"px";
      canvas.style.height=Math.ceil(nativeViewport.height*cssWidth/nativeViewport.width)+"px";
      const context=canvas.getContext("2d",{alpha:false});
      if(!context)throw new Error("Canvas 2D context unavailable");
      await page.render({canvasContext:context,viewport:scaled,background:"#fff"}).promise;
      el.classList.add("is-ready");
    }catch(error){
      // A failed preview never hides bibliographic data or the official DOI link.
      console.warn("PDF first-page preview not available:",el.dataset.pdfSrc,error);
      status(el,errorText,true);
    }finally{
      if(pdf)try{await pdf.destroy()}catch(_){}
      running--;
      drain();
    }
  }
  function drain(){
    while(running<limit && queue.length){
      const el=queue.shift();
      if(!el||!el.isConnected)continue;
      running++;
      draw(el);
    }
  }
  function enqueue(el){
    if(el.dataset.previewQueued)return;
    el.dataset.previewQueued="1";
    queue.push(el);
    drain();
  }
  if("IntersectionObserver" in window){
    const observer=new IntersectionObserver(entries=>{
      for(const entry of entries){
        if(entry.isIntersecting){
          observer.unobserve(entry.target);
          enqueue(entry.target);
        }
      }
    },{rootMargin:"350px 0px",threshold:0.01});
    for(const el of items)observer.observe(el);
  }else{
    for(const el of items)enqueue(el);
  }
})();
