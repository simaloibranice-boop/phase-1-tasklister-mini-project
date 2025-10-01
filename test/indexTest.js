document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-task-form");
  const taskInput = document.getElementById("task-desc");
  const sectionInput = document.getElementById("section");
  const prioritySelect = document.getElementById("priority");
  const dueDateInput = document.getElementById("due-date");
  const taskList = document.getElementById("tasks");
  const sortPriorityBtn = document.getElementById("sort-priority");
  const sortDateBtn = document.getElementById("sort-date");

  const priorityColors = { high: "red", medium: "orange", low: "green" };

  // Add task
  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();
    const section = sectionInput.value.trim();
    const priority = prioritySelect.value;
    const dueDate = dueDateInput.value;

    if (!taskText) return;

    const li = document.createElement("li");
    li.dataset.priority = priority;
    li.dataset.date = dueDate || "";
    li.style.color = priorityColors[priority];

    // Task info span
    const infoSpan = document.createElement("span");
    infoSpan.classList.add("task-info");
    infoSpan.textContent = `${taskText}${section ? " | " + section : ""}${dueDate ? " | Due: " + dueDate : ""}`;
    li.appendChild(infoSpan);

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      const newTask = prompt("Edit task:", taskText);
      if (newTask) infoSpan.textContent = `${newTask}${section ? " | " + section : ""}${dueDate ? " | Due: " + dueDate : ""}`;
    });
    li.appendChild(editBtn);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => li.remove());
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    form.reset();
    taskInput.focus();
  });

  // Sort by priority
  sortPriorityBtn.addEventListener("click", () => {
    const tasksArray = Array.from(taskList.children);
    tasksArray.sort((a, b) => {
      const order = { high: 1, medium: 2, low: 3 };
      return order[a.dataset.priority] - order[b.dataset.priority];
    });
    tasksArray.forEach(task => taskList.appendChild(task));
  });

  // Sort by due date
  sortDateBtn.addEventListener("click", () => {
    const tasksArray = Array.from(taskList.children);
    tasksArray.sort((a, b) => {
      const dateA = a.dataset.date || "9999-12-31";
      const dateB = b.dataset.date || "9999-12-31";
      return new Date(dateA) - new Date(dateB);
    });
    tasksArray.forEach(task => taskList.appendChild(task));
  });
});
