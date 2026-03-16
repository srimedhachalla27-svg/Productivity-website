// ===== Mood Selector =====
const moodSelector = document.getElementById('mood-selector');
const video = document.getElementById('background-video');
const videoSource = video.querySelector("source");
const music = document.getElementById('bg-music');

const moods = {
  cozy: { video:'assets/cozy.mp4', music:'assets/cozy.mp3' },
  focus: { video:'assets/focus.mp4', music:'assets/focus.mp3' },
  relaxed: { video:'assets/relaxed.mp4', music:'assets/relaxed.mp3' },
  energetic: { video:'assets/energetic.mp4', music:'assets/energetic.mp3' }
};

moodSelector.addEventListener('change', () => {
  const mood = moods[moodSelector.value];

  // Change video
  videoSource.src = mood.video;
  video.load();
  video.play();

  // Change music
  music.src = mood.music;
  music.play();
});

// ===== Tasks =====
const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task-btn');

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task;
    li.onclick = () => { 
      li.style.textDecoration = li.style.textDecoration === 'line-through' ? 'none' : 'line-through'; 
    };
    taskList.appendChild(li);
  });
}

function addTask() {
  const taskText = taskInput.value.trim();
  if(!taskText) return;
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  tasks.push(taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  taskInput.value = '';
  loadTasks();
}

addTaskBtn.addEventListener('click', addTask);
loadTasks();

// ===== Notes =====
const notesArea = document.getElementById('notes-area');
const saveNotesBtn = document.getElementById('save-notes-btn');
notesArea.value = localStorage.getItem('notes') || '';
saveNotesBtn.addEventListener('click', () => {
  localStorage.setItem('notes', notesArea.value);
  alert('Notes saved!');
});

// ===== Timer =====
let timerInterval;
let remainingTime = 0;

const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-timer-btn');
const pauseBtn = document.getElementById('pause-timer-btn');
const resetBtn = document.getElementById('reset-timer-btn');

function updateTimer() {
  if(remainingTime <= 0) {
    clearInterval(timerInterval);
    timerDisplay.textContent = "00:00";
    return;
  }
  const minutes = String(Math.floor(remainingTime/60)).padStart(2,'0');
  const seconds = String(remainingTime % 60).padStart(2,'0');
  timerDisplay.textContent = `${minutes}:${seconds}`;
  remainingTime--;
}

function startTimer() {
  const minutes = parseInt(document.getElementById('timer-minutes').value);
  if(isNaN(minutes) || minutes <= 0) return alert('Enter a valid number of minutes');
  remainingTime = minutes * 60;
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);
  updateTimer();
}

function pauseTimer() { clearInterval(timerInterval); }
function resetTimer() { remainingTime=0; clearInterval(timerInterval); timerDisplay.textContent="00:00"; }

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
