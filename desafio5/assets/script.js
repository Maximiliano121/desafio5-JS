let tasks = [];
let taskId = 1;

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("total");
const completedTasks = document.getElementById("completed");

function updateCounters() {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;

  totalTasks.textContent = `Total: ${total}`;
  completedTasks.textContent = `Realizadas: ${completed}`;
}

function addTask() {
  const taskName = taskInput.value.trim();
  const newTask = {
    id: taskId++,
    name: taskName,
    completed: false,
  };

  tasks.push(newTask);

  renderTask(newTask);

  taskInput.value = "";

  updateCounters();
}

function renderTask(task) {
  const row = document.createElement("tr");
  row.setAttribute("data-id", task.id);

  row.innerHTML = `
        <td>${task.id}</td>
        <td>${task.name}</td>
        <td>
            <input type="checkbox" class="form-check-input" ${
              task.completed ? "checked" : ""
            } />
        </td>
        <td>
            <button class="btn btn-danger btn-sm">Eliminar</button>
        </td>
    `;

  const checkbox = row.querySelector('input[type="checkbox"]');
  checkbox.addEventListener("change", function () {
    task.completed = this.checked;
    updateCounters();
  });

  const deleteBtn = row.querySelector(".btn-danger");
  deleteBtn.addEventListener("click", function () {
    deleteTask(task.id);
  });

  taskList.appendChild(row);
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);

  const row = document.querySelector(`tr[data-id="${taskId}"]`);
  if (row) {
    taskList.removeChild(row);
  }

  updateCounters();
}

addTaskBtn.addEventListener("click", addTask);
