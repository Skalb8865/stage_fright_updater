const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

const mobileNavIcon = document.querySelector("#mobile-nav--icon");
const mobileNav = document.querySelector(".mobile-nav");
const mobileNavClose = document.querySelector("#mobile-nav--close");


mobileNavIcon.addEventListener("click", () => mobileNav.classList.add("active"));
mobileNavClose.addEventListener("click", () => mobileNav.classList.remove("active"));