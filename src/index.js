const addProjectBtn = document.querySelector("#add-project");
const formContainer = document.querySelector("#form-container");
const projectNameInput = document.querySelector("#project-name");
const createBtn = document.querySelector("#create-btn");
const cancelBtn = document.querySelector("#cancel-btn");
const projectList = document.getElementById("project-list");
const addTodo = document.querySelector("#add-todo");
const modal = document.querySelector("#modal");
const confirmTodo = document.querySelector("#confirm");
const cancelTodo = document.querySelector("#cancel");
let projectsArray = [];
let currentProjectIndex;
const taskList = document.getElementById("task-list");
const form = document.querySelector("form");
let dataTaskIndex;

addProjectBtn.addEventListener("click", () => {
  addProjectBtn.style.display = "none";
  formContainer.style.display = "flex";
});

createBtn.addEventListener("click", () => {
  const projectName = projectNameInput.value.trim();
  if (projectName) {
    const listItem = document.createElement("div");
    listItem.classList.add("project");
    listItem.setAttribute("data-index", projectsArray.length);
    listItem.innerHTML = `
      <button class="nav-button go-to-project">${projectName}</button>
      <button class="nav-button delete-project">
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
        </svg>
      </button>
    `;
    projectList.appendChild(listItem);
    projectNameInput.value = "";
    const myProject = new Project(projectName);
    projectsArray.push(myProject);
    currentProjectIndex = projectsArray.length - 1;
    displayTasks(projectsArray[currentProjectIndex].tasks);
  }
});

cancelBtn.addEventListener("click", () => {
  projectNameInput.value = "";
  formContainer.style.display = "none";
  addProjectBtn.style.display = "flex";
});

class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }
}

class Task {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

addTodo.addEventListener("click", () => {
  modal.style.display = "flex";
});

confirmTodo.addEventListener("click", () => {
  const title = document.querySelector("#myTitle").value;
  const description = document.querySelector("#description").value;
  const dueDate = document.querySelector("#date").value;
  const priority = document.querySelector("#priority").value;
  if (title && priority) {
    const thisTask = new Task(title, description, dueDate, priority);
    if (projectsArray[currentProjectIndex]) {
      projectsArray[currentProjectIndex].tasks.push(thisTask);
      form.reset();
      modal.style.display = "none";
      displayTasks(projectsArray[currentProjectIndex].tasks);
    } else {
      alert("Invalid current project index: " + currentProjectIndex);
    }
  } else {
    alert("Please fill out all the inputs.");
  }
});

cancelTodo.addEventListener("click", () => {
  modal.style.display = "none";
  form.reset();
});

projectList.addEventListener("click", (event) => {
  if (event.target.classList.contains("go-to-project")) {
    const projectDiv = event.target.closest(".project");
    currentProjectIndex = parseInt(projectDiv.getAttribute("data-index"), 10);
    if (currentProjectIndex >= 0 && currentProjectIndex < projectsArray.length) {
      displayTasks(projectsArray[currentProjectIndex].tasks);
    } else {
      alert("Invalid project index: " + currentProjectIndex);
    }
  } else if (event.target.closest(".delete-project")) {
    const projectDiv = event.target.closest(".project");
    const index = parseInt(projectDiv.getAttribute("data-index"), 10);
    if (index >= 0 && index < projectsArray.length) {
      projectsArray.splice(index, 1);
      projectDiv.remove();
      updateProjectIndices();
    } else {
      alert("Invalid project index for deletion: " + index);
    }
  }
});

function displayTasks(tasks) {
  if (!tasks) {
    alert("Tasks are undefined");
    return;
  }
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    let todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");
    todoDiv.setAttribute("data-task-index", index);
    todoDiv.innerHTML = `
      <h3 class="todo-title">Title: ${task.title}</h3>
      <p class="todo-description">Description: ${task.description}</p>
      <p class="todo-date">Due Date: ${task.dueDate}</p>
      <div class="priority">Priority Level: ${task.priority}</div>
      <div class="is-completed">
        <label for="done-${index}">Completed? </label>
        <input type="checkbox" id="done-${index}" value="done">
      </div>
      <div class="change">
        <button class="delete">Delete</button>
        <button class="edit">Edit</button>
      </div>
    `;
    taskList.appendChild(todoDiv);
  });
}

function updateProjectIndices() {
  const projectDivs = document.querySelectorAll(".project");
  projectDivs.forEach((div, index) => {
    div.setAttribute("data-index", index);
  });
}

function updateTodoIndices() {
  const todoDivs = document.querySelectorAll(".todo-div");
  todoDivs.forEach((div, index) => {
    div.setAttribute("data-task-index", index);
  });
}

taskList.addEventListener("click", (event) => {
  const closestTask = event.target.closest(".todo-div");
  if (event.target.closest(".is-completed")) {
    const checkbox = event.target.querySelector("input[type='checkbox']");
    if (checkbox) {
      checkbox.checked
        ? (closestTask.style.textDecoration = "line-through")
        : (closestTask.style.textDecoration = "none");
    }
  } else if (event.target.classList.contains("delete")) {
    dataTaskIndex = parseInt(closestTask.getAttribute("data-task-index"));
    projectsArray[currentProjectIndex].tasks.splice(dataTaskIndex, 1);
    closestTask.remove();
    updateTodoIndices();
  }
  else if(event.target.classList.contains("edit")) {
    dataTaskIndex = parseInt(closestTask.getAttribute("data-task-index"));
    const title = document.querySelector("#myTitle");
    const description = document.querySelector("#description");
    const dueDate = document.querySelector("#date");
    const priority = document.querySelector("#priority");
    modal.style.display = "flex";
    title.textContent = projectsArray[currentProjectIndex].tasks[dataTaskIndex].title;
    description.textContent = projectsArray[currentProjectIndex].tasks[dataTaskIndex].description;
    dueDate.value = projectsArray[currentProjectIndex].tasks[dataTaskIndex].dueDate;
    priority.value = projectsArray[currentProjectIndex].tasks[dataTaskIndex].priority;
    projectsArray[currentProjectIndex].tasks.splice(dataTaskIndex, 1);
    closestTask.remove();
    updateTodoIndices()
  }
});
