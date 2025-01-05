const openSidebarButton = document.getElementById('open-sidebar-button');
const closeSidebarButton = document.getElementById('close-sidebar-button');
const overlayClose = document.getElementById('overlay');
const navbar = document.getElementById('navbar');

const media = window.matchMedia("(width < 700px)")

media.addEventListener('change', (e) => updateNavbar(e))

function updateNavbar(e){
  const isMobile = e.matches
  console.log(isMobile)
  if(isMobile){
    navbar.setAttribute('inert', '')
  }
  else{
    // desktop device
    navbar.removeAttribute('inert')
  }
}

openSidebarButton.addEventListener('click', function() {
    navbar.classList.add('show');
    openSidebarButton.setAttribute('aria-expanded', 'true')
    navbar.removeAttribute('inert')
});

closeSidebarButton.addEventListener('click', function() {
  navbar.classList.remove('show')
  closeSidebarButton.setAttribute('aria-expanded', 'false')
  navbar.setAttribute('inert', '')
});

overlayClose.addEventListener('click', function() {
  navbar.classList.remove('show')
  overlayClose.setAttribute('aria-expanded', 'false')
  navbar.setAttribute('inert', '')
});

updateNavbar(media)