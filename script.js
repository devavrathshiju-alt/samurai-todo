const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const count = document.getElementById("count");
const clearBtn = document.getElementById("clear-done");

// Load saved tasks (or start with an empty list)
let tasks = JSON.parse(localStorage.getItem("samurai-tasks")) || [];

function save() {
  localStorage.setItem("samurai-tasks", JSON.stringify(tasks));
}

function render() {
  list.innerHTML = "";

  if (tasks.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = "No tasks yet. Add one above.";
    list.appendChild(empty);
  }

  tasks.forEach((task) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    const text = document.createElement("span");
    text.textContent = task.text;
    text.addEventListener("click", () => toggleTask(task.id));

    const del = document.createElement("button");
    del.className = "delete";
    del.textContent = "✕";
    del.addEventListener("click", () => deleteTask(task.id));

    li.append(text, del);
    list.appendChild(li);
  });

  const remaining = tasks.filter((t) => !t.done).length;
  count.textContent = `${remaining} task${remaining === 1 ? "" : "s"} remaining`;
}

function addTask(text) {
  tasks.push({ id: Date.now(), text: text, done: false });
  save();
  render();
}

function toggleTask(id) {
  tasks = tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  save();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  save();
  render();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();               // stop the page from reloading
  const value = input.value.trim();
  if (value === "") return;
  addTask(value);
  input.value = "";
});

clearBtn.addEventListener("click", () => {
  tasks = tasks.filter((t) => !t.done);
  save();
  render();
});

render(); // draw the list when the page first loads
// ---------- Falling petals background ----------
const petalContainer = document.getElementById("petals");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion) {
  for (let i = 0; i < 25; i++) {
    const petal = document.createElement("span");
    petal.className = "petal";

    const size = 8 + Math.random() * 14;           // 8px to 22px
    petal.style.width = size + "px";
    petal.style.height = size + "px";
    petal.style.left = Math.random() * 100 + "%";
    petal.style.animationDuration = 8 + Math.random() * 10 + "s";
    petal.style.animationDelay = -Math.random() * 15 + "s"; // negative = already mid-fall at load
    petal.style.opacity = 0.35 + Math.random() * 0.45;

    petalContainer.appendChild(petal);
  }
}
