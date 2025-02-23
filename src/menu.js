function toggleMenu() {
  const menu = document.getElementById('menu');
  const hamburger = document.getElementById('hamburger');
  const navCenterLeft = document.querySelector('.center-left');
  const navCenterRight = document.querySelector('.center-right');
  const body = document.body;

  menu.classList.toggle('active');
  hamburger.classList.toggle('open');

  const noScroll = window.innerWidth > 1;
  const isMenuOpen = menu.classList.contains('active');

  // Add event listener for window resize
  window.addEventListener('resize', () => {
    if (isMenuOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }
  });

  if (noScroll && isMenuOpen) {
    body.style.overflow = 'hidden';
    document.getElementById('cart-icon').style.pointerEvents = 'none';
    hamburger.setAttribute('aria-expanded', 'true');
    menu.removeAttribute('inert');
    setTimeout(() => {
      navCenterLeft.style.display = 'none';
      navCenterRight.style.display = 'none';
    }, 250);

  } else {
    body.style.overflow = 'auto';
    document.getElementById('cart-icon').style.pointerEvents = 'auto';
    hamburger.setAttribute('aria-expanded', 'false');
    menu.setAttribute('inert', '');
    setTimeout(() => {
      navCenterLeft.style.display = 'flex';
      navCenterRight.style.display = 'flex';
    }, 250);
  }


}

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  hamburger.addEventListener('click', toggleMenu);
  menu.setAttribute('inert', '');
});