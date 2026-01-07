// TASK DATA MODEL

const STORAGE_KEY = "task_manager_tasks";

//get task from storage
function getTasks() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

//save task to storage
function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));

}

//create new task obj
function createTask({ title, description, priority, dueDate }) {
    return {
        id: Date.now(),
        title: String(title).trim(),
        description: String(description || "").trim(),
        priority,
        dueDate,
        status: "pending",
        createdAt: new Date().toISOString()
    };
}

//add task
function addTask(taskData) {
    const tasks = getTasks();
    const newTask = createTask(taskData);
    tasks.push(newTask);
    saveTasks(tasks);
    return newTask;
}

//update task
function updateTask(taskId, updatedData) {
    const tasks = getTasks();
    const updatedTasks = tasks.map(task => task.id === taskId ? { ...task, ...updatedData } : task);
    saveTasks(updatedTasks)
}

//delete task
function deleteTask(taskId) {
    const tasks = getTasks();
    const filteredTasks = tasks.filter(task => task.id !== taskId);
    saveTasks(filteredTasks);
}

//toggle task
function toggleTaskStatus(taskId) {
    const tasks = getTasks();
    const updatedTasks = tasks.map(task => {
        if (task.id === taskId) {
            return {
                ...task,
                status: task.status === "pending" ? "completed" : "pending"
            }
        }
        return task;
    });
    saveTasks(updatedTasks)
}
