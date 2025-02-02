// // Tours JSON Section
// const tourCards = document.querySelector(".tours");
// const jsonFile = "/data/tours.json";

// fetch(jsonFile)
//     .then((respone) => {
//         return respone.json();
//     })
//     .then((data) => {
//         data.map((tours) => {
//             const {date, location, place, buttonid} = tours;
//             tourCards.innerHTML += `
//         <div class="tour-card">
//             <h1>${date}</h1>
//             <h2>${location}</h2>
//             <h3>${place}</h3>
//             <button class="tours-btn" id="${buttonid}">Buy Tickets</button>
//         </div>
//         `;
//         });
//     });


// Tours JSON Section
const tourCards = document.querySelector(".tours");
const jsonFile = "/data/tours.json";

fetch(jsonFile)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        if (!Array.isArray(data)) {
            throw new Error('Data is not an array');
        }
        data.forEach((tour) => {
            const {date, location, place, buttonid} = tour;
            tourCards.innerHTML += `
        <div class="tour-card">
            <h1>${date}</h1>
            <h2>${location}</h2>
            <h3>${place}</h3>
            <button class="tours-btn" id="${buttonid}">Buy Tickets</button>
        </div>
        `;
        });
    })
    .catch((error) => {
        console.error('Error fetching or processing tour data:', error);
        tourCards.innerHTML = '<p>Unable to load tour data. Please try again later.</p>';
    });