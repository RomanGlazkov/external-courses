let isDropdownOpened;

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
    let mainContainer = document.querySelector('.main-container');
    let dropdownList = document.querySelector('.dropdown');

    arrow.classList.toggle('open');
    if (isDropdownOpened) {
        dropdownList.parentNode.removeChild(dropdownList);
        isDropdownOpened = false;
    } else {
        mainContainer.innerHTML = dropdownTemplate;
        isDropdownOpened = true;
    }
}

const userMenu = document.querySelector('.user-menu');

userMenu.addEventListener('click', showDropDown);