import DomElement from "../DomElement/DomElement";
import css from "./board.module.css";
import ListsContainer from "../ListsContainer/ListsContainer";
import { showInput, createList } from "../AddTask/AddTask";

const listsContainer = new ListsContainer();
const dataMock = [
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
    }
];

export class Board {
    constructor() {
        this.element = new DomElement({
            type: 'main',
            className: css.mainContainer,
            html: listsContainer.element.outerHTML
        }).element;
    }

    createTasksLists(localStorage, containers) {
        let tasksContainers = containers;

        localStorage.forEach((elem, i) => {
            elem.forEach(task => {
                let taskTemplate = `<div class="${css.task}">${task}</div>`;
                tasksContainers[i].innerHTML += taskTemplate;
            })
        });
    }

    addLogic() {
        const addCardButtons = document.querySelectorAll(`.${css.addCard}`);
        const tasksContainers = document.querySelectorAll('.tasks-container');
        let localStorageArrays = [];

        document.addEventListener('DOMContentLoaded', () => this.createTasksLists(localStorageArrays, tasksContainers));

        addCardButtons.forEach((item, index) => {
            let curBtn = item;
            let tasksArray = localStorage.getItem(dataMock[index].id) ? JSON.parse(localStorage.getItem(dataMock[index].id)) : [];

            localStorageArrays.push(tasksArray);
            
            if (index === 0) {
                curBtn.addEventListener('click', () => showInput(curBtn, tasksContainers[index], localStorageArrays[index], dataMock[index].id, addCardButtons[index + 1]));
            } else {
                curBtn.disabled = localStorageArrays[index - 1].length ? false : true;
               
                curBtn.addEventListener('click', () => createList(addCardButtons, tasksContainers, localStorageArrays, dataMock, index));
            }
        });
    }
}