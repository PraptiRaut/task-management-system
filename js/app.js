const taskForm = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const descInput = document.getElementById("task-desc");
const priorityInput = document.getElementById("task-priority");
const dueDateInput = document.getElementById("task-due-date");

//Load task on page load
document.addEventListener("DOMContentLoaded", () => {
    renderTasks(getTasks());
});

//form submission handle
taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("Form submitted"); // 👈 ADD THIS


    const title = String(titleInput.Value).trim();
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
    renderTasks(getTasks());

    //reset form
    taskForm.reset();
});