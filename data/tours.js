const tourCards = document.querySelector(".tours");

// Modal elements
const modal = document.getElementById("tourModal");
const modalTitle = document.getElementById("modalTitle");
const modalDate = document.getElementById("modalDate");
const modalLocation = document.getElementById("modalLocation");
const modalPlace = document.getElementById("modalPlace");
const closeBtn = document.querySelector(".close");

// Tour data directly in the JavaScript file
const toursData = [
    { date: "2023-07-15", location: "New York, NY", place: "Madison Square Garden", buttonid: "ny-msg" },
    { date: "2023-07-22", location: "Los Angeles, CA", place: "Hollywood Bowl", buttonid: "la-hb" },
    { date: "2023-07-29", location: "Chicago, IL", place: "United Center", buttonid: "chi-uc" },
    // Add more tour dates as needed
];

// Function to render tour cards
function renderTourCards() {
    tourCards.innerHTML = toursData.map(tour => `
        <div class="tour-card">
            <h1>${tour.date}</h1>
            <h2>${tour.location}</h2>
            <h3>${tour.place}</h3>
            <button class="tours-btn" data-id="${tour.buttonid}">Buy Tickets</button>
        </div>
    `).join('');

    // Add event listeners to all buttons after they're created
    document.querySelectorAll('.tours-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const tourData = toursData.find(tour => tour.buttonid === e.target.dataset.id);
            if (tourData) {
                modalTitle.textContent = "Tour Details";
                modalDate.textContent = `Date: ${tourData.date}`;
                modalLocation.textContent = `Location: ${tourData.location}`;
                modalPlace.textContent = `Place: ${tourData.place}`;
                modal.style.display = "block";
            }
        });
    });
}

// Render tour cards when the page loads
renderTourCards();

// Close modal when clicking the close button
closeBtn.onclick = () => {
    modal.style.display = "none";
};

// Close modal when clicking outside of it
window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};