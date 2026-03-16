const moodSelector = document.getElementById('mood-selector');
const video = document.getElementById('background-video');
const videoSource = video.querySelector("source");
const music = document.getElementById('bg-music');
const musicToggleBtn = document.getElementById('music-toggle');

let musicPlaying = localStorage.getItem('musicPlaying') === 'false' ? false : true;
if(!musicPlaying) music.pause(), musicToggleBtn.textContent='Play Music';

// ===== Mood settings =====
const moods = {
  cozy: {
    video:'assets/cozy.mp4',
    music:'assets/cozy.mp3',
    colors: {
      '--bg-panel':'rgba(255,255,255,0.6)',
      '--text-color':'#1B1B1B',
      '--accent-color':'#595f39',
      '--button-color':'#595f39',
      '--button-hover':'#454d2f'
    },
    font: "'Helvetica Neue', sans-serif"
  },
  focus: {
    video:'assets/focus.mp4',
    music:'assets/focus.mp3',
    colors: {
      '--bg-panel':'rgba(240,240,255,0.6)',
      '--text-color':'#001f3f',
      '--accent-color':'#0077b6',
      '--button-color':'#0077b6',
      '--button-hover':'#005f8f'
    },
    font: "'Arial', sans-serif"
  },
  relaxed: {
    video:'assets/relaxed.mp4',
    music:'assets/relaxed.mp3',
    colors: {
      '--bg-panel':'rgba(220,240,240,0.6)',
      '--text-color':'#0f2143',
      '--accent-color':'#354e56',
      '--button-color':'#354e56',
      '--button-hover':'#243a3e'
    },
    font: "'Georgia', serif"
  },
  energetic: {
    video:'assets/energetic.mp4',
    music:'assets/energetic.mp3',
    colors: {
      '--bg-panel':'rgba(255,245,230,0.6)',
      '--text-color':'#663300',
      '--accent-color':'#ff6f00',
      '--button-color':'#ff6f00',
      '--button-hover':'#cc5700'
    },
    font: "'Verdana', sans-serif"
  }
};

// ===== Smooth mood change =====
moodSelector.addEventListener('change', () => {
  const mood = moods[moodSelector.value];

  // Video fade
  video.style.opacity = 0;
  setTimeout(()=>{
    videoSource.src = mood.video;
    video.load();
    video.play();
    video.style.opacity = 0.7;
  }, 1000);

  // Music fade
  fadeOutMusic(music, 1000, ()=>{
    music.src = mood.music;
    if(musicPlaying) music.play();
    fadeInMusic(music,1000);
  });

  // Colors & font
  for(let prop in mood.colors){
    document.documentElement.style.setProperty(prop, mood.colors[prop]);
  }
  document.body.style.fontFamily = mood.font;
});

// ===== Music fade helpers =====
function fadeOutMusic(audio, duration, callback){
  const step = audio.volume / (duration / 50);
  const fade = setInterval(()=>{
    if(audio.volume - step <= 0){
      audio.volume=0; clearInterval(fade); if(callback) callback();
    } else audio.volume -= step;
  },50);
}
function fadeInMusic(audio,duration){
  audio.volume=0;
  const step = 1 / (duration/50);
  const fade = setInterval(()=>{
    if(audio.volume+step>=1){audio.volume=1; clearInterval(fade);}
    else audio.volume += step;
  },50);
}

// ===== Music toggle =====
musicToggleBtn.addEventListener('click', ()=>{
  if(musicPlaying){ music.pause(); musicToggleBtn.textContent='Play Music'; }
  else{ music.play(); musicToggleBtn.textContent='Pause Music'; }
  musicPlaying = !musicPlaying;
  localStorage.setItem('musicPlaying', musicPlaying);
});

// ===== Tasks, Notes, Timer =====
// Keep your existing task, notes, timer JS here (unchanged)
