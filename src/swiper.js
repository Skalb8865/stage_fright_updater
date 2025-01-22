const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: false,
    speed: 700,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
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
        // 877: {
        //     slidesPerView: 2,
        // },
        // 1307: {
        //     slidesPerView: 3,
        // },
        // 1737: {
        //     slidesPerView: 4,
        // },

        877: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        1307: {
            slidesPerView: 3,
            spaceBetween: 25,
        },
        1737: {
            slidesPerView: 4,
            spaceBetween: 35,
        },


        // 640: {
        //     slidesPerView: 2,
        //     spaceBetween: 20,
        //   },
        //   768: {
        //     slidesPerView: 4,
        //     spaceBetween: 40,
        //   },
        //   1024: {
        //     slidesPerView: 5,
        //     spaceBetween: 50,
        //   },
    },
})

export default swiper;