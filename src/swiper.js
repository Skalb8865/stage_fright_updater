const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
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
            spaceBetween: 20,
        },
        1307: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        1737: {
            slidesPerView: 4,
            spaceBetween: 40,
        },
    },
})

export default swiper;