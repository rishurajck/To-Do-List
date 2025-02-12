var arr = JSON.parse(localStorage.getItem("obj")) || []; // Initialize from localStorage if available

// Function to render tasks
function renderTasks() {
  var workListing = document.getElementById("workListing");
  workListing.innerHTML = ""; // Clear current list before rendering new tasks

  // Loop through the array using for...of
  for (var task of arr) {
    var li = document.createElement("li");
    li.classList.add("listItem");
    li.innerHTML = task;

    var buttonLi = document.createElement("button");
    buttonLi.classList.add("buttonLi");
    buttonLi.innerHTML = "Done";

    buttonLi.addEventListener("click", function () {
      if (buttonLi.textContent === "Done") {
        buttonLi.innerHTML = "Remove";
        li.style.textDecoration = "line-through";
      } else {
        li.remove();
        arr = arr.filter(function (item) {
          return item !== task;
        }); // Remove the task from the array
        localStorage.setItem("obj", JSON.stringify(arr)); // Update local storage
      }
    });

    li.appendChild(buttonLi);
    workListing.appendChild(li);
  }
}

// Call the function to render existing tasks from localStorage
renderTasks();

// Handle form submission
function submitForm(e) {
  e.preventDefault();
  var txtInput = document.getElementById("task-field").value;

  if (txtInput === "") {
    alert("Please Add Tasks");
    return;
  }

  arr.push(txtInput); // Add new task to the array
  localStorage.setItem("obj", JSON.stringify(arr)); // Update localStorage
  renderTasks(); // Re-render tasks to reflect changes

  document.getElementById("task-field").value = ""; // Clear input field
}
