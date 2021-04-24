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
    if (dropdownList) {
        dropdownList.parentNode.removeChild(dropdownList);
    } else {
        mainContainer.innerHTML = dropdownTemplate;
    }
}

const userMenu = document.querySelector('.user-menu');

userMenu.addEventListener('click', showDropDown);