import fs from 'node:fs';
import assert from 'node:assert/strict';
const read=(p)=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const data=JSON.parse(read('data/research.json'));const papers=data.papers;
assert.equal(papers.length,9,'must index nine papers');
assert.equal(papers.filter(p=>p.presentation).length,6,'must index six slide decks');
assert.equal(papers.filter(p=>p.video).length,5,'must index five recordings');
const ids=new Set();const dois=new Set();
for(const p of papers){
  assert(!ids.has(p.id),'duplicate ID '+p.id);ids.add(p.id);
  assert(!dois.has(p.doi),'duplicate DOI '+p.doi);dois.add(p.doi);
  for(const field of ['title_en','title_ar','summary_en','summary_ar','cover','authors','year','doi'])assert(p[field],'missing '+field+' '+p.id);
  for(const path of ['papers/'+p.id+'.html','en/papers/'+p.id+'.html']){
    const s=read(path);
    assert(s.includes(p.doi),'page missing DOI '+path);
    assert(s.includes('application/ld+json'),'missing scholarly structured data '+path);
    assert(s.includes('<h1'),'missing heading '+path);
    assert(s.includes('</html>'),'unclosed document '+path);
    assert(s.includes('href="/css/upgrade.css"'),'missing stylesheet '+path);
  }
}
for(const loc of ['','en/']){
 for(const path of ['index.html','publications.html','events.html','researchers.html','students.html','opportunities.html','people.html','news.html']){
  const s=read(loc+path);assert(s.includes('</html>'),'unclosed '+loc+path);
 }
 const home=read(loc+'index.html');assert(home.includes('up-stat-grid'),'missing homepage counts '+loc);
 const publications=read(loc+'publications.html');
 assert.equal((publications.match(/class="pub-entry"/g)||[]).length,9,'publications missing paper');
 assert.equal((publications.match(/class="up-detail-link"/g)||[]).length,9,'missing paper detail links');
 assert(publications.includes('id="pub-topic-filter"'),'missing topic filter');
 const events=read(loc+'events.html');assert.equal((events.match(/<video\s+controls/g)||[]).length,5,'missing videos');
 const authors=read(loc+'researchers.html');assert(authors.includes('up-author-grid'),'missing researcher index');
}
const sitemap=read('sitemap.xml');for(const p of papers)for(const loc of ['papers/','en/papers/'])assert(sitemap.includes(loc+p.id+'.html'),'missing sitemap entry '+p.id);
for(const path of ['css/upgrade.css','js/publications.js','js/opportunities.js','js/video-gallery.js','admin/editor.html'])assert(read(path).length>300,'empty '+path);
for(const key of ['data/opportunities.json','data/updates.json']){const v=JSON.parse(read(key));assert(Array.isArray(v.items),'invalid '+key)}
console.log('PASS: nine bilingual paper pages, six presentations, five video records, bilingual navigation, data registries and metadata.');
