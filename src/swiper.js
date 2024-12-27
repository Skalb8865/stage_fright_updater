const swiper = new Swiper('.swiper', {
    spaceBetween: 20,
    loop: false,
    speed: 700,
    // autoplay: {
    //     delay: 2000,
    //     disableOnInteraction: false,
    // },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    breakpoints: {
        877: {
            slidesPerView: 2,
        },
        1307: {
            slidesPerView: 3,
        },
        1737: {
            slidesPerView: 4,
        },
    },
})

export default swiper;