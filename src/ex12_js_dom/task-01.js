let counter = 1;
async function getListImages(num) {
    const url = `https://picsum.photos/v2/list?page=${num}&limit=5`;
    let response = await fetch(url);
    let message;

    if (response.ok) {
        return await response.json();
    }

    message = 'Error HTTP: ' + response.status;
    return message;
}

async function createSliderItems() {
    const images = await getListImages(counter);
    let slider = document.querySelector('.slider');
    let paginationContainer = document.querySelector('.pagination');

    slider.innerHTML = '';
    paginationContainer.innerHTML = '';
    images.forEach((image, index) => {
        let sliderItem = document.createElement('div');
        let paginationElem = `<div class="pagination_elem" onclick="currentSlide(${index + 1})"></div>`;
        
        sliderItem.className = 'slider_item';
        sliderItem.innerHTML = `<img class="slider_img" src="${image.download_url}" />
                                <button class="previous" onclick="previousSlide()">&#10094;</button>
                                <button class="next" onclick="nextSlide()">&#10095;</button>`;
        slider.append(sliderItem);
        paginationContainer.innerHTML += paginationElem;
    });
    counter++;
    slideIndex = 1;
    showSlides(slideIndex);
}

let slideIndex = 1;

function showSlides(n) {
    const slides = document.querySelectorAll('.slider_item');
    const paginationElements = document.querySelectorAll('.pagination_elem');

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    slides.forEach((slide) => {
        let curSlide = slide;
        curSlide.style.display = 'none';
    });
    paginationElements.forEach((elem) => {
        let curElem = elem;
        curElem.style.background = '#fff';
        curElem.style.border = '1px solid #000';
    });
    slides[slideIndex - 1].style.display = 'block';
    paginationElements[slideIndex - 1].style.backgroundColor = '#000';
}

function nextSlide() {
    showSlides(slideIndex += 1);
}

function previousSlide() {
    showSlides(slideIndex -= 1);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

createSliderItems();