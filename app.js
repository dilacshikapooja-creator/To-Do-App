// Step 4: JavaScript Basics - Get elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Event listener for the "Add Task" button
addTaskBtn.addEventListener('click', addTask);

// Allows adding a task by pressing Enter key
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

/**
 * Creates a new task list item and adds it to the list.
 */
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const now = new Date();
    const dateTimeString = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Create the task HTML structure
    const listItem = document.createElement('li');
    listItem.className = 'task-item';
    listItem.innerHTML = `
        <div class="task-info">
            <span class="task-text">${taskText}</span>
            <div class="task-datetime">${dateTimeString}</div>
        </div>
        <div class="task-actions">
            <button class="complete-btn">Complete</button>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    // Append the new item to the task list
    taskList.appendChild(listItem);

    // Attach event listeners to the buttons of the new task
    listItem.querySelector('.complete-btn').addEventListener('click', toggleCompleted);
    listItem.querySelector('.edit-btn').addEventListener('click', editTask);
    listItem.querySelector('.delete-btn').addEventListener('click', deleteTask);

    // Clear the input field
    taskInput.value = '';
}

/**
 * Toggles the 'completed' class on a task item.
 */
function toggleCompleted(e) {
    // Traverse up to find the parent <li> element
    const listItem = e.target.closest('.task-item');
    listItem.classList.toggle('completed');
}

/**
 * Allows the user to edit the text of a task.
 */
function editTask(e) {
    const listItem = e.target.closest('.task-item');
    const taskSpan = listItem.querySelector('.task-text');
    const originalText = taskSpan.textContent;

    // Replace the <span> with an editable <input> field
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = originalText;
    inputField.className = 'edit-input'; // Optional: for specific styling

    // Replace the task text with the input field
    taskSpan.parentNode.replaceChild(inputField, taskSpan);

    // Temporarily hide the action buttons while editing
    listItem.querySelector('.task-actions').style.display = 'none';

    // Focus on the input field and select the text
    inputField.focus();
    inputField.select();

    // Function to save the changes
    const saveChanges = () => {
        const newText = inputField.value.trim();
        if (newText !== "") {
            taskSpan.textContent = newText;
            inputField.parentNode.replaceChild(taskSpan, inputField);
        } else {
            // Revert if the new text is empty
            inputField.parentNode.replaceChild(taskSpan, inputField);
            alert("Task cannot be empty!");
        }
        // Restore the action buttons
        listItem.querySelector('.task-actions').style.display = 'block';
    };

    // Save on Enter key press
    inputField.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            saveChanges();
        }
    });

    // Save on losing focus (clicking outside)
    inputField.addEventListener('blur', saveChanges);
}

/**
 * Deletes a task after confirmation.
 */
function deleteTask(e) {
    // Objective requirement: Confirm before deleting tasks
    if (confirm("Are you sure you want to delete this task?")) {
        const listItem = e.target.closest('.task-item');
        taskList.removeChild(listItem);
    }
}