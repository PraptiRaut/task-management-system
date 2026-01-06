// UI RENDERING LOGIC
const taskListEl = document.getElementById("task-list");
const emptyStateEl = document.getElementById("empty-state");

//Render all tasks
function renderTasks(tasks) {
    taskListEl.innerHTML = "";

    if (tasks.length === 0) {
        emptyStateEl.style.display = "block";
        return
    }

    emptyStateEl.style.display = "none";

    tasks.forEach(task => {
        const taskItem = createTaskElement(task);
        taskListEl.appendChild(taskItem);
    });
}

//Create single task card
function createTaskElement(task) {
    const li = document.createElement("li");
    li.classList.add("task-card");

    if (task.status === "completed") {
        li.classList.add("completed")
    }

    li.innerHTML = `
    <span class="task-priority priority-${task.priority.toLowerCase()}">${task.priority}</span>
    <h3 class="task-title">${task.title}</h3>
    <p class="task-desc">${task.description || ""}</p>

    <div class="task-meta">
    <span>Due: ${formatDate(task.dueDate)}</span>
    <span>Status: ${task.status}</span>
    </div>

    <div class="task-actions">
    <button class="btn-complete" data-id="${task.id}">
    ${task.status === "pending" ? "Done" : "Undo"}</button>
    <button class="btn-edit" data-id="${task.id}">Edit</button>
    <button class="btn-delete" data-id="${task.id}">Delete</button>
    </div>
    `;
    return li
}

//Format date
function formatDate(dateString) {
    if (!dateString) return "-"

    const date = new Date(dateString);
    return date.toLocaleDateString();
}