import DomElement from "../DomElement/DomElement";
import css from "../Board/board.module.css";

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

export default class ListsContainer {
    constructor() {
        this.element = new DomElement({
            className: css.listsContainer,
            html: this.createTasksLists()
        }).element;
    }

    createTasksLists() {
        let result = '';

        dataMock.forEach(elem => {
            let tasksList = `<div class="${css.tasksList}">
                                <header class="${css.tasksHeader}">
                                    <div class="${css.tasksHeaderTitle}">${elem.title}</div>
                                    <div class="${css.tasksHeaderMenu}">
                                        <div class="${css.tasksHeaderMenuElement}"></div>
                                        <div class="${css.tasksHeaderMenuElement}"></div>
                                        <div class="${css.tasksHeaderMenuElement}"></div>
                                    </div>
                                </header>
                                <div class="tasks-container" id="${elem.title}-tasks-container"></div>
                                <button class="${css.addCard}" id="${elem.title}">+ Add card</button>
                            </div>`;
            
            result += tasksList;
        });
        
        return result;
    }
}