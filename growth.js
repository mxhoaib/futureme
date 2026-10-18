'use strict';
/* Growth hooks: "I sealed a letter" share card + invite link, keepsake CTA. Letter text is never shared. */
(function(){
Viral.init({slug:'futureme',name:'FutureMe',url:'https://mxhoaib.github.io/futureme/',emoji:'💌',c1:'#bf5af2',c2:'#ff6482'});
Viral.heroPay(document.querySelector('.hero'),{item:'keepsake',cta:'💌 Printable keepsake design',price:9});
const bar=Viral.payBar({item:'keepsake',label:'Make it a keepsake',cta:'Keepsake design',price:9});
const sec=document.createElement('section');sec.className='panel';sec.hidden=true;sec.id='shared';
const note=document.createElement('p');note.className='muted small';note.textContent='Only the open date goes on the card and link. Your letter stays private on this device.';sec.appendChild(note);
document.querySelectorAll('section.panel')[0].after(sec);
let open='';
const days=d=>Math.max(1,Math.ceil((new Date(d)-new Date(new Date().toISOString().slice(0,10)))/864e5));
const nice=d=>new Date(d+'T12:00:00').toLocaleDateString('en',{dateStyle:'long'});
const panel=Viral.sharePanel(sec,name=>open?{kicker:'Sealed a letter to my future self',big:`${days(open)} days`,line:`Opens on ${nice(open)}`,sub:'What would you tell yourself?',cta:'Write yours',
 text:`I just sealed a letter to my future self. It opens in ${days(open)} days 💌 Write one to yours:`,url:Viral.challengeUrl({o:open,n:name})}:{},{title:'Dare a friend to write one too',copyLabel:'🔗 Copy invite link'});
$('#seal').addEventListener('click',()=>{const l=load();if(!l.length)return;const lastL=l.reduce((a,b)=>a.id>b.id?a:b);if(Date.now()-lastL.id>5000)return;open=lastL.open;sec.hidden=false;panel.update();bar.show();sec.scrollIntoView({behavior:'smooth',block:'start'});Viral.count('sealed','Sealed a letter')});
const ch=Viral.readChallenge();
if(ch&&typeof ch.o==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(ch.o)&&!isNaN(new Date(ch.o))){const who=Viral.clean(ch.n,24)||'A friend';const future=ch.o>new Date().toISOString().slice(0,10);
 Viral.banner(future?`💌 ${who} sealed a letter to their future self. It opens in ${days(ch.o)} days. Write one to yours?`:`💌 ${who} wrote a letter to their future self. Your turn?`,'Write my letter',()=>{$('#msg').focus();$('#msg').scrollIntoView({behavior:'smooth',block:'center'})},$('.hero'))}
})();
