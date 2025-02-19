document.addEventListener("DOMContentLoaded", () => {
  function toggleMenu() {
    const menu = document.getElementById('menu');
    const hamburger = document.getElementById('hamburger');
    menu.classList.toggle('active');
    hamburger.classList.toggle('open');

    const noScroll = window.innerWidth > 1;
    const isMenuOpen = menu.classList.contains("active");

    if (noScroll && (isMenuOpen)) {
      document.body.style.overflow = "hidden";
      document.getElementById("cart-icon").style.pointerEvents = "none";
      hamburger.setAttribute("aria-expanded", "true");
      menu.removeAttribute("inert");
    } else {
      document.body.style.overflow = "auto";
      document.getElementById("cart-icon").style.pointerEvents = "auto";
      hamburger.setAttribute("aria-expanded", "false");
      menu.setAttribute("inert", "");
    }
  }
});
