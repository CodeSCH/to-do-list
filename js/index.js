const form = document.querySelector('#form');
const taskList = document.querySelector('#taskList')
const divContent = document.querySelector('.main__content')
const messageError = document.querySelector('#alert');
const btnClose = document.querySelector('.close-btn');
const count = document.querySelector('#count');
const clearAll = document.querySelector('.main__options-clear');

let tasks = [];

eventListeners();
function eventListeners() {
    form.addEventListener('submit', addTask);

    btnClose.addEventListener('click', closeAlert);

    clearAll.addEventListener('click', () => {
        tasks = localStorage.removeItem('tasks') || [];
        createHTML();
    });

    document.addEventListener('DOMContentLoaded', () => {
        tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        createHTML();
    });
}

function addTask(e) {
    e.preventDefault();
    closeAlert();
    const task = document.querySelector('#task').value;
    if (task === '' || task.trim() === '') {
        messageError.classList.remove('hide');
        messageError.classList.add('show');
        messageError.classList.add('showAlert')
        setTimeout(() => {
            messageError.classList.remove('show');
            messageError.classList.add('hide');
        }, 3000)
        return;
    }   
    
    const taskObj = {
        id: Date.now(),
        task
    }

    tasks = [...tasks, taskObj];

    createHTML();

    form.reset();
}

function closeAlert() {
    messageError.classList.remove('show');
    messageError.classList.add('hide');
}

function createHTML() {
    clearHTML();

    if (tasks.length > 0) {
        divContent.classList.remove('d-none');
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.classList.add('main__element');

            const divchBox = document.createElement('div');

            const inputchBox = document.createElement('input');
            inputchBox.type = "checkbox";
            inputchBox.classList.add('main__checkbox', 'checkbox__option');

            divchBox.appendChild(inputchBox);

            const label = document.createElement('label');
            label.classList.add('main__text');
            label.innerHTML = task.task;

            const btnDelete = document.createElement('button');
            btnDelete.classList.add('main__button', 'main__button-color');
            btnDelete.innerHTML = '<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>'

            btnDelete.onclick = () => {
                deleteTask(task.id);
            }

            li.appendChild(divchBox);
            li.appendChild(label);
            li.appendChild(btnDelete);

            taskList.appendChild(li);
        });
        count.innerHTML = `${tasks.length} items left`
    } else {
        divContent.classList.add('d-none');
        count.innerHTML = `0 items left`
    }
    addStorage();
}

//Limpiar el primer HTML
function clearHTML() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    createHTML();
}

function addStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}