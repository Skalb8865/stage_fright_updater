const slider = () => {
    const openBtn = document.querySelector('.open-modal');
    const dialog = document.querySelector('#dialog');
    const closeBtn = document.querySelector('#close-modal');

    openBtn.addEventListener('click', () => dialog.showModal());
    closeBtn.addEventListener('click', () => dialog.close());

    // close modal when clicking outside
    dialog.addEventListener('click', event => {
        const rect = dialog.getBoundingClientRect();
        const isInDialog =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom;

        if (!isInDialog) {
            dialog.close();
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        const container = document.querySelector('.test-container');
        const scrollLeftBtn = document.getElementById('scroll-left');
        const scrollRightBtn = document.getElementById('scroll-right');

        // Amount to scroll by (adjust as needed)
        const scrollAmount = 400;

        scrollLeftBtn.addEventListener('click', () => {
            container.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        scrollRightBtn.addEventListener('click', () => {
            container.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    });
}

export default slider;
