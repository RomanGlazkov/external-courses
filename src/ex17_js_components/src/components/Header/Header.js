import DomElement from "../DomElement/DomElement";
import css from "./header.module.css";
import showDropDown from "../Dropdown/ShowDropdown";

export class Header {
    constructor() {
        this.element = new DomElement({
            type: 'header',
            className: css.header,
            html:  `<div class="${css.headerLeft}">
                        <div class="${css.logo}"></div>
                        <div class="${css.title}">Awesome Kanban Board</div>
                    </div>
                    <div class="${css.headerRight}">
                        <div class="${css.createList}">
                            <div class="${css.createListIcon}"></div>
                            <div class="${css.createListTitle}">Create new list</div>
                        </div>
                        <div class="${css.userMenu}">
                            <div class="${css.userAvatar}"></div>
                            <div class="${css.arrowDown}"></div>
                        </div>
                    </div>`
        }).element;
    }

    showDropDown() {
        const userMenu = document.querySelector(`.${css.userMenu}`);
        
        userMenu.addEventListener('click', showDropDown);
    }
}