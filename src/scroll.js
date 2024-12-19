// function nextMovies(test_container, scrollDistance){
//     test_container.scrollBy({ left: scrollDistance, behavior:'smooth'  });
// }

// function previousMovies(test_container, scrollDistance){
//     test_container.scrollBy({ left: -scrollDistance, behavior:'smooth'  });
// }

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.test-container');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');

    // Amount to scroll by (adjust as needed)
    const scrollAmount = 500;

    scrollLeftBtn.addEventListener('click', () => {
        container.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    scrollRightBtn.addEventListener('click', () => {
        container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
});