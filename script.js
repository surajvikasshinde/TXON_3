// Selectors
const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');
const filter = document.querySelector('#filter');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTasks);
taskForm.addEventListener('submit', addTask);
taskList.addEventListener('click', deleteTask);
taskList.addEventListener('click', toggleTask);
filter.addEventListener('change', filterTasks);

// Functions
function addTask(e) {
	e.preventDefault();
	if (taskInput.value.trim() === '') {
		alert('Please add a task.');
	} else {
		const task = document.createElement('li');
		task.innerText = taskInput.value;
		taskInput.value = '';
		taskList.appendChild(task);
		saveTask(task.innerText);
	}
}

function deleteTask(e) {
	if (e.target.classList.contains('delete')) {
		if (confirm('Are you sure you want to delete this task?')) {
			const task = e.target.parentElement;
			removeTask(task);
			removeTaskFromLocalStorage(task.innerText);
		}
	}
}

function toggleTask(e) {
	if (e.target.classList.contains('task')) {
		const task = e.target;
		task.classList.toggle('completed');
		updateTaskInLocalStorage(task.innerText, task.classList.contains('completed'));
	}
}

function filterTasks(e) {
	const tasks = taskList.childNodes;
	tasks.forEach(function(task) {
		switch(e.target.value) {
			case 'all':
				task.style.display = 'flex';
				break;
			case 'completed':
				if (task.classList.contains('completed')) {
					task.style.display = 'flex';
				} else {
					task.style.display = 'none';
				}
				break;
			case 'uncompleted':
				if (!task.classList.contains('completed')) {
					task.style.display = 'flex';
				} else {
					task.style.display = 'none';
				}
				break;
		}
	});
}

function saveTask(task) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.push(task);
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.forEach(function(task) {
		const li = document.createElement('li');
		li.innerText = task;
		if (task.includes('(completed)')) {
			li.classList.add('completed');
		}
		taskList.appendChild(li);
	});
}

function removeTask(task) {
	task.remove();
}

function removeTaskFromLocalStorage(task) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	const index = tasks.indexOf(task);
	if (index > -1) {
		tasks.splice(index, 1);
	}
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskInLocalStorage(task, completed) 
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	const index = tasks.indexOf(task);
	if (index > -1) 
		if (completed) {
			tasks[index] = task + ' (completed)';
		} else {
			tasks[index] = task.replace(' (completed)', '');
		}
        function updateTaskCount() {
            const tasks = taskList.childNodes;
            let count = 0;
            tasks.forEach(function(task) {
              if (!task.classList.contains('completed')) {
                count++;
              }
            });
            const taskCount = document.querySelector('#task-count');
            taskCount.innerText = `You have ${count} tasks remaining.`;
          }
          function addTask(e) {
            // ...
            updateTaskCount();
          }
          
          function deleteTask(e) {
            // ...
            updateTaskCount();
          }
          
          function toggleTask(e) {
            // ...
            updateTaskCount();
          }
          
          
	
