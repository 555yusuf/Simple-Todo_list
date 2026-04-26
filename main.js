// DOM Elements Selection
const inputTask = document.getElementById("input-task");
const taskList = document.getElementById("task-list");
const btn = document.querySelector(".btn");

// Function to add a new task
const addTask = () => {
  let taskValue = inputTask.value.trim();

  // Check if input is empty
  if (!taskValue) {
    alert("You must add a value!");
  } else {
    // Create elements for the new task
    let li = document.createElement("li");
    let span = document.createElement("span");

    let upImg = document.createElement("img");
    upImg.src = "./img/caret-arrow-up.png";
    upImg.className = "sort-img up-arrow";

    let downImg = document.createElement("img");
    downImg.src = "./img/down.png";
    downImg.className = "sort-img down-arrow";

    let editImg = document.createElement("img");
    editImg.src = "./img/editHover.png";
    editImg.className = "edit";

    // Add text to the list item
    li.textContent = taskValue;
    taskList.appendChild(li);

    // Append action icons to the list item
    li.appendChild(editImg);
    li.appendChild(upImg);
    li.appendChild(downImg);

    // Append delete button
    span.innerHTML = "&times;";
    li.appendChild(span);
  }

  // Clear input field and update local storage
  inputTask.value = "";
  setTask();
};

// Add task when 'Add' button is clicked
btn.addEventListener("click", addTask);

// Handle click events on the task list (Event Delegation)
taskList.addEventListener("click", (e) => {
  // Toggle complete status
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
  }
  // Delete task
  else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
  }
  // Move task up
  else if (e.target.classList.contains("up-arrow")) {
    let currentLi = e.target.parentElement;
    let previousLi = currentLi.previousElementSibling;

    if (previousLi) {
      taskList.insertBefore(currentLi, previousLi);
    }
  }
  // Move task down
  else if (e.target.classList.contains("down-arrow")) {
    let currentLi = e.target.parentElement;
    let nextLi = currentLi.nextElementSibling;

    if (nextLi) {
      taskList.insertBefore(currentLi, nextLi.nextElementSibling);
    }
  }
  // Edit task
  else if (e.target.classList.contains("edit")) {
    let currentLi = e.target.parentElement;
    let currentText = currentLi.firstChild.textContent.trim();

    let newText = prompt("Edit your task:", currentText);

    // Validate new text and update
    if (newText !== null && newText.trim() !== "") {
      currentLi.firstChild.textContent = newText.trim() + " ";
    }
  }

  // Save changes to local storage after any action
  setTask();
});

// Add task when 'Enter' key is pressed
inputTask.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// Save current list to local storage
function setTask() {
  localStorage.setItem("lists", taskList.innerHTML);
}

// Load list from local storage on page load
function loadTasks() {
  if (localStorage.getItem("lists")) {
    taskList.innerHTML = localStorage.getItem("lists");
  }
}

loadTasks();
