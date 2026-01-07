const taskForm = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const descInput = document.getElementById("task-desc");
const priorityInput = document.getElementById("task-priority");
const dueDateInput = document.getElementById("task-due-date");
const filterSelect = document.getElementById("filter-tasks");
const sortSelect = document.getElementById("sort-tasks");

//Load task on page load
document.addEventListener("DOMContentLoaded", () => {
    renderTasks(getTasks());
});

//form submission handle
taskForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = titleInput.value.trim();
    if (!title) {
        alert("Task title is required");
        return;
    }

    addTask({
        title: title,
        description: descInput.value,
        priority: priorityInput.value,
        dueDate: dueDateInput.value
    })

    //refresh UI
    filterSelect.value = "all";
    renderTasks(getTasks());

    //reset form
    taskForm.reset();
});

//task action handle
document.getElementById("task-list").addEventListener("click", function (e) {
    const button = e.target.closest("button");
    if (!button) return;

    const taskId = Number(e.target.dataset.id);

    if (!taskId) return;

    //complete/undo task
    if (e.target.classList.contains("btn-complete")) {
        toggleTaskStatus(taskId);
        filterSelect.value = "all";
        renderTasks(getTasks());
    }

    if (e.target.classList.contains("btn-delete")) {
        const confirmDelete = confirm("Are you sure want to delete this task?");
        if (confirmDelete) {
            deleteTask(taskId)
            filterSelect.value = "all";
            renderTasks(getTasks());
        }
    }
})

//apply task filters
function applyFilter(filterType) {
    const tasks = getTasks();
    let filteredTasks = [];

    switch (filterType) {
        case "completed":
            filteredTasks = tasks.filter(task => task.status === "completed");
            break;

        case "pending":
            filteredTasks = tasks.filter(task => task.status === "pending");
            break;

        case "overdue":
            filteredTasks = tasks.filter(task => {
                if (task.status !== "pending" || !task.dueDate) {
                    return false;
                }
                return new Date(task.dueDate) < new Date();
            });
            break;

        default:
            filteredTasks = tasks;
    }

    const sortedTasks = applySorting(
        filteredTasks,
        sortSelect.value
    );

    renderTasks(sortedTasks);
}

filterSelect.addEventListener("change", function () {
    applyFilter(this.value);
})

//sort by filter
const PRIORITY_ORDER = {
    High: 1,
    Medium: 2,
    Low: 3
};

//sort function
function applySorting(tasks, sortType) {
    const sortedTasks = [...tasks];

    if (sortType === "date") {
        sortedTasks.sort((a, b) => {
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate) - new Date(b.dueDate);
        });
    }

    if (sortType === "priority") {
        sortedTasks.sort((a, b) => {
            return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
        });
    }

    return sortedTasks;
}

//sort change handler
sortSelect.addEventListener("change", function () {
    applyFilter(filterSelect.value);
})