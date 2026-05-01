import React, { useEffect, useMemo, useState } from 'react';

const LS_USERS='anon_users'; const LS_SESSION='anon_session';
const getUsers=()=>JSON.parse(localStorage.getItem(LS_USERS)||'[]') as any[];
const saveUsers=(u:any[])=>localStorage.setItem(LS_USERS,JSON.stringify(u));
const getSession=()=>JSON.parse(localStorage.getItem(LS_SESSION)||'null');
const setSession=(s:any)=>localStorage.setItem(LS_SESSION,JSON.stringify(s));

const Card=({title,children}:{title:string;children:React.ReactNode})=><section className='card'><h2>{title}</h2>{children}</section>;
const Top=({title}:{title:string})=><div className='m-top'><b>Anon VZN</b><span>{title}</span></div>;

const SignUp=()=>{const [f,setF]=useState({username:'',email:'',password:''});const [msg,setMsg]=useState('');return <main className='page'><Top title='Create Account'/><Card title='Create Account'><input placeholder='username' onChange={e=>setF({...f,username:e.target.value})}/><input placeholder='email' onChange={e=>setF({...f,email:e.target.value})}/><input placeholder='password' type='password' onChange={e=>setF({...f,password:e.target.value})}/><button onClick={()=>{const users=getUsers();if(users.find(u=>u.email===f.email)) return setMsg('User already exists');users.push({...f,role:'user'});saveUsers(users);setMsg('Account created. Login now.');}}>Create Account</button><p>{msg}</p></Card></main>}
const Login=()=>{const [email,setEmail]=useState('');const [password,setPassword]=useState('');const [msg,setMsg]=useState('');return <main className='page'><Top title='Enter Sanctuary'/><Card title='Login'><input placeholder='email' onChange={e=>setEmail(e.target.value)}/><input type='password' placeholder='secret key' onChange={e=>setPassword(e.target.value)}/><button onClick={()=>{const u=getUsers().find((x:any)=>x.email===email&&x.password===password);if(!u) return setMsg('Invalid credentials');setSession(u);location.hash='#/feed';}}>Enter Sanctuary</button><p>{msg}</p></Card></main>}
const VerifySuccess=()=> <main className='page'><Card title='Verification Success'><p>Your identity is now masked.</p><button onClick={()=>location.hash='#/feed'}>Start Whispering</button><button onClick={()=>location.hash='#/dashboard'}>Go to Dashboard</button></Card></main>;

const Feed=()=> <main className='page'><Top title='Feed'/><Card title='Trending Creators'><div className='grid'>{['CyberGhost_99','NeonWhisp','PixelSage','VznMaster','EchoSoul'].map(x=><div key={x} className='creator'><b>{x}</b><button>Reveal Creator</button></div>)}</div></Card><Card title='Popular Whispers'><p>"Does anyone else ever feel like they're just an extra...?"</p><button>Like</button><button>Comment</button><button>Share</button></Card><Card title='Active Groups'><button onClick={()=>location.hash='#/group-chat'}>Quick Join</button></Card></main>;
const NeonChat=()=>{const [msg,setMsg]=useState('');const [list,setList]=useState(['Has anyone checked out the secret lounge reveal?']);return <main className='page'><Top title='Neon Pulse'/><Card title='Neon Pulse'><div className='chat'>{list.map((m,i)=><div key={i} className='bubble'>{m}</div>)}</div><input placeholder='Type a whisper...' value={msg} onChange={e=>setMsg(e.target.value)}/><button onClick={()=>{if(msg) setList([...list,msg]);setMsg('')}}>Send</button></Card></main>}
const GroupChat=()=> <main className='page'><Top title='Midnight Renegades'/><Card title='Group Chat'><p>Linked chat page with message composer and reveal card.</p><button onClick={()=>alert('Reveal sender flow triggered')}>Reveal Sender</button></Card></main>;
const Settings=()=>{const s=getSession();const [push,setPush]=useState(true);const [email,setEmail]=useState(false);return <main className='page'><Top title='Settings'/><Card title='Account'><p>{s?.username||'Guest'} {s?.email}</p><button onClick={()=>navigator.clipboard.writeText('ngl.link/vibrant')}>Share My Link</button></Card><Card title='Notifications'><label><input type='checkbox' checked={push} onChange={e=>setPush(e.target.checked)}/> Push notifications</label><label><input type='checkbox' checked={email} onChange={e=>setEmail(e.target.checked)}/> Email notifications</label></Card><Card title='General'><button onClick={()=>{localStorage.removeItem(LS_SESSION);location.hash='#/login';}}>Log Out</button></Card></main>}
const Support=()=>{const [m,setM]=useState('');const [list,setList]=useState(['Hello! Welcome to Anon VZN support.']);return <main className='page split'><aside className='side'><h3>Support History</h3></aside><section><Top title='Admin Support'/><Card title='Live Support'>{list.map((x,i)=><div key={i} className='bubble'>{x}</div>)}<input value={m} onChange={e=>setM(e.target.value)} placeholder='Type message to admin...'/><button onClick={()=>{if(m)setList([...list,m]);setM('')}}>Send</button></Card></section></main>}
const Dashboard=()=>{const session=getSession();const isAdmin=session?.role==='admin';return <main className='page'><Top title='Dashboard'/><Card title='Account Summary'><p>Logged in as: {session?.username||'Anonymous'}</p><button onClick={()=>location.hash=isAdmin?'#/admin':'#/feed'}>{isAdmin?'Open Admin Panel':'Open Feed'}</button></Card></main>}
const Admin=()=>{const session=getSession();const users=useMemo(()=>getUsers(),[]);if(session?.role!=='admin') return <main className='page'><Card title='Unauthorized'><p>Admin only.</p></Card></main>;return <main className='page'><Top title='Admin Panel'/><Card title='System Overview'><p>Total users: {users.length}</p><button onClick={()=>alert('Generate report')}>Generate Report</button></Card><Card title='User Moderation'>{users.map(u=><div key={u.email} className='item'><b>{u.username}</b><button onClick={()=>alert('Verified '+u.username)}>Verify</button></div>)}</Card></main>}

export const pages=[
 {path:'/',name:'Signup',component:SignUp},
 {path:'/login',name:'Login',component:Login},
 {path:'/verification-success',name:'Success',component:VerifySuccess},
 {path:'/feed',name:'Feed',component:Feed},
 {path:'/neon-chat',name:'NeonChat',component:NeonChat},
 {path:'/group-chat',name:'GroupChat',component:GroupChat},
 {path:'/settings',name:'Settings',component:Settings},
 {path:'/support',name:'Support',component:Support},
 {path:'/dashboard',name:'Dashboard',component:Dashboard},
 {path:'/admin',name:'Admin',component:Admin}
];

if(!getUsers().find((u:any)=>u.email==='admin@anonvzn.app')){const u=getUsers();u.push({username:'Root_Admin',email:'admin@anonvzn.app',password:'Admin@1234',role:'admin'});saveUsers(u)}
