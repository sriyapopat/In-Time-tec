const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const weatherDisplay = document.getElementById('weather');


window.onload = function () {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTaskToUI(task));
  getWeatherAndSetTheme();
};


addTaskBtn.addEventListener('click', function () {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    addTaskToUI(taskText);
    saveTaskToLocalStorage(taskText);
    taskInput.value = '';
    remindUser(taskText);
  }
});


function remindUser(task) {
  setTimeout(() => {
    alert(`⏰ Reminder: ${task}`);
  }, 5000); 
}


function addTaskToUI(task) {
  const li = document.createElement('li');
  li.className = 'taskItem';
  li.textContent = task;
  taskList.appendChild(li);
}


function saveTaskToLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


async function getWeatherAndSetTheme() {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=c7163671d6374e35ba7132524252306&q=Jaipur`);
    const data = await response.json();
    const condition = data.current.condition.text.toLowerCase();
    weatherDisplay.textContent = `Weather: ${data.current.condition.text}, ${data.current.temp_c}°C`;

    if (condition.includes('rain')) {
      document.body.className = 'rainy';
    } else if (condition.includes('cloud')) {
      document.body.className = 'cloudy';
    } else {
      document.body.className = 'sunny';
    }
  } catch (error) {
    weatherDisplay.textContent = 'Weather info unavailable';
    console.error('Error fetching weather:', error);
  }
}
