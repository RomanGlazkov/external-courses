import css from "../Board/board.module.css";

const inputTemplate = `<div class="${css.task}">
                              <input type="text" name="task" class="${css.newTask}">
                       </div>`;
const selectTasksTemplate = `<select class="${css.selectTasks}" id="select-tasks" size="5">
                             </select>`;

export function showInput(elem, list, tasksArray, id, nextBtn) {
    let curButton = elem;
    let tasksList = list;

    curButton.disabled = true;
    tasksList.innerHTML += inputTemplate;
    let newTaskInput = document.querySelector(`.${css.newTask}`);
    newTaskInput.focus();
    newTaskInput.addEventListener('blur', () => saveTask(elem, list, tasksArray, id, nextBtn));
    newTaskInput.addEventListener('input', function() {
        if (newTaskInput.value !== '' && newTaskInput.value !== ' ') {
            curButton.disabled = false;
        }
    });
}

function saveTask(elem, list, tasksArray, id, nextBtn) {
    let curButton = elem;
    let nextButton = nextBtn;
    let tasksList = list;
    const task = document.querySelector(`.${css.newTask}`).value;

    if (task !== '' && task !== ' ') {
        tasksArray.push(task);
        localStorage.setItem(id, JSON.stringify(tasksArray));
        tasksList.lastChild.innerHTML = task;
        nextButton.disabled = false;
    } else {
        list.lastChild.remove();
        curButton.disabled = false;
    }
}

export function createList(buttons, tasksContainers, localStorageArrays, btnData, index) {
    let curButton = buttons[index];
    let nextButton = buttons[index + 1];
    let prevTasksList = tasksContainers[index - 1];
    let curTasksList = tasksContainers[index];
    let prevTasksStorage = localStorageArrays[index - 1];
    let curTasksStorage = localStorageArrays[index];

    curButton.disabled = true;
    curTasksList.innerHTML += selectTasksTemplate;
    let selectTasksList = document.querySelector(`.${css.selectTasks}`);
    prevTasksStorage.forEach((task, i) => {
        selectTasksList.innerHTML += `<option class="${css.selectTask}" data-task="${task}" data-id="${i}">
                                        ${task}
                                      </option>`;
    });
    const options = document.querySelectorAll(`.${css.selectTask}`);
    options.forEach(option => option.addEventListener('click', () => addToList(option.dataset.task, option.dataset.id, btnData)));

    function addToList(task, i, btnData) {
        const selectTasksList = document.querySelector(`.${css.selectTasks}`);
        const taskTemplate = `<div class="${css.task}">${task}</div>`;
    
        prevTasksStorage.splice(i, 1);
        localStorage.setItem(btnData[index - 1].id, JSON.stringify(prevTasksStorage));
        curTasksStorage.push(task);
        localStorage.setItem(btnData[index].id, JSON.stringify(curTasksStorage));
        selectTasksList.remove();
        curTasksList.innerHTML += taskTemplate;
        prevTasksList.children.item(i).remove();
        nextButton.disabled = false;
        if (prevTasksStorage.length !== 0) {
            curButton.disabled = false;
        }
    }
}