const mostPopPorducts = document.querySelector(".shop-content");

const jsonFile = "/data/merch.json";

fetch(jsonFile)
    .then((respone) => {
        return respone.json();
    })
    .then((data) => {
        data.map((product) => {
            const { link, name, price, image } = product;
            mostPopPorducts.innerHTML += `
        <div class="merch-box">
          <a href="${link}" aria-label="${name}"><img
          src="${image}" alt="${name}" class="product-img"></a>
          <div class="info-section">
            <h2 class="product-title">${name}</h2>
            <span class="product-price">${price}</span>
          </div>
				</div>
        `;
        });
    });