const tourCards = document.querySelector(".tours");
const toursJson = "/data/tours.json";

// Modal elements
const modal = document.getElementById("tourModal");
const modalTitle = document.getElementById("modalTitle");
const modalDate = document.getElementById("modalDate");
const modalLocation = document.getElementById("modalLocation");
const modalPlace = document.getElementById("modalPlace");
const closeBtn = document.querySelector(".close");

fetch(toursJson)
    .then((response) => response.json())
    .then((data) => {
        data.forEach((tour) => {
            const {date, location, place, buttonid} = tour;
            tourCards.innerHTML += `
        <div class="tour-card">
            <h1>${tour.date}</h1>
            <h2>${tour.location}</h2>
            <h3>${tour.place}</h3>
            <button class="tours-btn" data-id="${buttonid}">Buy Tickets</button>
        </div>
        `;
        });

        // Add event listeners to all buttons after they're created
        document.querySelectorAll('.tours-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const tourData = data.find(tour => tour.buttonid === e.target.dataset.id);
                if (tourData) {
                    modalTitle.textContent = "Tour Details";
                    modalDate.textContent = `Date: ${tourData.date}`;
                    modalLocation.textContent = `Location: ${tourData.location}`;
                    modalPlace.textContent = `Place: ${tourData.place}`;
                    modal.style.display = "block";
                }
            });
        });
    })
    .catch((error) => console.error('Error loading tour data:', error));

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