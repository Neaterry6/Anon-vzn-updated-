export type User = { username:string; email:string; password:string; igHandle:string; role:'user'|'admin'; link:string };
const U='anon_users'; const S='anon_session'; const M='anon_msgs';
export const users=()=>JSON.parse(localStorage.getItem(U)||'[]') as User[];
export const setUsers=(v:User[])=>localStorage.setItem(U,JSON.stringify(v));
export const session=()=>JSON.parse(localStorage.getItem(S)||'null') as User|null;
export const setSession=(v:User|null)=> v?localStorage.setItem(S,JSON.stringify(v)):localStorage.removeItem(S);
export const messages=()=>JSON.parse(localStorage.getItem(M)||'[]') as any[];
export const setMessages=(v:any[])=>localStorage.setItem(M,JSON.stringify(v));
export const ensureSeed=()=>{const u=users(); if(!u.find(x=>x.email==='admin@anonvzn.app')){u.push({username:'Root_Admin',email:'admin@anonvzn.app',password:'Admin@1234',igHandle:'@root_admin',role:'admin',link:'/u/root_admin'});setUsers(u);} };
