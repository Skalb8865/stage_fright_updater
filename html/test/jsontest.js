const mostPopPorducts = document.querySelector(".shop-content");

const jsonFile = "/data/merch.json";

fetch(jsonFile)
    .then((respone) => {
        return respone.json();
    })
    .then((data) => {
        data.map((product) => {
            const { id, link, name, price, images } = product;
            mostPopPorducts.innerHTML += `
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
    });