import express from 'express';
import {createServer} from 'node:http';
import {WebSocketServer,WebSocket} from 'ws';
import {randomUUID} from 'node:crypto';
const app=express();app.use(express.static('public'));app.get('/health',(_,r)=>r.json({ok:true}));
const server=createServer(app), wss=new WebSocketServer({server,maxPayload:4096});
const clients=new Map(),seats=new Map();
const broadcast=m=>{const s=JSON.stringify(m);for(const c of clients.values())if(c.ws.readyState===WebSocket.OPEN)c.ws.send(s)};
wss.on('connection',ws=>{if(clients.size>=40){ws.close(1013,'World full');return}const id=randomUUID();const c={ws,id,x:0,y:0,z:12,a:0,hp:100,name:'Visitor',vehicle:null,seat:-1,last:0};clients.set(id,c);ws.send(JSON.stringify({type:'hello',id}));
ws.on('message',raw=>{let m;try{m=JSON.parse(raw)}catch{return}if(m.type==='state'){const now=Date.now();if(now-c.last<40)return;c.last=now;if(['x','y','z','a'].every(k=>Number.isFinite(m[k]))&&Math.abs(m.x)<3000&&Math.abs(m.z)<3000){for(const k of ['x','y','z','a'])c[k]=m[k];c.name=String(m.name||'Visitor').replace(/[^\w -]/g,'').slice(0,20)}}
if(m.type==='seat'){const v=Number(m.vehicle),cap=Number(m.capacity);if(!Number.isInteger(v)||![2,4,6].includes(cap))return;if(c.vehicle!==null)return;const occupied=seats.get(v)||[];const seat=Array.from({length:cap},(_,i)=>i).find(i=>!occupied[i]);if(seat===undefined)return ws.send(JSON.stringify({type:'notice',text:'All seats occupied'}));occupied[seat]=id;seats.set(v,occupied);c.vehicle=v;c.seat=seat;ws.send(JSON.stringify({type:'seat',vehicle:v,seat}));}
if(m.type==='exit'){if(c.vehicle!==null){const s=seats.get(c.vehicle);if(s)s[c.seat]=null}c.vehicle=null;c.seat=-1;}
if(m.type==='vehicle'&&c.vehicle===m.id&&c.seat===0&&['x','y','z','a','speed'].every(k=>Number.isFinite(m[k])&&Math.abs(m[k])<5000))broadcast({type:'vehicle',id:m.id,x:m.x,y:m.y,z:m.z,a:m.a,speed:m.speed});
if(m.type==='hit'){const t=clients.get(m.target);if(!t)return;const d=Math.hypot(c.x-t.x,c.y-t.y,c.z-t.z);if(d<(m.ranged?65:3)&&Date.now()-(c.attack||0)>500){c.attack=Date.now();t.hp=Math.max(0,t.hp-(m.ranged?18:10));t.ws.send(JSON.stringify({type:'damage',amount:m.ranged?18:10}));}}
if(m.type==='chat'){broadcast({type:'chat',name:c.name,text:String(m.text||'').replace(/[<>]/g,'').slice(0,160)});}
});ws.on('close',()=>{if(c.vehicle!==null){const s=seats.get(c.vehicle);if(s)s[c.seat]=null}clients.delete(id);broadcast({type:'leave',id})});});
setInterval(()=>broadcast({type:'players',players:[...clients.values()].map(({ws,last,attack,...p})=>p)}),100);
server.listen(process.env.PORT||3000,'0.0.0.0',()=>console.log('Harborlight running'));
