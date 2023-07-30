const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const tasksContainer = document.getElementById("tasks");
const allBtn = document.getElementById("allBtn");
const completedBtn = document.getElementById("completedBtn");
const incompleteBtn = document.getElementById("incompleteBtn");

let tasks = [];

// Add event listeners
taskForm.addEventListener("submit", addTask);
allBtn.addEventListener("click", () => showTasks("all"));
completedBtn.addEventListener("click", () => showTasks("completed"));
incompleteBtn.addEventListener("click", () => showTasks("incomplete"));

// Function to add a task
function addTask(event) {
  event.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  tasks.push(task);
  updateTasks();
  taskInput.value = "";
}

// Function to mark a task as complete
function markComplete(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });
  updateTasks();
}

// Function to delete a task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  updateTasks();
}

// Function to show tasks based on completion status
function showTasks(filter) {
  let filteredTasks;
  if (filter === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  } else if (filter === "incomplete") {
    filteredTasks = tasks.filter(task => !task.completed);
  } else {
    filteredTasks = tasks;
  }
  updateTasks(filteredTasks);
}

// Function to update the tasks in the user interface
function updateTasks(filteredTasks = tasks) {
  tasksContainer.innerHTML = "";

  filteredTasks.forEach(task => {
    const taskElement = document.createElement("div");
    taskElement.className = "task";
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => markComplete(task.id));
    
    const taskText = document.createElement("span");
    taskText.innerText = task.text;
    taskText.style.textDecoration = task.completed ? "line-through" : "none";

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    taskElement.appendChild(checkbox);
    taskElement.appendChild(taskText);
    taskElement.appendChild(deleteBtn);
    tasksContainer.appendChild(taskElement);
  });
}

// Load tasks from local storage on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    updateTasks();
  }
});

// Save tasks to local storage whenever tasks are updated
function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add event listener to save tasks to local storage
window.addEventListener("beforeunload", saveTasksToLocalStorage);
