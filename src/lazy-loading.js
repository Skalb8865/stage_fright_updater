// Get the section containing the tour cards
const tourSection = document.getElementById('tour-section');

// Get the container for the tour cards
const tourContainer = tourSection.querySelector('.tours');

// Function to fetch the tour cards
async function fetchTourCards() {
    // Fetch the tour cards from the server
    const response = await fetch('/html/Tours/tour.html');
    const html = await response.text();

    // Add the fetched tour cards to the container
    tourContainer.innerHTML += html;
}

// Function to check if the user has scrolled to the bottom of the page
function isBottomReached() {
    const scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
    );
    const scrollTop = window.pageYOffset;
    const clientHeight = window.innerHeight;

    return scrollTop + clientHeight >= scrollHeight;
}

// Add an event listener to the window scroll event
window.addEventListener('scroll', () => {
    if (isBottomReached()) {
        // Fetch the tour cards when the user has scrolled to the bottom
        fetchTourCards();
    }
});