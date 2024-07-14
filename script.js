document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
});

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach(function(task, index) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.name}</span>
            <div class="btns">
                <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskName = taskInput.value.trim();
    if (taskName !== "") {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({ name: taskName, completed: false });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskInput.value = "";
        loadTasks();
    }
}

function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTask = prompt("Edit task:", tasks[index].name);
    if (updatedTask !== null) {
        tasks[index].name = updatedTask.trim();
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function toggleComplete(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}