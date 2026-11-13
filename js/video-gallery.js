(function(){"use strict";
const videos=[...document.querySelectorAll(".rm-video-card video, .up-video-tile video")];
const ar=document.documentElement.lang==="ar";
for(const video of videos){
 const parent=video.parentElement;if(!parent)return;
 parent.classList.add("up-video-shell");
 const b=document.createElement("button");b.type="button";b.className="up-video-play";
 b.setAttribute("aria-label",ar?"تشغيل فيديو العرض البحثي":"Play research presentation video");
 b.innerHTML='<span aria-hidden="true">▶</span><span>'+(ar?"تشغيل العرض":"Play video")+'</span>';
 parent.append(b);
 b.addEventListener("click",async()=>{try{video.controls=true;await video.play()}catch(err){b.setAttribute("aria-label",ar?"تعذر بدء التشغيل؛ افتح رابط الفيديو المباشر":"Playback failed; open the direct video link");b.hidden=false}});
 video.addEventListener("playing",()=>{b.hidden=true});
 video.addEventListener("ended",()=>{b.hidden=false});
 video.addEventListener("pause",()=>{b.hidden=false});
 video.addEventListener("error",()=>{b.hidden=false});
}
document.addEventListener("visibilitychange",()=>{if(document.hidden)for(const v of videos)if(!v.paused)v.pause()});
})();