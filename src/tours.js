document.addEventListener("DOMContentLoaded", () => {
    const tourCards = document.querySelector(".tours");
    const toursJson = "/data/tours.json";

    // Modal elements
    const modal = document.getElementById("tourModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDate = document.getElementById("modalDate");
    const modalLocation = document.getElementById("modalLocation");
    const modalPlace = document.getElementById("modalPlace");
    const modalPrice = document.getElementById("modalPrice");
    const closeBtn = document.getElementById("closeModal");

    fetch(toursJson)
        .then((response) => response.json())
        .then((data) => {
            data.forEach((tour) => {
                const { date, location, place, buttonid } = tour;
                tourCards.innerHTML += `
            <div class="tour-card" data-aos="fade-up" data-aos-delay="300">
                <p class="tour-dates">${date}</p>
                <p class="tour-location">${location}</p>
                <p class="tour-place">${place}</p>
                <button class="tours-btn" data-id="${buttonid}">Buy Tickets</button>
            </div>
            `;
            });

            // Add event listeners to all buttons after they're created
            document.querySelectorAll('.tours-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const tourData = data.find(tour => tour.buttonid === e.target.dataset.id);
                    modalTitle.textContent = "Tour Details";
                    modalDate.textContent = `Date: ${tourData.date}`;
                    modalLocation.textContent = `Location: ${tourData.modalLocation}`;
                    modalPlace.textContent = `Place: ${tourData.place}`;
                    modalPrice.textContent = `Price: ${tourData.ticketsPrice}`;
                    modal.showModal();
                    document.body.style.overflow = 'hidden';
                });
            });
        })

    // Close modal when clicking the close button
    closeBtn.addEventListener('click', () => {
        modal.close();
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside of it
    modal.addEventListener('click', (event) => {
        const rect = modal.getBoundingClientRect();
        const isInDialog =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom;

        if (!isInDialog) {
            modal.close();
            document.body.style.overflow = 'auto';
        }
    });
});