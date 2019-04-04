// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const taskBtn = document.getElementById('msg');

// Load all events listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners(){
    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear tasks event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);

}
// Get tasks for LS
function getTasks(){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // Create li element
        const li = document.createElement('li');
        // Add a class
        li.className = 'collection-item';
        // Create text node and append to the li
        li.appendChild(document.createTextNode(task));

        // Create new link element
        const link = document.createElement('a');
        // Add class name
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fas fa-trash-alt"></i>';
        // Append the link to li
        li.appendChild(link);
        
        // Append li to ul
        taskList.appendChild(li);
    });
}

// Add Task 
function addTask(e){
    //Check if task is empty
    if(taskInput.value === ''){
        alert('Add a task');
    }

    // Create li element
    const li = document.createElement('li');
    // Add a class
    li.className = 'collection-item';
    // Create text node and append to the li
    li.appendChild(document.createTextNode(taskInput.value));

    // Create new link element
    const link = document.createElement('a');
    // Add class name
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fas fa-trash-alt"></i>';
    // Append the link to li
    li.appendChild(link);
    
    // Append li to ul
    taskList.appendChild(li);

    // Store to localStorage
    storeTaskInLocalStorage(taskInput.value);

    // Clear Input
    taskInput.value = '';

    e.preventDefault();
}

// Remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
        }
    }
}

// Clear tasks
function clearTasks(e){
    // Version 1
    //taskList.innerHTML = '';
    
    // Version 2
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from LocalStorage
    clearTasksFromLocalStorage();
}

// Clear Task for LocalStorage
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

// Filter tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else { 
            task.style.display = 'none';
        }
    });
}

// Store task
function storeTaskInLocalStorage(task){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}