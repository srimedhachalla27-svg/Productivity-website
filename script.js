// ======= Mood Selector =======
const moodSelector = document.getElementById('mood-selector');
const video = document.getElementById('background-video');
const music = document.getElementById('bg-music');

const moods = {
  cozy: { video:'assets/cozy.mp4', music:'assets/cozy.mp3' },
  focus: { video:'assets/focus.mp4', music:'assets/focus.mp3' },
  relaxed: { video:'assets/relaxed.mp4', music:'assets/relaxed.mp3' },
  energetic: { video:'assets/energetic.mp4', music:'assets/energetic.mp3' },
};

moodSelector.addEventListener('change', () => {
  const mood = moods[moodSelector.value];
  video.src = mood.video;
  video.play();
  music.src = mood.music;
  music.play();
});

// ======= Tasks =======
const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('new-task');

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task;
    li.onclick = () => { li.style.textDecoration = li.style.textDecoration === 'line-through' ? 'none' : 'line-through'; };
    taskList.appendChild(li);
  });
}

function addTask() {
  const taskText = taskInput.value.trim();
  if(taskText !== '') {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    loadTasks();
  }
}

loadTasks();

// ======= Notes =======
const notesArea = document.getElementById('notes-area');
function saveNotes() {
  localStorage.setItem('notes', notesArea.value);
  alert('Notes saved!');
}
notesArea.value = localStorage.getItem('notes') || '';

// ======= Timer =======
let timerInterval;
let remainingTime = 0;

function startTimer() {
  const minutes = parseInt(document.getElementById('timer-minutes').value);
  if(isNaN(minutes) || minutes <= 0) return alert('Enter a valid number of minutes');
  remainingTime = minutes * 60;
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);
  updateTimer();
}

function pauseTimer() { clearInterval(timerInterval); }

function resetTimer() {
  clearInterval(timerInterval);
  remainingTime = 0;
  document.getElementById('timer-display').textContent = '00:00';
}

function updateTimer() {
  if(remainingTime <= 0){
    clearInterval(timerInterval);
    document.getElementById('timer-display').textContent = '00:00';
    return;
  }
  const minutes = Math.floor(remainingTime/60).toString().padStart(2,'0');
  const seconds = (remainingTime % 60).toString().padStart(2,'0');
  document.getElementById('timer-display').textContent = `${minutes}:${seconds}`;
  remainingTime--;
}
