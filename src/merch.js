document.addEventListener("DOMContentLoaded", () => {
  const categoryFilters = document.querySelectorAll(".category-filter");
  const priceSortRadios = document.querySelectorAll("input[name='price-sort']");
  const shopContent = document.querySelector(".shop-content");

  let merchItems = []; // Store the original merch data

  // Fetch the merch items from JSON or API
  fetch("/data/merch.json") // Update this path based on your actual data source
    .then(response => response.json())
    .then(data => {
      merchItems = data;
      displayMerch(merchItems);
    });

  // Function to display merch items
  function displayMerch(items) {
    shopContent.innerHTML = "";
    items.forEach(item => {
      const merchElement = document.createElement("div");
      merchElement.classList.add("merch-box");
      merchElement.innerHTML = `
           <div class="merch-box">
              <a href="${item.link}" aria-label="${item.name}"><img
              src="${item.image}" alt="${item.name}" class="product-img"></a>
              <h3 class="product-title">${item.name}</h3>
              <p class="product-category">${item.category}</p>
              <p class="product-price">$${item.price}</p>
            </div>
          `;
      shopContent.appendChild(merchElement);
    });
  }

  // Sorting and Filtering Function
  function filterAndSortMerch() {
    let filteredMerch = [...merchItems];

    // Get selected categories
    const selectedCategories = Array.from(categoryFilters)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);

    // Filter by selected categories
    filteredMerch = filteredMerch.filter(item => selectedCategories.includes(item.category));

    // Get selected price sorting
    const selectedPriceSort = document.querySelector("input[name='price-sort']:checked").value;
    if (selectedPriceSort === "low-to-high") {
      filteredMerch.sort((a, b) => a.price - b.price);
    } else if (selectedPriceSort === "high-to-low") {
      filteredMerch.sort((a, b) => b.price - a.price);
    }

    displayMerch(filteredMerch);
  }

  // Event Listeners
  categoryFilters.forEach(checkbox => checkbox.addEventListener("change", filterAndSortMerch));
  priceSortRadios.forEach(radio => radio.addEventListener("change", filterAndSortMerch));
});



// old


// const jsonFile = "/data/merch.json";
// const merch = document.querySelector(".shop-content");

// fetch(jsonFile)
//   .then((response) => response.json())
//   .then((data) => {
//     data.forEach((product) => {
//       const { link, name, price, image } = product;
//       merch.innerHTML += `
//       <div class="merch-box">
//           <a href="${link}" aria-label="${name}"><img
//           src="${image}" alt="${name}" class="product-img"></a>
//           <div class="info-section">
//             <h2 class="product-title">${name}</h2>
//             <span class="product-price">${price}</span>
//           </div>
// 		  </div>
//         `;
//     });
//   });
