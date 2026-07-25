window.RV=window.RV||{};
RV.STORAGE_KEY='tma_db';
RV.SKINS={red:{accent:'#e32727',accent2:'#7a0c0c'},blue:{accent:'#2584ff',accent2:'#103d80'},gray:{accent:'#929292',accent2:'#444'}};
RV.seed={folders:[{id:'metal',name:'Metal',parentId:null,order:0},{id:'atmosphere',name:'Atmósfera',parentId:null,order:1},{id:'rock',name:'Rock',parentId:null,order:2},{id:'soundtracks',name:'Soundtracks',parentId:null,order:3},{id:'power',name:'Power Metal',parentId:'metal',order:0},{id:'metalcore',name:'Metalcore',parentId:'metal',order:1}],songs:[],settings:{skin:'red',endMode:'next'},currentFolder:null,currentSong:null};
RV.loadDB=function(){let raw=null;try{raw=JSON.parse(localStorage.getItem(RV.STORAGE_KEY)||'null')}catch{};const db=raw||structuredClone(RV.seed);db.folders=Array.isArray(db.folders)?db.folders:[];db.songs=Array.isArray(db.songs)?db.songs:[];db.settings={...RV.seed.settings,...(db.settings||{})};if(db.settings.skin==='grey')db.settings.skin='gray';return db};
RV.db=RV.loadDB();
RV.save=function(){localStorage.setItem(RV.STORAGE_KEY,JSON.stringify(RV.db))};
RV.uid=function(){return crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2)};
