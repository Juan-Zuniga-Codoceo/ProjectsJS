/*
const tasks = []
let time = 0;
let timer = null;
let timerBreak = null; // break en el pomodoro, el recreo
let current = null; // Nos dira la tarea actual que se esta ejecutando


//Hacer referencia a los elementos HTML
const bAdd = document.querySelector('#bAdd');
const itTask = document.querySelector('#itTask');
const form = document.querySelector('#form');

renderTasks();
renderTime();

form.addEventListener('submit', (e)=>{ //Se ejecuta una funcion cuando se dispara un evento submit
    e.preventDefault();//Cuando nosotros enviamos el formulario realmente no se envia, anulamos el funcionamiento nativo
    if(itTask.value !== ''){ // Si itTask es distinto de un string vacio vamos a crear una tarea
        createTask(itTask.value);
        itTask.value == '';// Una vez que se ingresa la tarea se va a eliminar el texto de mi input
        renderTasks();
    }
});

function createTask(value) {
    const newTask = { 
        // Para crear un id dinamico, usamos el Math.random(), la cual es una función que tira un numero entre 0 y 1, al mult por 100 
        id: (Math.random() * 100).toString(36).slice(3),// da un num decimal el cual se transforma con toString con base 36
        //con el .slice(3) se van a eliminar 3 caracteres iniciales
        title: value,
        completed: false,
    };

    tasks.unshift(newTask); // Para agregarlo al arreglo
}
    //Me permite tomar cada uno de los elementos de las tareas y generr un html que al final voy a inyectar en un contenedor
    
    function renderTasks(){
        const html = tasks.map((task) =>{
            return `
            <div class="task">
                <div class="completed">${task.completed ? `<span class="done">Done</span>` :`<button class = "start-button" data-id="${task.id}">Start</button>`}</div>
                <div class="title">${task.title}</div>
            </div>
            `;
        });
    

    const tasksContainer = document.querySelector('#tasks');
    tasksContainer.innerHTML = html.join('')};

*/


  
const tasks = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;
let statusApp = "stop";

const bAdd = document.querySelector("#bAdd");
const itTask = document.querySelector("#itTask");
const form = document.querySelector("#form");

renderTasks();
renderTime();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (itTask.value !== "") {
    createTask(itTask.value);
    itTask.value = "";
    renderTasks();
  }
});

function createTask(value) {
  const newTask = {
    id: (Math.random() * 100).toString(36).slice(2),
    title: value,
    completed: false,
  };

  tasks.unshift(newTask);
}

function renderTasks() {
  const html = tasks.map((task) => {
    return `
        <div class="task">
        <div class="completed">${
          task.completed
            ? "<span class='done'>Done</span>"
            : `<button class="start-button" data-id="${task.id}">Start</button></div>`
        }
            <div class="title">${task.title}</div>
        </div>`;
  });
  const tasksContainer = document.querySelector("#tasks");
  tasksContainer.innerHTML = html.join("");

  const startButtons = document.querySelectorAll(".task .start-button");
  startButtons.forEach((startButton) => {
    startButton.addEventListener("click", () => {
      if (!timer) {
        startButtonHandler(startButton.getAttribute("data-id"));
        startButton.textContent = "In progress...";
      }
    });
  });
}

function startButtonHandler(id) {
  time = 0.5 * 60;
  current = id;
  const taskId = tasks.findIndex((task) => task.id === id);
  document.querySelector("#time #taskName").textContent = tasks[taskId].title;
  timer = setInterval(() => {
    timerHandler(id);
  }, 1000);
}

function timerHandler(id = null) {
  time--;
  renderTime();
  if (time === 0) {
    markComplete(id);
    clearInterval(timer);
    renderTasks();
    startBreak();
  }
}

function markComplete(id) {
  const taskId = tasks.findIndex((task) => task.id === id);
  tasks[taskId].completed = true;
}

function startBreak() {
  time = 1 * 60;
  document.querySelector("#time #taskName").textContent = "Break";
  timerBreak = setInterval(timerBreakHandler, 1000);
}

function timerBreakHandler() {
  time--;
  renderTime();
  if (time === 0) {
    clearInterval(timerBreak);
    current = null;
    document.querySelector("#time #taskName").textContent = "";
    renderTime();
  }
}

function renderTime() {
  const timeDiv = document.querySelector("#time #value");
  const minutes = parseInt(time / 60);
  const seconds = parseInt(time % 60);
  timeDiv.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}