const tourCards = document.querySelector(".tours");
const toursJson = "/data/tours.json";

fetch(toursJson)
    .then((respone) => {
        return respone.json();
    })
    .then((data) => {
        data.forEach((tours) => {
            const {date, location, place, buttonid} = tours;
            tourCards.innerHTML += `
        <div class="tour-card">
            <h1>${date}</h1>
            <h2>${location}</h2>
            <h3>${place}</h3>
            <button class="tours-btn" id="${buttonid}">Buy Tickets</button>
        </div>
        `;
        });
    });