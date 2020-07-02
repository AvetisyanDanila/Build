// Активный класс у меню и плавная прокрутка для ХЕДЕРА
'use strict';
const headerHeight = document.querySelector('.header').offsetHeight;

function smoothScroll(target, duration) {
    var target = document.querySelector(target);
    var targetPosition = target.getBoundingClientRect().top;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - headerHeight + 80;
    var startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

class NavigationMenu {
    constructor(root) {
        this.root = root;
        this.links = null;
        this.cacheNodes();
        this.bindEvents();
    }

    cacheNodes() {
        this.links = this.root.querySelectorAll('.js-page-scroll');
    }

    bindEvents() {
        document.addEventListener('click', (event) => {
            const target = event.target;

            if (target.classList.contains('js-page-scroll')) {
                event.preventDefault();
                const id = target.hash;

                smoothScroll(id, 1000);
            }
        });

        window.addEventListener("scroll", event => {
            let fromTop = window.scrollY + headerHeight;

            this.links.forEach(link => {
                let section = document.querySelector(link.hash);

                if (
                    section.offsetTop <= fromTop &&
                    section.offsetTop + section.offsetHeight > fromTop
                ) {
                    link.classList.add("menu__link_active");
                } else {
                    link.classList.remove("menu__link_active");
                }
            });
        });
    }
}

const menuNode = document.querySelector('.js-nav-menu');
const Menu = new NavigationMenu(menuNode);
//Плавная прокрутка и подсветка активного пункта меню
$("body").on('click', '[href*="#"]', function (e) {
    var fixed_offset = 0;
    $('html,body').stop().animate({
        scrollTop: $(this.hash).offset().top - fixed_offset
    }, 1000);
    e.preventDefault();
});
// Затемнение хедера при скролле
window.onscroll = function showHeader() {

    var header = document.querySelector('.header');

    if (window.pageYOffset > 1) {
        header.classList.add('active')
    } else {
        header.classList.remove('active')
    }

}
// Слайдер(Projects)
var swiper1 = new Swiper('.projects-swiper', {
    slidesPerView: 1,
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
        },
    },
    spaceBetween: 30,
    loop: true,
    navigation: {
        nextEl: '.projects__arrow_next',
        prevEl: '.projects__arrow_prev',
    },
    simulateTouch: false
});
// Слайдер(Reviews)
var swiper1 = new Swiper('.reviews-swiper', {
    slidesPerView: 1,
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
        },
    },
    spaceBetween: 30,
    loop: true,
    navigation: {
        nextEl: '.reviews__arrow_next',
        prevEl: '.reviews__arrow_prev',
    },
    simulateTouch: false
});
// Слайдер(Partners)
var swiper1 = new Swiper('.partners-swiper', {
    slidesPerView: 2,
    breakpoints: {
        768: {
            slidesPerView: 3,
            spaceBetween: 65
        },
        992: {
            slidesPerView: 5,
        },
    },
    spaceBetween: 30,
    loop: true,
});
// Вопрос - Ответ
$(document).ready(function () {
    $(".faq-block__title").click(function (e) {
        if ($(".faq-block").hasClass("slide")) {
            $(".faq-block__title").not($(this)).removeClass("active");
            $(".faq-block__text").not($(this).next()).slideUp(300);
        }
        $(this).toggleClass("active").next().slideToggle(300);
    });
});
// POPUP
// открыть по кнопке
$('.js-button-campaign').click(function () {
    $('.js-overlay-campaign').fadeIn();
    $("#body").addClass("lock");
});

// закрыть на крестик
$('.js-close-campaign').click(function () {
    $('.js-overlay-campaign').fadeOut();
    $("#body").removeClass("lock");
});
// Меню и бургер для телефонов
$(document).ready(function () {
    $(".header-burgerblock").click(function (e) {
        $(".header__burger, .menu").toggleClass("active");
        $("body").toggleClass('lock');
    });
    $(".menu__item").click(function (e) {
        $(".header__burger").removeClass("active");
        $(".menu").removeClass("active");
        $("body").removeClass("lock");
    });
});