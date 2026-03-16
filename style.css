// ====== ELEMENTS ======
const moodSelector = document.getElementById('mood-selector');
const video = document.getElementById('background-video');
const videoSource = video.querySelector('source');
const music = document.getElementById('bg-music');
const musicToggleBtn = document.getElementById('music-toggle');
const headerTitle = document.querySelector('header h1');
const headerSubtitle = document.querySelector('header p');

const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('new-task');
const notesArea = document.getElementById('notes-area');
const timerDisplay = document.getElementById('timer-display');

let musicPlaying = localStorage.getItem('musicPlaying') !== 'false'; // default true

if (!musicPlaying) {
  music.pause();
  musicToggleBtn.textContent = 'Play Music';
}

// ====== MOOD SETTINGS ======
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
    font: "'Helvetica Neue', sans-serif",
    headerText: "Cozy vibes for deep focus 🔥",
    subtitle: "Relax and stay productive"
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
    font: "'Arial', sans-serif",
    headerText: "Stay Focused 🎯",
    subtitle: "Your productivity companion"
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
    font: "'Georgia', serif",
    headerText: "Relax and Refresh 🌿",
    subtitle: "Take it slow, stay productive"
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
    font: "'Verdana', sans-serif",
    headerText: "Get Energetic ⚡",
    subtitle: "Boost your energy and productivity"
  }
};

// ====== MOOD CHANGE ======
moodSelector.addEventListener('change', () => {
  const mood = moods[moodSelector.value];

  // Video fade
  video.style.opacity = 0;
  setTimeout(()=>{
    videoSource.src = mood.video;
    video.load();
    video.play();
    video.style.opacity = 0.7;
  }, 500);

  // Music fade
  fadeOutMusic(music, 500, ()=>{
    music.src = mood.music;
    if(musicPlaying) music.play();
    fadeInMusic(music, 500);
  });

  // Colors & font
  for(let prop in mood.colors){
    document.documentElement.style.setProperty(prop, mood.colors[prop]);
  }
  document.body.style.fontFamily = mood.font;

  // Header text
  headerTitle.textContent = mood.headerText;
  headerSubtitle.textContent = mood.subtitle;
});

// ====== MUSIC FADE HELPERS ======
function fadeOutMusic(audio, duration, callback){
  const step = audio.volume / (duration / 50);
  const fade = setInterval(()=>{
    if(audio.volume - step <= 0){
      audio.volume = 0;
      clearInterval(fade);
      if(callback) callback();
    } else audio.volume -= step;
  },50);
}

function fadeInMusic(audio, duration){
  audio.volume = 0;
  const step = 1 / (duration / 50);
  const fade = setInterval(()=>{
    if(audio.volume + step >= 1){
      audio.volume = 1;
      clearInterval(fade);
    } else audio.volume += step;
  },50);
}

// ====== MUSIC TOGGLE ======
musicToggleBtn.addEventListener('click', ()=>{
  if(musicPlaying){
    music.pause();
    musicToggleBtn.textContent = 'Play Music';
  } else {
    music.play();
    musicToggleBtn.textContent = 'Pause Music';
  }
  musicPlaying = !musicPlaying;
  localStorage.setItem('musicPlaying', musicPlaying);
});

// ====== TASKS ======
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  taskList.innerHTML = '';
  tasks.forEach((task, index)=>{
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = task;
    span.onclick = () => {
      span.style.textDecoration = span.style.textDecoration === 'line-through' ? 'none' : 'line-through';
    };
    li.appendChild(span);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.style.marginLeft = '1rem';
    delBtn.onclick = () => deleteTask(index);
    li.appendChild(delBtn);

    taskList.appendChild(li);
  });
}

function addTask(){
  const taskText = taskInput.value.trim();
  if(taskText !== ''){
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    loadTasks();
  }
}

function deleteTask(index){
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  tasks.splice(index,1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}

function resetTasks(){
  if(confirm("Are you sure you want to delete all tasks?")){
    localStorage.removeItem('tasks');
    loadTasks();
  }
}

loadTasks();

// ====== NOTES ======
function saveNotes(){
  localStorage.setItem('notes', notesArea.value);
  alert("Notes saved!");
}

notesArea.value = localStorage.getItem('notes') || '';

// ====== TIMER ======
let timerInterval;
let remainingTime = 0;

function startTimer(){
  const minutes = parseInt(document.getElementById('timer-minutes').value);
  if(isNaN(minutes) || minutes <= 0) return alert("Enter a valid number of minutes");
  remainingTime = minutes * 60;
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);
  updateTimer();
}

function pauseTimer(){ clearInterval(timerInterval); }

function resetTimer(){
  clearInterval(timerInterval);
  remainingTime = 0;
  timerDisplay.textContent = '00:00';
}

function updateTimer(){
  if(remainingTime <= 0){
    clearInterval(timerInterval);
    timerDisplay.textContent = '00:00';
    return;
  }
  const minutes = Math.floor(remainingTime / 60).toString().padStart(2,'0');
  const seconds = (remainingTime % 60).toString().padStart(2,'0');
  timerDisplay.textContent = `${minutes}:${seconds}`;
  remainingTime--;
}

// ====== INITIAL MUSIC SETUP ======
music.volume = 0.5;
if(musicPlaying){
  music.play().catch(()=> console.log("User interaction required to start music"));
}
