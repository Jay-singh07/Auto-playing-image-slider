let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;
const carouselInner = document.querySelector('.carousel-inner');
const indicators = document.querySelectorAll('.indicator');
let carouselInterval;

function showItem(index) {
    currentIndex = index;
    const newTransformValue = -currentIndex * 100;
    carouselInner.style.transform = `translateX(${newTransformValue}%)`;
    updateIndicators();
}

function showNextItem() {
    currentIndex = (currentIndex + 1) % totalItems;
    showItem(currentIndex);
}

function showPrevItem() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    showItem(currentIndex);
}

function updateIndicators() {
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

function startCarousel() {
    carouselInterval = setInterval(showNextItem, 3000); // Change image every 3 seconds
}

function stopCarousel() {
    clearInterval(carouselInterval);
}

document.addEventListener('DOMContentLoaded', () => {
    startCarousel();

    document.querySelector('.next').addEventListener('click', () => {
        showNextItem();
        stopCarousel();
        startCarousel(); // Restart carousel after click
    });

    document.querySelector('.prev').addEventListener('click', () => {
        showPrevItem();
        stopCarousel();
        startCarousel(); // Restart carousel after click
    });

    document.querySelector('.carousel').addEventListener('mouseenter', stopCarousel);
    document.querySelector('.carousel').addEventListener('mouseleave', startCarousel);

    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const index = parseInt(indicator.getAttribute('data-index'));
            showItem(index);
            stopCarousel();
            startCarousel(); // Restart carousel after click
        });
    });
});
