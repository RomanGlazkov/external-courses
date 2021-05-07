const userMenu = document.querySelector('.user-menu');
const backlogBtn = document.getElementById('backlog');
const readyBtn = document.getElementById('ready');
const progressBtn = document.getElementById('progress');
const finishedBtn = document.getElementById('finished');
const backlogTasksArray = localStorage.getItem('backlog_tasks') ? JSON.parse(localStorage.getItem('backlog_tasks')) : [];
const readyTasksArray = localStorage.getItem('ready_tasks') ? JSON.parse(localStorage.getItem('ready_tasks')) : [];
const progressTasksArray = localStorage.getItem('progress_tasks') ? JSON.parse(localStorage.getItem('progress_tasks')) : [];
const finishedTasksArray = localStorage.getItem('finished_tasks') ? JSON.parse(localStorage.getItem('finished_tasks')) : [];
const dataMock = [
    {
         title: 'backlog',
    },
    {
        title: 'ready',
    },
    {
        title: 'in progress',
    },
    {
        title: 'finished',
    }
 ];
const selectTasksTemplate = `<select class="select-tasks" id="select-tasks" size="5">
                             </select>`;
let isDropdownOpened = false;
let backlogList = document.getElementById('backlog-tasks-container');
let readyList = document.getElementById('ready-tasks-container');
let progressList = document.getElementById('progress-tasks-container');
let finishedList = document.getElementById('finished-tasks-container');

readyBtn.disabled = backlogTasksArray.length ? false : true;
progressBtn.disabled = readyTasksArray.length ? false : true;
finishedBtn.disabled = progressTasksArray.length ? false : true;

userMenu.addEventListener('click', showDropDown);
backlogBtn.addEventListener('click', showInput);
readyBtn.addEventListener('click', createReadyList);
progressBtn.addEventListener('click', createProgressList);
finishedBtn.addEventListener('click', createFinishedList);

createTasksLists();

function showDropDown() {
    const dropdownTemplate = `<div class="dropdown">
                                <ul class="dropdown-list">
                                    <li>My account</li>
                                    <li>My tasks</li>
                                    <li>Settings</li>
                                    <li>Log out</li>
                                </ul>
                              </div>`;
    let arrow = document.querySelector('.arrow-down');
    let dropdownList = document.querySelector('.dropdown');

    arrow.classList.toggle('open');
    if (isDropdownOpened) {
        dropdownList.parentNode.removeChild(dropdownList);
        isDropdownOpened = false;
    } else {
        userMenu.innerHTML += dropdownTemplate;
        isDropdownOpened = true;
    }
}

function createTasksLists() {
    let listsHeaders = document.querySelectorAll('.tasks-header-title');

    listsHeaders.forEach((item, index) => {
        let listHeader = item;
        listHeader.innerHTML = dataMock[index].title;
    });

    backlogTasksArray.forEach(task => {
        let taskTemplate = `<div class="task">${task}</div>`;
        backlogList.innerHTML += taskTemplate;
    });

    readyTasksArray.forEach(task => {
        let taskTemplate = `<div class="task">${task}</div>`;
        readyList.innerHTML += taskTemplate;
    });

    progressTasksArray.forEach(task => {
        let taskTemplate = `<div class="task">${task}</div>`;
        progressList.innerHTML += taskTemplate;
    });
}

function showInput() {
    const inputTemplate = `<div class="task">
                              <input type="text" name="task" class="new-task">
                           </div>`;

    backlogBtn.disabled = true;
    backlogList.innerHTML += inputTemplate;
    let newTaskInput = document.querySelector('.new-task');
    newTaskInput.focus();
    newTaskInput.addEventListener('blur', saveTask);
    newTaskInput.addEventListener('input', function() {
        if (newTaskInput.value !== '' && newTaskInput.value !== ' ') {
            backlogBtn.disabled = false;
        }
    });
}

function saveTask() {
    const task = document.querySelector('.new-task').value;
    
    if (task !== '' && task !== ' ') {
        backlogTasksArray.push(task);
        localStorage.setItem('backlog_tasks', JSON.stringify(backlogTasksArray));
        backlogList.lastChild.innerHTML = task;
        readyBtn.disabled = false;
    } else {
        backlogList.lastChild.remove();
        backlogBtn.disabled = false;
    }
}

function createReadyList() {
    readyBtn.disabled = true;
    readyList.innerHTML += selectTasksTemplate;
    let selectTasksList = document.querySelector('.select-tasks');
    backlogTasksArray.forEach((task, i) => {
        selectTasksList.innerHTML += `<option class="select-task" onclick="addToReadyList(this.value, ${i})">
                                        ${task}
                                      </option>`;
    });
}

function addToReadyList(task, i) {
    const selectTasksList = document.querySelector('.select-tasks');
    const taskTemplate = `<div class="task">${task}</div>`;

    backlogTasksArray.splice(i, 1);
    localStorage.setItem('backlog_tasks', JSON.stringify(backlogTasksArray));
    readyTasksArray.push(task);
    localStorage.setItem('ready_tasks', JSON.stringify(readyTasksArray));
    selectTasksList.parentNode.removeChild(selectTasksList);
    readyList.innerHTML += taskTemplate;
    backlogList.children.item(i).remove();
    progressBtn.disabled = false;
    if (backlogTasksArray.length !== 0) {
        readyBtn.disabled = false;
    }
}

function createProgressList() {
    progressBtn.disabled = true;
    progressList.innerHTML += selectTasksTemplate;
    let selectTasksList = document.querySelector('.select-tasks');
    readyTasksArray.forEach((task, i) => {
        selectTasksList.innerHTML += `<option class="select-task" onclick="addToProgressList(this.value, ${i})">
                                        ${task}
                                      </option>`;
    });
}

function addToProgressList(task, i) {
    const selectTasksList = document.querySelector('.select-tasks');
    let taskTemplate = `<div class="task">${task}</div>`;

    readyTasksArray.splice(i, 1);
    localStorage.setItem('ready_tasks', JSON.stringify(readyTasksArray));
    progressTasksArray.push(task);
    localStorage.setItem('progress_tasks', JSON.stringify(progressTasksArray));
    selectTasksList.parentNode.removeChild(selectTasksList);
    progressList.innerHTML += taskTemplate;
    readyList.children.item(i).remove();
    finishedBtn.disabled = false;
    if (readyTasksArray.length !== 0) {
        progressBtn.disabled = false;
    }
}

function createFinishedList() {
    finishedBtn.disabled = true;
    finishedList.innerHTML += selectTasksTemplate;
    let selectTasksList = document.querySelector('.select-tasks');
    progressTasksArray.forEach((task, i) => {
        selectTasksList.innerHTML += `<option class="select-task" onclick="addToFinishedList(this.value, ${i})">
                                        ${task}
                                      </option>`;
    });
}

function addToFinishedList(task, i) {
    const selectTasksList = document.querySelector('.select-tasks');
    let taskTemplate = `<div class="task">${task}</div>`;

    progressTasksArray.splice(i, 1);
    localStorage.setItem('progress_tasks', JSON.stringify(progressTasksArray));
    finishedTasksArray.push(task);
    localStorage.setItem('finished_tasks', JSON.stringify(finishedTasksArray));
    selectTasksList.parentNode.removeChild(selectTasksList);
    finishedList.innerHTML += taskTemplate;
    progressList.children.item(i).remove();
    if (progressTasksArray.length !== 0) {
        finishedBtn.disabled = false;
    }
}