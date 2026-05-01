export const api = (path:string,init?:RequestInit)=>fetch(path,{headers:{'content-type':'application/json'},...init}).then(r=>r.json());
