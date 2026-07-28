window.RV=window.RV||{};
RV.queue=[];
RV.queueIndex=-1;
RV.ytPlayer=null;
RV.ytReady=false;

RV.sortByOrder=function(items){
  return [...items].sort((a,b)=>(a.order??0)-(b.order??0));
};

/*
 * Devuelve las carpetas en el mismo orden lógico en que se ven en la biblioteca:
 * 1) carpeta principal,
 * 2) sus subcarpetas en profundidad,
 * 3) siguiente carpeta principal.
 *
 * La carpeta padre aparece antes que sus hijas porque sus canciones directas
 * deben reproducirse primero. Las carpetas sin canciones directas se conservan
 * en el recorrido, pero luego se saltan automáticamente.
 */
RV.getFolderPlaybackOrder=function(){
  const ordered=[];
  const visit=parentId=>{
    RV.sortByOrder(RV.db.folders.filter(f=>f.parentId===parentId)).forEach(folder=>{
      ordered.push(folder);
      visit(folder.id);
    });
  };
  visit(null);
  return ordered;
};

RV.getSongsInFolder=function(folderId){
  return RV.sortByOrder(RV.db.songs.filter(song=>song.folderId===folderId));
};

RV.findNextPlayableFolder=function(currentFolderId){
  const folders=RV.getFolderPlaybackOrder();
  if(!folders.length)return null;

  const currentIndex=folders.findIndex(folder=>folder.id===currentFolderId);
  const start=currentIndex>=0?currentIndex:folders.length-1;

  // Recorre como máximo una vuelta completa y omite carpetas vacías.
  for(let step=1;step<=folders.length;step++){
    const candidate=folders[(start+step)%folders.length];
    const songs=RV.getSongsInFolder(candidate.id);
    if(songs.length)return {folder:candidate,songs};
  }
  return null;
};

RV.buildQueue=function(song){
  const list=song.folderId
    ? RV.getSongsInFolder(song.folderId)
    : RV.sortByOrder(RV.db.songs.filter(x=>!x.folderId));
  RV.queue=list;
  RV.queueIndex=RV.queue.findIndex(x=>x.id===song.id);
};

RV.showPlayer=function(song){
  document.querySelector('#playerBar').hidden=false;
  document.querySelector('#playerThumb').src=song.thumbnail;
  document.querySelector('#playerTitle').textContent=song.title;
  document.querySelector('#playerMeta').textContent=song.artist||'Artista desconocido';
};

RV.loadQueuedSong=function(song){
  if(!song)return;
  RV.db.currentSong=song.id;
  RV.save();
  RV.showPlayer(song);
  RV.ytPlayer?.loadVideoById(song.videoId);
};

RV.playSong=function(id){
  if(Date.now()<(RV.suppressOpenUntil||0))return;
  const song=RV.db.songs.find(x=>x.id===id);
  if(!song)return;
  RV.buildQueue(song);
  RV.db.currentSong=id;
  RV.save();
  RV.showPlayer(song);
  if(RV.ytReady){
    RV.ytPlayer.loadVideoById(song.videoId);
    document.querySelector('#playerBar').classList.remove('collapsed');
    document.querySelector('#playerToggle').textContent='▾';
  }
};

RV.nextSong=function(){
  if(!RV.queue.length)return;

  RV.queueIndex++;
  if(RV.queueIndex>=RV.queue.length){
    if(RV.db.settings.endMode==='repeat'){
      RV.queueIndex=0;
    }else{
      const currentFolderId=RV.queue[0]?.folderId??null;

      // “Por organizar” no forma parte del árbol de carpetas; se repite al terminar.
      if(currentFolderId===null){
        RV.queueIndex=0;
      }else{
        const next=RV.findNextPlayableFolder(currentFolderId);
        if(next){
          RV.queue=next.songs;
          RV.queueIndex=0;
        }else{
          // No existe ninguna otra carpeta con canciones.
          RV.queueIndex=0;
        }
      }
    }
  }

  RV.loadQueuedSong(RV.queue[RV.queueIndex]);
};

RV.prevSong=function(){
  if(!RV.queue.length)return;
  RV.queueIndex=(RV.queueIndex-1+RV.queue.length)%RV.queue.length;
  RV.loadQueuedSong(RV.queue[RV.queueIndex]);
};

RV.handlePlayerError=function(code){
  const song=RV.queue[RV.queueIndex]||RV.db.songs.find(x=>x.id===RV.db.currentSong);
  if(!song)return;
  document.querySelector('#blockedSongName').textContent=song.title;
  document.querySelector('#blockedErrorCode').textContent=`Código de YouTube: ${code}`;
  document.querySelector('#blockedDialog').showModal();
};

window.onYouTubeIframeAPIReady=()=>{
  RV.ytPlayer=new YT.Player('ytPlayer',{
    height:'360',
    width:'640',
    videoId:'',
    playerVars:{playsinline:1,controls:1,rel:0},
    events:{
      onReady:()=>{
        RV.ytReady=true;
        if(RV.db.currentSong){
          const song=RV.db.songs.find(x=>x.id===RV.db.currentSong);
          if(song){
            RV.buildQueue(song);
            RV.showPlayer(song);
          }
        }
      },
      onStateChange:event=>{
        if(event.data===0)RV.nextSong();
        document.querySelector('#playBtn').textContent=event.data===1?'Ⅱ':'▶';
      },
      onError:event=>RV.handlePlayerError(event.data)
    }
  });
};
