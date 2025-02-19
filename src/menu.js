function toggleMenu() {
  const menu = document.getElementById('menu');
  const hamburger = document.getElementById('hamburger');
  // const navLeftSection = document.querySelector('.nav-right--section');
  // const navRightSection = document.querySelector('.nav-left--section');
  const navCenterLeft = document.querySelector('.center-left');
  // const navCenter = document.querySelector('.nav-center--section');
  const navCenterRight = document.querySelector('.center-right');
  menu.classList.toggle('active');
  hamburger.classList.toggle('open');


  const noScroll = window.innerWidth > 1;
  const isMenuOpen = menu.classList.contains("active");

  if (noScroll && (isMenuOpen)) {
    document.body.style.overflow = "hidden";
    document.getElementById("cart-icon").style.pointerEvents = "none";
    hamburger.setAttribute("aria-expanded", "true");
    menu.removeAttribute("inert");
    // navRightSection.style.zIndex = "9002"
    // navLeftSection.style.zIndex = "9002"
    // navCenter.style.zIndex = "9002"
    setTimeout(() => {
      navCenterLeft.style.display = 'none';
      navCenterRight.style.display = 'none';
    }, 250);
  } else {
    document.body.style.overflow = "auto";
    document.getElementById("cart-icon").style.pointerEvents = "auto";
    hamburger.setAttribute("aria-expanded", "false");
    menu.setAttribute("inert", "");
    setTimeout(() => {
      navCenterLeft.style.display = 'flex';
      navCenterRight.style.display = 'flex';
    }, 250);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  hamburger.addEventListener('click', toggleMenu);
});

