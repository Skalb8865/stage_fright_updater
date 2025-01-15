document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');
    const cart = document.querySelector('.cart');
    const closeCart = document.querySelector('#cart-close');
    const cartOverlay = document.querySelector('.cart-overlay');
    const checkoutButton = document.querySelector('.btn-buy');
    const openModalButton = document.getElementById('open-modal');
    const closeModalButton = document.getElementById('close-modal');
    const dialog = document.getElementById('dialog');

    // adds the class active to the cart when the cart icon is clicked
    cartIcon.addEventListener('click', () => {
        cart.classList.add('active');
        cartOverlay.classList.add('active');
    });

    // removes the class active from the cart when the close icon is clicked
    closeCart.addEventListener('click', () => {
        cart.classList.remove('active');
        cartOverlay.classList.remove('active');
    });

    // removes the class active from the cart when the overlay is clicked
    cartOverlay.addEventListener('click', () => {
        cart.classList.remove('active');
        cartOverlay.classList.remove('active');
    });

    // opens the modal when the image is clicked
    if (openModalButton) {
        openModalButton.addEventListener('click', () => {
            dialog.showModal();
        });
    }

    // closes the modal when the close button is clicked
    if (closeModalButton) {
        closeModalButton.addEventListener('click', () => {
            dialog.close();
        });
    }

    // redirects to the checkout page when the checkout button is clicked
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            location.href = 'checkout.html';
        });
    }

    // starts the cart functionality
    start();
});

// =============== START ====================
function start() {
    updateCartDisplay();
    addEvents();
}

// ============= HANDLE EVENTS FUNCTIONS =============
function handle_addCartItem() {
    let product = document.querySelector('.main_container');
    let title = product.querySelector('.merchcontent h1').innerHTML;
    let price = parseFloat(product.querySelector('.merch_content h2').innerHTML.replace('$', ''));
    let imgSrc = product.querySelector('.main_img--card img').src;
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
    document.querySelector('.cart').classList.add('active');
    document.querySelector('.cart-overlay').classList.add('active');
}

// ============= UPDATE & RERENDER ===========
function updateCartDisplay() {
    const cartContent = document.querySelector('.cart-content');
    cartContent.innerHTML = '';

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.forEach(item => {
        let cartBoxElement = CartBoxComponent(item.title, item.price, item.imgSrc, item.size, item.quantity);
        let newNode = document.createElement('div');
        newNode.innerHTML = cartBoxElement;
        cartContent.appendChild(newNode);
    });

    updateTotal();
    addEvents();
}

function updateTotal() {
    let cartBoxes = document.querySelectorAll('.cart-box');
    const totalElement = document.querySelector('.cart .total-price');
    let total = 0;
    cartBoxes.forEach((cartBox) => {
        // gets the price of each item that is in the cart and multiplies it by its quantity then adds it to the total
        let priceElement = cartBox.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace('$', ''));
        let quantity = parseInt(cartBox.querySelector('.cart-quantity').textContent.replace('Quantity: ', ''));
        total += price * quantity;
    });

    // rounds the total to 2 decimal places
    total = total.toFixed(2);
    // adds the total to the .total-price element + a $ sign
    totalElement.innerHTML = '$' + total;
}

// =============== ADD EVENTS ===============
function addEvents() {
    // removes items from cart
    let cartRemove_btns = document.querySelectorAll('.cart-remove');
    cartRemove_btns.forEach((btn) => {
        btn.addEventListener('click', handle_removeCartItem);
    });

    // adds items to cart
    let addCartButtons = document.querySelectorAll('.add-cart');
    addCartButtons.forEach((btn) => {
        btn.addEventListener('click', handle_addCartItem);
    });

    // changes item quantity
    // (this part is commented out since you don't want to change quantity in the cart)
    // let cartQuantity_inputs = document.querySelectorAll('.cart-quantity');
    // cartQuantity_inputs.forEach((input) => {
    //     input.addEventListener('change', handle_changeItemQuantity);
    // });
}

function handle_removeCartItem() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let title = this.parentElement.querySelector('.cart-product-title').innerHTML;
    let size = this.parentElement.querySelector('.cart-size').innerHTML.split(': ')[1];
    
    cart = cart.filter(el => !(el.title == title && el.size == size));
    localStorage.setItem('cart', JSON.stringify(cart));
    
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
        <i class='ri-delete-bin-line cart-remove'></i>
    </div>`;
}