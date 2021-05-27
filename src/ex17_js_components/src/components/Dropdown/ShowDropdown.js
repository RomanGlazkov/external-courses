import css from "../Header/header.module.css";

let isDropdownOpened = false;

export default function showDropDown() {
    const dropdownTemplate = `<div class="${css.dropdown}">
                                <ul class="${css.dropdownList}">
                                    <li>My account</li>
                                    <li>My tasks</li>
                                    <li>Settings</li>
                                    <li>Log out</li>
                                </ul>
                              </div>`;
    const userMenu = document.querySelector(`.${css.userMenu}`);
    let arrow = document.querySelector(`.${css.arrowDown}`);
    let dropdownList = document.querySelector(`.${css.dropdown}`);

    arrow.classList.toggle(css.open);
    if (isDropdownOpened) {
        dropdownList.parentNode.removeChild(dropdownList);
        isDropdownOpened = false;
    } else {
        userMenu.innerHTML += dropdownTemplate;
        isDropdownOpened = true;
    }
}