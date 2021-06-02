const dataMock = ['Afghanistan', 'Albania', 'Algeria', 'Denmark', 'England', 'Estonia', 'Finland', 'Russia', 'Iceland', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Norway', 'South Africa', 'France', 'Canada', 'Germany'];
const searchInput = document.getElementById('search-country');
const countryList = document.querySelector('.country-list');

searchInput.addEventListener('input', debounce(search, 300));

createCountryList();

function createCountryList() {
    dataMock.forEach(elem => {
        countryList.innerHTML += `<li class="hide">${elem}</li>`;
    });
}

function search() {
    let value = searchInput.value.trim().toLowerCase();
    let countries = document.querySelectorAll('.country-list li');

    if (value !== '') {
        countries.forEach(elem => {
            let country = elem.innerText.toLowerCase();
            if (country.search(value) === -1) {
                elem.classList.add('hide');
            } else {
                elem.classList.remove('hide');
            }
        });
    } else {
        countries.forEach(elem => {
            elem.classList.add('hide');
        });
    }
}

function debounce(func, ms) {
    let timeout;

    return function() {
        let self = this;
        const functionCall = function() {
            return func.apply(self, arguments);
        };
        clearTimeout(timeout);
        timeout = setTimeout(functionCall, ms);
    }
}