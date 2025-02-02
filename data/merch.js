document.addEventListener('DOMContentLoaded', function() {
  const mostPopProducts = document.querySelector(".shop-content");
  const jsonFile = "/data/merch.json";

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
      data.forEach((product) => {
        const { id, link, name, price, images } = product;
        mostPopProducts.innerHTML += `
          <div class="merch-box" data-product-id="${id}">
            <a href="${link}" aria-label="${name}"><img
            src="${images[0].url}" alt="${name}" class="product-img"></a>
            <div class="info-section">
              <h2 class="product-title">${name}</h2>
              <span class="product-price">${price}</span>
            </div>
          </div>
        `;
      });
    })
    .catch((error) => {
      console.error('Error fetching or processing merch data:', error);
      mostPopProducts.innerHTML = '<p>Unable to load merchandise data. Please try again later.</p>';
    });
});