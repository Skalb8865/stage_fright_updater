(function () {
    function initializeCart() {
        let cartIcon = document.querySelector("#cart-icon");
        let cart = document.querySelector(".cart");
        let closeCart = document.querySelector("#cart-close");
        let cartOverlay = document.querySelector(".cart-overlay");
        let openMobileNavIcon = document.querySelector("#mobile-nav--icon");
        let mobileNav = document.querySelector(".mobile-nav");
        let closeMobileNavIcon = document.querySelector("#nav-close");

        cartIcon?.addEventListener("click", () => {
            cart?.classList.add("active");
            cartOverlay?.classList.add("active");
        });

        closeCart?.addEventListener("click", () => {
            cart?.classList.remove("active");
            cartOverlay?.classList.remove("active");
        });

        cartOverlay?.addEventListener("click", () => {
            cart?.classList.remove("active");
            cartOverlay?.classList.remove("active");
            mobileNav.classList.remove("active");
        });

        openMobileNavIcon.addEventListener("click", () => {
            mobileNav.classList.add("active");
            cartOverlay.classList.add("active");
        });

        closeMobileNavIcon.addEventListener("click", () => {
            mobileNav.classList.remove("active");
            cartOverlay.classList.remove("active");
        });

        // Add these new lines
        function checkViewportWidth() {
            if (window.innerWidth >= 1025) {
                mobileNav.classList.remove("active");
                cartOverlay.classList.remove("active");
            }
        }

        // Call the function on page load
        checkViewportWidth();

        // Add event listener for window resize
        window.addEventListener('resize', checkViewportWidth);

        document.addEventListener("DOMContentLoaded", updateCartDisplay);

        let addToCartButtons = document.querySelectorAll(".add-cart");
        addToCartButtons.forEach(button => {
            button.addEventListener("click", handle_addCartItem);
        });

        let buyButton = document.querySelector(".btn-buy");
        buyButton?.addEventListener("click", handle_buyOrder);
    }

    function handle_addCartItem() {
        let product = this.closest('.main_container') || this.closest('.product-box');
        if (!product) return;

        let title = product.querySelector("h1")?.innerHTML || product.querySelector(".product-title")?.innerHTML;
        let price = parseFloat(product.querySelector("h2")?.innerHTML.replace('$', '') || product.querySelector(".product-price")?.innerHTML.replace('$', '') || '0');
        let imgSrc = product.querySelector(".merch_img--card img")?.src || product.querySelector(".product-img")?.src;

        let sizeElement = product.querySelector('input[name="size"]:checked');
        let size = sizeElement ? sizeElement.nextElementSibling.innerHTML : 'Default';

        let quantityElement = product.querySelector('.quantity');
        let quantity = quantityElement ? parseInt(quantityElement.value) : 1;

        if (!title || !imgSrc) {
            console.error('Required product information is missing');
            return;
        }

        let newToAdd = {
            title,
            price,
            imgSrc,
            size,
            quantity
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let existingItem = cart.find((el) => el.title == newToAdd.title && el.size == newToAdd.size);
        if (existingItem) {
            existingItem.quantity = Math.min(existingItem.quantity + quantity, 10);
        } else {
            cart.push(newToAdd);
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        updateCartDisplay();

        let cartElement = document.querySelector(".cart");
        let cartOverlayElement = document.querySelector(".cart-overlay");
        if (cartElement) cartElement.classList.add("active");
        if (cartOverlayElement) cartOverlayElement.classList.add("active");
    }

    function updateCartDisplay() {
        const cartContent = document.querySelector(".cart-content");
        if (!cartContent) return;

        cartContent.innerHTML = '';

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        cart.forEach(item => {
            let cartBoxElement = CartBoxComponent(item);
            cartContent.innerHTML += cartBoxElement;
        });

        updateTotal();
        addEvents();
    }

    function handle_removeCartItem() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let cartBox = this.closest('.cart-box');
        let title = cartBox.querySelector(".cart-product-title").innerHTML;
        let size = cartBox.querySelector(".cart-size").innerHTML.split(": ")[1];

        cart = cart.filter(el => !(el.title == title && el.size == size));
        localStorage.setItem('cart', JSON.stringify(cart));

        cartBox.remove();
        updateTotal();
    }

    function handle_changeItemQuantity() {
        let input = this;
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let cartBox = input.closest('.cart-box');
        let title = cartBox.querySelector(".cart-product-title").innerHTML;
        let size = cartBox.querySelector(".cart-size").innerHTML.split(": ")[1];
        let item = cart.find(el => el.title == title && el.size == size);

        if (item) {
            item.quantity = Math.max(1, Math.min(parseInt(input.value) || 1, 10));
            input.value = item.quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateTotal();
        }
    }

    function updateTotal() {
        let cartBoxes = document.querySelectorAll(".cart-box");
        const totalElement = document.querySelector(".total-price");
        let total = 0;
        cartBoxes.forEach((cartBox) => {
            let priceElement = cartBox.querySelector(".cart-price");
            let price = parseFloat(priceElement.innerHTML.replace("$", ""));
            let quantity = parseInt(cartBox.querySelector(".cart-quantity").value);
            total += price * quantity;
        });

        total = total.toFixed(2);
        totalElement.innerHTML = "$" + total;
    }

    function handle_buyOrder() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length <= 0) {
            alert("Your cart is empty. Add some products first.");
            return;
        }
        localStorage.removeItem('cart');

        alert("Your order is placed successfully :)");

        let cartContent = document.querySelector(".cart-content");
        while (cartContent.hasChildNodes()) {
            cartContent.removeChild(cartContent.firstChild);
        }
        updateTotal();

        document.querySelector(".cart").classList.remove("active");
        document.querySelector(".cart-overlay").classList.remove("active");
    }

    function CartBoxComponent(item) {
        return `
        <div class="cart-box">
            <img src="${item.imgSrc}" alt="" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">${item.title}</div>
                <div class="cart-price">$${item.price.toFixed(2)}</div>
                <div class="cart-size">Size: ${item.size}</div>
                <div class="cart-quantity-wrapper">
                    <button class="cart-quantity-btn minus">-</button>
                    <input type="number" value="${item.quantity}" class="cart-quantity" min="1" max="10" disabled>
                    <button class="cart-quantity-btn plus">+</button>
                </div>
            </div>
            <i class="fa-regular fa-trash-can cart-remove"></i>
        </div>`;
    }

    function addEvents() {
        let quantityInputs = document.querySelectorAll(".cart-quantity");
        quantityInputs.forEach((input) => {
            input.addEventListener("change", handle_changeItemQuantity);
        });

        let quantityBtns = document.querySelectorAll(".cart-quantity-btn");
        quantityBtns.forEach(btn => {
            btn.addEventListener("click", handle_quantityButtonClick);
        });

        let cartRemove_btns = document.querySelectorAll(".cart-remove");
        cartRemove_btns.forEach((btn) => {
            btn.addEventListener("click", handle_removeCartItem);
        });
    }

    function handle_quantityButtonClick() {
        let input = this.parentElement.querySelector('.cart-quantity');
        let value = parseInt(input.value);
        if (this.classList.contains('minus')) {
            value = Math.max(1, value - 1);
        } else if (this.classList.contains('plus')) {
            value = Math.min(10, value + 1);
        }
        input.value = value;
        handle_changeItemQuantity.call(input);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeCart);
    } else {
        initializeCart();
    }
})();