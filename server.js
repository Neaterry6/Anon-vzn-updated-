import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticDir = path.join(__dirname, 'frontend', 'dist');

const state = { inbox:[{id:1,text:'I saw you at the gallery today... did you notice me? 🎨',revealed:false,read:false}], payments:[{id:'starter',title:'5 Reveals',price:1500}], moderation:{enabled:true}, notes:['Messages are stored client-side in this demo. Deleting browser storage deletes inbox history.'] };
const badWords=['kill','hate','idiot'];
const send=(res,code,payload,type='application/json')=>{res.writeHead(code,{'Content-Type':type});res.end(type==='application/json'?JSON.stringify(payload):payload)};
const body=req=>new Promise(resolve=>{let b='';req.on('data',d=>b+=d);req.on('end',()=>resolve(b?JSON.parse(b):{}));});

http.createServer(async (req,res)=>{
  const url = new URL(req.url,'http://localhost');
  if(url.pathname==='/api/state'&&req.method==='GET') return send(res,200,state);
  if(url.pathname==='/api/verify'&&req.method==='POST'){const {code}=await body(req);return String(code)==='123456'?send(res,200,{success:true,message:'Verification successful'}):send(res,400,{success:false,message:'Invalid code'});} 
  if(url.pathname==='/api/message/send'&&req.method==='POST'){const {text}=await body(req); if(badWords.some(w=>String(text).toLowerCase().includes(w))) return send(res,400,{success:false,message:'Blocked by AI moderation'}); return send(res,200,{success:true,message:'Anonymous message delivered'});}
  if(url.pathname==='/api/ai/chat'&&req.method==='POST'){const {provider,prompt}=await body(req);const engine=provider==='grok'?'Grok':'Gemini';return send(res,200,{reply:`[${engine}] Insight: ${prompt || 'Ask me anything'} | Caveat: anonymity is never absolute.`});}
  if(url.pathname==='/api/reveal/1'&&req.method==='POST'){state.inbox[0].revealed=true;state.inbox[0].sender='Neon_VIP';return send(res,200,state.inbox[0]);}

  let filePath = path.join(staticDir, url.pathname === '/' ? 'index.html' : url.pathname.slice(1));
  if (!filePath.startsWith(staticDir) || !fs.existsSync(filePath)) filePath = path.join(staticDir, 'index.html');
  if (fs.existsSync(filePath)) return send(res,200,fs.readFileSync(filePath),filePath.endsWith('.js')?'text/javascript':filePath.endsWith('.css')?'text/css':'text/html');
  return send(res,200,'Build frontend first: cd frontend && npm install && npm run build','text/plain');
}).listen(3000,()=>console.log('API running on :3000'));
