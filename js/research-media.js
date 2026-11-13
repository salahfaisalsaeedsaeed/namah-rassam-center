(function(){
"use strict";
const dialog=document.querySelector("#research-slide-dialog");
if(!dialog)return;
const frame=dialog.querySelector(".rm-dialog-frame");
const download=dialog.querySelector(".rm-dialog-footer a");
const heading=dialog.querySelector(".rm-dialog-heading");
const close=dialog.querySelector(".rm-dialog-close");
let trigger=null;
document.querySelectorAll("[data-presentation-src]").forEach(button=>{
  button.addEventListener("click",()=>{
    const relative=button.getAttribute("data-presentation-src");
    if(!relative)return;
    const href=new URL(relative,document.baseURI).href;
    if(typeof dialog.showModal!=="function"){
      window.open(href,"_blank","noopener,noreferrer");
      return;
    }
    trigger=button;
    heading.textContent=button.getAttribute("data-presentation-title")||"Research presentation";
    frame.setAttribute("title",heading.textContent);
    frame.src=href+"#view=FitH";
    download.href=href;
    dialog.showModal();
  });
});
if(close)close.addEventListener("click",()=>dialog.close());
dialog.addEventListener("close",()=>{
  frame.src="about:blank";
  if(trigger){trigger.focus();trigger=null;}
});
dialog.addEventListener("click",event=>{
  if(event.target===dialog)dialog.close();
});
})();