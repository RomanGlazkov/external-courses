const userMenu = document.querySelector('.user-menu');
const createNewListBtn = document.querySelector('.create-list');
const dropdownTemplate = `<div class="dropdown">
                            <ul class="dropdown-list">
                                <li>My account</li>
                                <li>My tasks</li>
                                <li>Settings</li>
                                <li>Log out</li>
                            </ul>
                          </div>`;

const listMenuTemplate = `<div class="list-menu-container">
                            <ul class="menu-list">
                                <li class="menu-list-item">Delete list</li>
                            </ul>
                          </div>`;
                          
const selectTasksTemplate = `<select class="select-tasks" id="select-tasks" size="5">
                             </select>`;

const inputTemplate = `<div class="task">
                        <input type="text" name="task" class="new-task">
                      </div>`;

const listHeaderTemplate = `<header class="tasks-header">
                                <input type="text" name="list-header" class="new-list" placeholder="Enter title here...">
                                <div class="tasks-header-menu">
                                    <div class="tasks-header-menu_element"></div>
                                    <div class="tasks-header-menu_element"></div>
                                    <div class="tasks-header-menu_element"></div>
                                </div>
                            </header>`;

const emptyListsContainerTemplate = `<div class="empty-lists-container">
                                        <div>You don't have active task lists, but you can use the button "Create new list"</div>
                                     </div>`;


let dataMock = localStorage.getItem('dataMock') ? JSON.parse(localStorage.getItem('dataMock')) : [
    {
        title: 'backlog',
        id: 'backlog_tasks'
    },
    {
        title: 'ready',
        id: 'ready_tasks'
    },
    {
        title: 'in progress',
        id: 'progress_tasks'
    },
    {
        title: 'finished',
        id: 'finished_tasks'
    },
];
let isDropdownOpened = false;
let isListMenuOpened = false;
let localStorageTasks = getLocalStorageTasks();
let listsContainer = document.querySelector('.lists-container');
let activeTasksContainer = document.querySelector('.active_tasks');
let finishedTasksContainer = document.querySelector('.finished_tasks');

userMenu.addEventListener('click', showDropDown);
createNewListBtn.addEventListener('click', createNewList);

createTasksLists(dataMock);
addEventsListeners();

