import DomElement from "../DomElement/DomElement";
import css from "./footer.module.css";

export class Footer {
    constructor() {
        this.element = new DomElement({
            type: 'footer',
            className: css.footer,
            html:  `<div class="${css.tasksInfo}">
                        <div class="${css.activeTasks}">Active tasks: &lt;N&gt;</div>
                        <div class="${css.finishedTasks}">Finished tasks: &lt;M&gt;</div>
                    </div>
                    <div class="${css.copyright}">Kanban board by Roman Glazkov, 2021</div>`
        }).element;
    }
}