document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("todo-input");
  const add = document.getElementById("add-btn");
  const todolist = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((e) => RenderTask(e));

  add.addEventListener("click", () => {
    const todo = input.value.trim();
    if (todo === "") return;
    const newtask = {
      id: Date.now(),
      text: todo,
      completed: false,
    };
    tasks.push(newtask);
    RenderTask(newtask);
    SaveTasks();
    input.value = ""; //clearing the input
    console.log(tasks);
  });

  function RenderTask(task) {
    // console.log(task.text);
    const list = document.createElement("li");
    list.setAttribute("task-id", task.id);
    list.innerHTML = `<span>${task.text}</span>
    <button>delete</button>`;
    if (task.completed) {
      list.classList.add("completed");
    }
    todolist.appendChild(list);
    list.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      list.classList.toggle("completed", task.completed);
      SaveTasks();
    });
    list.querySelector("button").addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id); // Remove from array
      SaveTasks(); // Update localStorage
      list.remove(); // Remove from DOM
    });
  }

  function SaveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
