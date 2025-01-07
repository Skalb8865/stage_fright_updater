const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => cart.classList.add("active"),
    cartIcon.setAttribute('aria-expanded', 'true'));
cartClose.addEventListener("click", () => cart.classList.remove("active"),
    cartIcon.setAttribute('aria-expanded', 'false'));

const mobileNavIcon = document.querySelector("#mobile-nav--icon");
const mobileNav = document.querySelector(".mobile-nav");
const mobileNavClose = document.querySelector("#mobile-nav--close");


mobileNavIcon.addEventListener("click", () => mobileNav.classList.add("active"),
    mobileNavIcon.setAttribute('aria-expanded', 'true'));
mobileNavClose.addEventListener("click", () => mobileNav.classList.remove("active"),
    mobileNavIcon.setAttribute('aria-expanded', 'false'));