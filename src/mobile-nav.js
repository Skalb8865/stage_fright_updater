const mobileNav = () => {
    const headerBtn = document.querySelector('.header-bars');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    const closeBtn = document.querySelector('.closeBtn');    

    let isMobileNavOpen = false;

    headerBtn.addEventListener('click', () => {
        isMobileNavOpen = !isMobileNavOpen;
        if (isMobileNavOpen) {
            mobileNav.style.display = 'flex'
            headerBtn.style.display = 'none'
            closeBtn.style.display = 'block'
            document.body.style.overflowY = 'hidden';
            headerBtn.setAttribute('aria-expanded', 'true')
        }else{
            mobileNav.style.display = 'none'
            document.body.style.overflowY = 'auto';
            headerBtn.setAttribute('aria-expanded', 'false')
        }
    });

    closeBtn.addEventListener('click', () => {
        isMobileNavOpen = !isMobileNavOpen;
        if (isMobileNavOpen) {
            closeBtn.style.display = 'block'
            document.body.style.overflowY = 'hidden';
            headerBtn.setAttribute('aria-expanded', 'true')
        }else{
            mobileNav.style.display = 'none'
            closeBtn.style.display = 'none'
            document.body.style.overflowY = 'auto';
            headerBtn.setAttribute('aria-expanded', 'false')
           
            headerBtn.style.display = 'block';
        }
    });

    mobileLinks.forEach((link) => {
        link.addEventListener('click', () => {
            isMobileNavOpen = false;
            mobileNav.style.display = 'none'
            document.body.style.overflowY = 'auto';
            headerBtn.setAttribute('aria-expanded', 'false')
        });
    });
};

export default mobileNav;