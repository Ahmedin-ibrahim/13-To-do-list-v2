let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");
const addBtn = document.getElementById("addBtn");
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function render() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.done;
        const span = document.createElement("span");
        span.textContent = task.text;
        span.classList.toggle("completed", task.done);
        checkbox.addEventListener("change", () => {
            tasks[index].done = checkbox.checked;
            saveTasks();
            render();
        });
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            render();
        });
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
    const remaining = tasks.filter(task => !task.done).length;
    counter.textContent = `${remaining} of ${tasks.length} left`;
}
function addTask() {
    const text = taskInput.value.trim();
    if (text === "") {
        alert("Please enter a task!");
        return;
    }
    tasks.push({
        text: text,
        done: false
    });
    taskInput.value = "";
    saveTasks();
    render();
}
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});
render();