const app = document.getElementById('app');
let state = null;
let route = 'verify';

const routes = ['verify','dashboard','groups','reveals','admin','support'];

async function api(url, options={}){const r=await fetch(url,{headers:{'content-type':'application/json'},...options});return r.json();}
async function load(){ state = await api('/api/state'); render(); }

function nav(){ return `<div class='top'><div class='brand'>Anon VZN</div><div class='nav'>${routes.map(r=>`<button class='${route===r?'active':''}' data-r='${r}'>${r[0].toUpperCase()+r.slice(1)}</button>`).join('')}</div></div>`}

function verifyPage(){return `<div class='page'><div class='card'><h1>Verify your email</h1><p class='small'>Enter the 6-digit code we sent to your email.</p><input id='otp' placeholder='123456' maxlength='6'/><br/><br/><button class='btn' id='verifyBtn'>VERIFY</button><p id='verifyMsg' class='small'></p></div></div>`}
function dashboardPage(){return `<div class='page'><div class='card hero'><h2>Your Identity Token</h2><h1>Ready to spill?</h1><button class='btn secondary' id='share'>Share your link</button></div><div class='card'><h2>Inbox</h2>${state.inbox.map(m=>`<div class='list-item'><div><b>${m.tag}</b><p>${m.text}</p><small>${m.ago}</small></div><div>${m.revealed?`<div><b>${m.sender}</b></div>`:`<button class='btn reveal' data-id='${m.id}'>Reveal Sender</button>`}</div></div>`).join('')}</div></div>`}
function groupsPage(){return `<div class='page'><div class='card'><h1>Neon Pulse Groups</h1>${state.groups.map(g=>`<div class='list-item'><div><b>${g.name}</b><div class='small'>${g.active} active</div></div><button class='btn secondary join'>Quick Join</button></div>`).join('')}</div></div>`}
function revealsPage(){return `<div class='page'><div class='card'><h1>Unlock Reveals</h1><div class='grid'>${state.payments.map(p=>`<div class='card'><span class='tag'>${p.id.toUpperCase()}</span><h2>${p.title}</h2><h3>₦${p.price.toLocaleString()}</h3><button class='btn pay' data-id='${p.id}'>Secure Payment</button></div>`).join('')}</div><p id='payMsg' class='small'></p></div></div>`}
function adminPage(){return `<div class='page'><div class='grid'><div class='card'><h1>System Overview</h1><div class='list-item'><b>Total users</b><h2>12.8k</h2></div><div class='list-item'><b>Premium</b><h2>2,410</h2></div><div class='list-item'><b>Pending Reports</b><h2>84</h2></div></div><div class='card'><h2>Platform Settings</h2><label>Ad Frequency<input type='range' min='1' max='20' value='8'/></label><div class='list-item'><span>Email OTP Required</span><input type='checkbox' checked/></div><button class='btn'>Update Security Policy</button></div></div></div>`}
function supportPage(){return `<div class='page'><div class='grid'><div class='card'><h2>Support History</h2><div class='list-item'><div><b>Account Verification</b><p>Can you please check my ID status?</p></div><span class='tag'>ACTIVE</span></div></div><div class='card'><h2>Admin Support</h2><div class='list-item'>Hello! How can I assist you?</div><div class='list-item' style='background:linear-gradient(90deg,var(--pink),#c30072);color:#fff'>Upload button seems unresponsive on my phone.</div><input id='msg' placeholder='Type message to admin...'/><br/><br/><button class='btn' id='send'>Send</button></div></div></div>`}

function page(){return ({verify:verifyPage,dashboard:dashboardPage,groups:groupsPage,reveals:revealsPage,admin:adminPage,support:supportPage})[route]();}
function render(){app.innerHTML=nav()+page();bind();}
function bind(){document.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{route=b.dataset.r;render();});
const v=document.getElementById('verifyBtn'); if(v) v.onclick=async()=>{const code=document.getElementById('otp').value; const r=await api('/api/verify',{method:'POST',body:JSON.stringify({code})});document.getElementById('verifyMsg').textContent=r.message; if(r.success){route='dashboard';render();}};
const share=document.getElementById('share'); if(share) share.onclick=()=>navigator.clipboard?.writeText('ngl.link/vibrant').then(()=>alert('Link copied!'));
document.querySelectorAll('.reveal').forEach(b=>b.onclick=async()=>{await api('/api/reveal/'+b.dataset.id,{method:'POST'});state=await api('/api/state');render();});
document.querySelectorAll('.pay').forEach(b=>b.onclick=async()=>{const r=await api('/api/payment',{method:'POST',body:JSON.stringify({planId:b.dataset.id})});document.getElementById('payMsg').textContent=`Payment initialized: ${r.reference}`;});
const send=document.getElementById('send'); if(send) send.onclick=()=>alert('Message sent to admin');
}
load();
