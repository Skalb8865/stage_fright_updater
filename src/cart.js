// select everything need for the cart and the mobile nav to function
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");
const cartOverlay = document.querySelector(".cart-overlay");
const openMobileNavIcon = document.querySelector("#mobile-nav--icon");
const mobileNav = document.querySelector(".mobile-nav");
const closeMobileNavIcon = document.querySelector("#nav-close");
const mobileOverlay = document.querySelector(".mobile-overlay");

// adds an event listener to each addCart button
const addToCartButtons = document.querySelectorAll(".add-cart");

// adds an event listener to the buy button
const buyButton = document.querySelector(".btn-buy");

let products = document.querySelectorAll(".main_container, .product-box");

let cartBoxes = document.querySelectorAll(".cart-box");

function opensCart() {
  cart.classList.add("active");
  cartOverlay.classList.add("active");
}

function closesCart() {
  cart.classList.remove("active");
  cartOverlay.classList.remove("active");
}

function opensMobileNav() {
  mobileNav.classList.add("active");
  mobileOverlay.classList.add("active");
}

function closesMobileNav() {
  mobileOverlay.classList.remove("active");
  mobileNav.classList.remove("active");
}

function initializeCart() {
  // adds an event listener to the cart icon for when it is clicked the class active gets added to the cart and the cartOverlay
  cartIcon.addEventListener("click", () => {
    opensCart();
  });

  // adds an event listener to the cart icon for when it is clicked the class active gets removed to the cart and the cartOverlay
  closeCart.addEventListener("click", () => {
    closesCart();
  });

  // adds an event listener to the cartOverlay to close the cart and the cartOverlay when it is clicked
  cartOverlay.addEventListener("click", () => {
    closesCart();
  });

  // adds an event listener to the mobileNav icon for when it is clicked the class active gets added to the mobileNav and the mobileNavOverlay
  openMobileNavIcon.addEventListener("click", () => {
    opensMobileNav();
  });

  // adds an event listener to the mobileNav icon for when it is clicked the class active gets removed to the mobileNav and the mobileNavOverlay
  closeMobileNavIcon.addEventListener("click", () => {
    closesMobileNav();
  });

  mobileOverlay.addEventListener("click", () => {
    closesMobileNav();
  });

  // checks if the viewpot widht is >= 1025px so that it can remove the class active from the mobileNav and the cartOverlay
  function checkViewportWidth() {
    if (window.innerWidth >= 1025) {
      closesMobileNav();
    }
  }

  // calls the check viewportWidth function when the page loads
  checkViewportWidth();

  window.addEventListener("resize", checkViewportWidth);

  document.addEventListener("DOMContentLoaded", updateCartDisplay);

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", addCartItem);
  });

  buyButton.addEventListener("click", buyOrder);

  // calls the updateAddToCartButton function when the page loads
  updateAddToCartButton();

  // checks if the input size has changde and updates the add-cart button
  document.addEventListener("change", function (event) {
    if (event.target.matches('input[name="size"]')) {
      updateAddToCartButton();
    }
  });

  // calls the updateCartDisplay function when the page loads and the updateTotallItems when the page loads
  updateCartDisplay();
  updateTotalItems();
}

// updates the state of the add-cart button wheter a size is selected or not
function updateAddToCartButton() {
  products.forEach((product) => {
    // select the sizes and the add-cart buttons
    let sizeInputs = product.querySelectorAll('input[name="size"]');
    let addToCartButton = product.querySelector(".add-cart");

    if (sizeInputs.length > 0 && addToCartButton) {
      let isSizeSelected = Array.from(sizeInputs).some(
        (input) => input.checked
      );

      // if a size is selected the class disabled is removed, otherwise it is added
      if (isSizeSelected) {
        addToCartButton.classList.remove("disabled");
      } else {
        addToCartButton.classList.add("disabled");
      }
    }
  });
}

