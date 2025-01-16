// selects the cart icon in the navbar, the cart and the cart close button
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");
const cartOverlay = document.querySelector(".cart-overlay");

// adds the class active to the cart when the cart icon is clicked
cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
    cartOverlay.classList.add("active");
});

// removes the class active from the cart when the close icon is clicked
closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
    cartOverlay.classList.remove("active");
});

cartOverlay.addEventListener("click", () => {
    cart.classList.remove("active");
    cartOverlay.classList.remove("active");
});

// starts when the document is ready
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", start);
} else {
    start();
}

// =============== START ====================
function start() {
    updateCartDisplay();
}

// ============= UPDATE & RERENDER ===========
function update() {
    updateTotal();
}

// =============== ADD EVENTS ===============
function addEvents() {
    // removes items from cart
    let cartRemove_btns = document.querySelectorAll(".cart-remove");
    cartRemove_btns.forEach((btn) => {
        btn.addEventListener("click", handle_removeCartItem);
    });

    // changes item quantity
    let minusButtons = document.querySelectorAll(".quantity-btn.minus");
    let plusButtons = document.querySelectorAll(".quantity-btn.plus");
    minusButtons.forEach((btn) => {
        btn.addEventListener("click", handle_decreaseQuantity);
    });
    plusButtons.forEach((btn) => {
        btn.addEventListener("click", handle_increaseQuantity);
    });

    // adds item to cart
    let addCart_btns = document.querySelectorAll(".add-cart");
    addCart_btns.forEach((btn) => {
        btn.addEventListener("click", handle_addCartItem);
    });

    // buy Order
    const buy_btn = document.querySelector(".btn-buy");
    buy_btn.addEventListener("click", handle_buyOrder);
}

// ============= HANDLE EVENTS FUNCTIONS =============
function handle_addCartItem() {
    let product = this.closest('.product-box');
    let title = product.querySelector(".product-title").innerHTML;
    let price = parseFloat(product.querySelector(".product-price").innerHTML.replace('$', ''));
    let imgSrc = product.querySelector(".product-img").src;
    let size = document.querySelector('input[name="size"]:checked').nextElementSibling.innerHTML;
    let quantity = parseInt(document.getElementById('quantity').value);

    let newToAdd = {
        title,
        price,
        imgSrc,
        size,
        quantity
    };

    // handles if the item has already been added to the cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingItem = cart.find((el) => el.title == newToAdd.title && el.size == newToAdd.size);
    if (existingItem) {
        if (existingItem.quantity >= 10) {
            alert("You already have the maximum of 10 items in the cart.");
            return;
        }
        // if item has already been added, then increase the item quantity by the selected quantity to a max of 10
        existingItem.quantity = Math.min(existingItem.quantity + quantity, 10);
    } else {
        // if item isn't already in the cart, then add the item to the cart
        cart.push(newToAdd);
    }

    // saves the current items in the cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // updates the cart display
    updateCartDisplay();

    // opens the cart when adding an item to the cart
    cart.classList.add("active");
    cartOverlay.classList.add("active");

    // closes the modal
    document.getElementById('dialog').close();
}

function updateCartDisplay() {
    const cartContent = document.querySelector(".cart-content");
    cartContent.innerHTML = '';

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.forEach(item => {
        let cartBoxElement = CartBoxComponent(item.title, item.price, item.imgSrc, item.size, item.quantity);
        let newNode = document.createElement("div");
        newNode.innerHTML = cartBoxElement;
        cartContent.appendChild(newNode);
    });

    updateTotal();
    addEvents();
}

function handle_removeCartItem() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let title = this.parentElement.querySelector(".cart-product-title").innerHTML;
    let size = this.parentElement.querySelector(".cart-size").innerHTML.split(": ")[1];
    
    cart = cart.filter(el => !(el.title == title && el.size == size));
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartDisplay();
}

function updateCartItem(button, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let title = button.closest('.cart-box').querySelector(".cart-product-title").innerHTML;
    let item = cart.find(el => el.title == title);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    updateTotal();
}

function updateTotal() {
    let cartBoxes = document.querySelectorAll(".cart-box");
    const totalElement = document.querySelector(".cart .total-price");
    let total = 0;
    cartBoxes.forEach((cartBox) => {
        // gets the price of each item that is in the cart and multiplies it by its quantity then adds it to the total
        let priceElement = cartBox.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerHTML.replace("$", ""));
        let quantity = parseInt(cartBox.querySelector(".cart-quantity").textContent.replace("Quantity: ", ""));
        total += price * quantity;
    });

    // rounds the total to 2 decimal places
    total = total.toFixed(2);
    // adds the total to the .total-price element + a $ sign
    totalElement.innerHTML = "$" + total;
}

function handle_buyOrder() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length <= 0) {
        // shows the modal
        let modal = document.getElementById("orderModal");
        modal.style.display = "block";

        // closes the modal when clicking on the x
        let span = document.getElementsByClassName("close")[0];
        span.onclick = function () {
            modal.style.display = "none";
        }

        // closes the modal when clicking outside of it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        return;
    }
    localStorage.removeItem('cart');

    // opens the checkout page
    location.href = "checkout.html";

    // closes the cart
    cart.classList.remove("active");

    updateCartDisplay();
}

// ============= HTML COMPONENTS =============
function CartBoxComponent(title, price, imgSrc, size, quantity) {
    // outputs the HTML for each item that gets added to the cart (title, price, img, size, and its quantity)
    return `
    <div class="cart-box">
        <img src="${imgSrc}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="price-section">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">$${price.toFixed(2)}</div>
            </div>
            <div class="cart-size">Size: ${size}</div>
            <div class="cart-quantity">Quantity: ${quantity}</div>
        </div>
        <i class='bx bxs-trash-alt cart-remove'></i>
    </div>`;
}