function showDropDown() {
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

function createTasksListTemplate(title) {
    const template = `<div class="tasks-list">
                        <header class="tasks-header">
                            <div class="tasks-header-title">${title}</div>
                            <div class="tasks-header-menu">
                                <div class="tasks-header-menu_element"></div>
                                <div class="tasks-header-menu_element"></div>
                                <div class="tasks-header-menu_element"></div>
                            </div>
                        </header>
                        <div class="tasks-container" id="${title}-tasks-container"></div>
                        <button class="add-card" id="${title}">+ Add card</button>
                      </div>`;

    return template;
}

function createTasksLists(listsArray) {
    if (listsArray.length) {
        createNewListBtn.classList.remove('attention');
        listsArray.forEach((elem, i) => {
            listsContainer.innerHTML += createTasksListTemplate(elem.title);

            localStorageTasks[i].forEach(task => {
                const taskTemplate = `<div class="task">${task}</div>`;
                const tasksContainer = document.getElementById(`${elem.title}-tasks-container`);
    
                tasksContainer.innerHTML += taskTemplate;
            });
        });
    } else {
        createNewListBtn.classList.add('attention');
        listsContainer.innerHTML = emptyListsContainerTemplate;
    }
    countTasks();
}

function showInput(elem, list, tasksArray, id, nextBtn) {
    let curButton = elem;
    let tasksList = list;

    curButton.disabled = true;
    tasksList.innerHTML += inputTemplate;
    let newTaskInput = document.querySelector('.new-task');
    newTaskInput.focus();
    newTaskInput.addEventListener('blur', () => saveTask(elem, list, tasksArray, id, nextBtn));
    newTaskInput.addEventListener('input', function() {
        if (newTaskInput.value !== '' && newTaskInput.value !== ' ') {
            curButton.disabled = false;
        }
    });
}

function saveTask(elem, list, tasksArray, id, nextBtn) {
    const task = document.querySelector('.new-task').value;
    let curButton = elem;
    let nextButton = nextBtn;
    let tasksList = list;
    
    if (task !== '' && task !== ' ') {
        tasksArray.push(task);
        localStorage.setItem(id, JSON.stringify(tasksArray));
        tasksList.lastChild.innerHTML = task;
        if (nextButton) {
            nextButton.disabled = false;
        }
    } else {
        tasksList.lastChild.remove();
        curButton.disabled = false;
    }
    countTasks();
}

function getLocalStorageTasks() {
    let localStorageArrays = [];

    dataMock.forEach(item => {
        let tasksArray = localStorage.getItem(item.id) ? JSON.parse(localStorage.getItem(item.id)) : [];

        localStorageArrays.push(tasksArray);
    });

    return localStorageArrays;
}

function addEventsListeners() {
    const addCardButtons = document.querySelectorAll('.add-card');
    const tasksContainers = document.querySelectorAll('.tasks-container');
    const listsMenu = document.querySelectorAll('.tasks-header-menu');

    addCardButtons.forEach((item, index) => {
        let curBtn = item;

        if (index === 0) {
           curBtn.addEventListener('click', () => {
               showInput(curBtn, tasksContainers[index], localStorageTasks[index], dataMock[index].id, addCardButtons[index + 1]);
           });
        } else {
            curBtn.disabled = localStorageTasks[index - 1].length ? false : true;
            curBtn.addEventListener('click', () => createDropdownTasksList(addCardButtons, tasksContainers, localStorageTasks, dataMock, index));
        }
    });

    listsMenu.forEach((item, index) => item.addEventListener('click', event => {
        showListMenu(index);
        event.stopPropagation();
    }));
}

function createDropdownTasksList(buttons, tasksContainers, localStorageArrays, btnData, index) {
    let curButton = buttons[index];
    let nextButton = buttons[index + 1];
    let prevTasksList = tasksContainers[index - 1];
    let curTasksList = tasksContainers[index];
    let prevTasksStorage = localStorageArrays[index - 1];
    let curTasksStorage = localStorageArrays[index];

    curButton.disabled = true;
    curTasksList.innerHTML += selectTasksTemplate;
    let selectTasksList = document.querySelector('.select-tasks');
    prevTasksStorage.forEach((task, i) => {
        selectTasksList.innerHTML += `<option class="select-task" data-task="${task}" data-id="${i}">
                                        ${task}
                                      </option>`;
    });
    const options = document.querySelectorAll('.select-task');
    options.forEach(option => option.addEventListener('click', () => addToList(option.dataset.task, option.dataset.id, btnData)));

    function addToList(task, i, btnData) {
        const taskTemplate = `<div class="task">${task}</div>`;
        const selectTasksList = document.querySelector('.select-tasks');

        prevTasksStorage.splice(i, 1);
        localStorage.setItem(btnData[index - 1].id, JSON.stringify(prevTasksStorage));
        curTasksStorage.push(task);
        localStorage.setItem(btnData[index].id, JSON.stringify(curTasksStorage));
        selectTasksList.remove();
        curTasksList.innerHTML += taskTemplate;
        prevTasksList.children.item(i).remove();
        if (index !== buttons.length - 1) {
            nextButton.disabled = false;
        }
        if (prevTasksStorage.length !== 0) {
            curButton.disabled = false;
        }
        countTasks();
    }
}

function createNewList() {
    let tasksList = document.createElement('div');

    tasksList.className = 'tasks-list';
    tasksList.innerHTML = listHeaderTemplate;
    listsContainer.prepend(tasksList);
    let listHeaderInput = document.querySelector('.new-list');
    listHeaderInput.focus();
    listHeaderInput.addEventListener('blur', saveNewList);
}

function saveNewList() {
    let listTitle = document.querySelector('.new-list').value.toLowerCase();

    if (listTitle !== '' && listTitle !== ' ') {
        dataMock.unshift({
            title: listTitle,
            id: `${listTitle.split(' ').join('_')}_tasks`
        });
        localStorage.setItem('dataMock', JSON.stringify(dataMock));
        localStorageTasks = getLocalStorageTasks();
        listsContainer.innerHTML = '';
        createTasksLists(dataMock);
        addEventsListeners();
    } else {
        listsContainer.firstChild.remove();
    }
}

function showListMenu(index) {
    const listsMenu = document.querySelectorAll('.tasks-header-menu');
    
    if (isListMenuOpened) {
        listsMenu[index].lastChild.remove();
        isListMenuOpened = false;
    } else {
        listsMenu[index].innerHTML += listMenuTemplate;
        isListMenuOpened = true;
        const menuListItem = document.querySelector('.menu-list-item');
        menuListItem.addEventListener('click', event => {
            deleteList(index);
            event.stopPropagation();
        });
    }
}

function deleteList(index) {
    dataMock.splice(index, 1);
    localStorage.setItem('dataMock', JSON.stringify(dataMock));
    localStorageTasks = getLocalStorageTasks();
    listsContainer.innerHTML = '';
    isListMenuOpened = false;
    createTasksLists(dataMock);
    addEventsListeners();
}

function countTasks() {
    let activeTasksQuantity = 0;
    let finishedTasksQuantity = 0;
    localStorageTasks = getLocalStorageTasks();

    activeTasksContainer.innerHTML = `Active tasks: ${activeTasksQuantity}`;
    finishedTasksContainer.innerHTML = `Finished tasks: ${finishedTasksQuantity}`;

    if (dataMock.length) {
        activeTasksQuantity = localStorageTasks[0] ? localStorageTasks[0].length : 0;
        activeTasksContainer.innerHTML = `Active tasks in the first list: ${activeTasksQuantity}`;

        if (localStorageTasks.length > 1) {
            finishedTasksQuantity = localStorageTasks[localStorageTasks.length - 1] ? localStorageTasks[localStorageTasks.length - 1].length : 0;
            finishedTasksContainer.innerHTML = `Finished tasks in the last list: ${finishedTasksQuantity}`;
        } else {
            finishedTasksContainer.innerHTML = `Finished tasks: ${finishedTasksQuantity}`;
        }
    }
}

document.addEventListener('click', event => {
    const listMenuContainer = document.querySelector('.list-menu-container');

    if (listMenuContainer) {
        if (event.target.className !== 'menu-list-item') {
            listMenuContainer.remove();
        }
    }
});