// adds merch to the cart
function addCartItem() {
  // selects the main_container and the closest product-box
  let product = this.closest(".main_container") || this.closest(".product-box");
  if (!product) {
    return;
  }

  // selects the class product-title and gets the text content and assigns it to the title variable
  let title = product.querySelector(".product-title").innerHTML;

  // selects the class with
  let price = parseFloat(
    product.querySelector(".product-price").innerHTML.replace("$", "") || "0"
  );

  // selects the main_img--card and the img source and assign it to the imgSrc variable
  let imgSrc = product.querySelector(".merch_img--card img").src;

  // selects the size input that is checked, if it exists
  let sizeElement = product.querySelector('input[name="size"]:checked');
  let size = sizeElement ? sizeElement.nextElementSibling.innerHTML : null;

  // selects the quantity input
  let quantityElement = product.querySelector(".quantity");
  let quantity;

  // checks if the quantityElement exists it gets the value from the quantity input and coverts it to an int and assigns it to the quantity variable, otherwise it sets the quantity to 1
  if (quantityElement) {
    quantity = parseInt(quantityElement.value);
  } else {
    quantity = 1;
  }

  let newToAdd = {
    title,
    price,
    imgSrc,
    size,
    quantity,
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let existingItem = cart.find(
    (el) => el.title == newToAdd.title && el.size == newToAdd.size
  );
  if (existingItem) {
    existingItem.quantity = Math.min(existingItem.quantity + quantity, 10);
  } else {
    cart.push(newToAdd);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartDisplay();
  opensCart();
}

function updateCartDisplay() {
  const cartContent = document.querySelector(".cart-content");
  if (!cartContent) {
    return;
  }

  cartContent.innerHTML = "";

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.forEach((item) => {
    let cartBoxElement = CartBoxComponent(item);
    cartContent.innerHTML += cartBoxElement;
  });

  updateTotal();
  addEvents();
  updateTotalItems();
}

// retrieves the items in the cart from local storage 
function getTotalItems() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.reduce((total, item) => total + item.quantity, 0);
}

// function to show the total number of items in the cart
function updateTotalItems() {
  const totalItems = document.querySelector("#total-items");
  // checks if the totalItems element exists and updates the #total-items with the total number of items in the cart and if it doesnt exists it wont be updated
  if (totalItems) {
    totalItems.textContent = getTotalItems();
  }
}

function removeFromCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartBox = this.closest(".cart-box");
  let title = cartBox.querySelector(".cart-product-title").innerHTML;
  let sizeElement = cartBox.querySelector(".cart-size");
  let size = sizeElement ? sizeElement.innerHTML.split(": ")[1] : null;

  cart = cart.filter((el) => !(el.title == title && el.size == size));
  localStorage.setItem("cart", JSON.stringify(cart));

  cartBox.remove();
  updateTotal();
  updateTotalItems();
}

function updateTotal() {
  const totalElement = document.querySelector(".total-price");
  let total = 0;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.forEach((item) => {
    let price = item.price;
    let quantity = item.quantity;
    total += price * quantity;
  });

  // rounds the total to 2 decimal places
  total = total.toFixed(2);
  // adds the total to the total-price element with a $ sign
  totalElement.innerHTML = "$" + total;
}

function buyOrder() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length <= 0) {
    alert("Your cart is empty. Add some products first.");
    return;
  }
  localStorage.removeItem("cart");

  alert("Your order is placed successfully");

  let cartContent = document.querySelector(".cart-content");
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
    updateTotalItems();
  }

  updateTotal();
  closeCart();
}

function CartBoxComponent(item) {
  return `
         <div class="cart-box">
             <img src="${item.imgSrc}" alt="" class="cart-img">
             <div class="detail-box">
                 <div class="cart-product-info">
                     <div class="cart-product-title">${item.title}</div>
                     <div class="cart-price">$${item.price.toFixed(2)}</div>
                 </div>
                 ${item.size
      ? `<div class="cart-size">Size: ${item.size}</div>`
      : ""
    }
                 <div class="cart-quantity" data-quantity="${item.quantity
    }">Quantity: ${item.quantity}</div>
             </div>
             <i class="fa-regular fa-trash-can cart-remove"></i>
         </div>`;
}

function addEvents() {
  let cartRemove_btns = document.querySelectorAll(".cart-remove");
  cartRemove_btns.forEach((btn) => {
    btn.addEventListener("click", removeFromCart);
  });
}

initializeCart();