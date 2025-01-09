// Selects the cart icon in the navbar, select the cart class and selects the X icon in the cart
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");

// The Class active changes the right property of .cart to 0 from -100% show that 
// it slides in from the right of the screen

// Adds the class active to .cart when cartIcon is clicked and removes the 
// class active when cartClose is clicked
cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

// Selects the hamburger menu icon in the navbar, the mobile nav and the X icon in the mobile-nav
const mobileNavIcon = document.querySelector("#mobile-nav--icon");
const mobileNav = document.querySelector(".mobile-nav");
const mobileNavClose = document.querySelector("#mobile-nav--close");

// Adds the class active to .mobile-nav when mobileNavIcon is clicked and removes the 
// class active when mobileNavClose is clicked
mobileNavIcon.addEventListener("click", () => mobileNav.classList.add("active"));
mobileNavClose.addEventListener("click", () => mobileNav.classList.remove("active"));

// Iterates thorugh each button with the class .add-to--cart
const addToCartButtons = document.querySelectorAll(".add-to--cart");
addToCartButtons.forEach(button => {
    // Adds an event listener to each button for when you click on the button
    button.addEventListener("click", event => {
        cart.classList.add("active");
        // localStorage.setItem(productBox);
    });
});