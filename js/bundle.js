/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc() {
    // CALC

    const calcValue = document.querySelector(".calculating__result span");

    let sex, weight, height, age, ratio;

    if(localStorage.getItem("sex")) {
        sex = localStorage.getItem("sex");
    } else {
        sex = "female";
        localStorage.setItem("sex", sex);
    }

    if(localStorage.getItem("ratio")) {
        ratio = localStorage.getItem("ratio");
    } else {
        ratio = 1.375;
        localStorage.setItem("ratio", ratio);
    }

    // function initSettingsStorage(selector, classActive) {
    //     const elemets = document.querySelectorAll(selector);

    //     elemets.forEach(elem => {
    //         elem.addEventListener("click", (e) => {
    //             if(e.target.getAttribute("id") === localStorage.getItem("sex")) {
    //                 sex = localStorage.getItem("sex");
    //             }

    //             if(e.target.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
    //                 ratio = localStorage.getItem("ratio");
    //             }

    //             elemets.forEach(elem => {
    //                 elem.classList.remove(classActive);
    //             });

    //             e.target.classList.add(classActive);
    //         });
    //     });
    // }

    function initSettingsStorage(selector, classActive) {
        const elemets = document.querySelectorAll(selector);

        elemets.forEach(elem => {
            elem.classList.remove(classActive);

            if(elem.getAttribute("id") === localStorage.getItem("sex")) {
                sex = localStorage.getItem("sex");
                elem.classList.add(classActive);
            }

            if(elem.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
                ratio = localStorage.getItem("ratio");
                elem.classList.add(classActive);
            } 
        });
    }

    initSettingsStorage("#gender div", 'calculating__choose-item_active');
    initSettingsStorage(".calculating__choose_big div", 'calculating__choose-item_active');

    function calculating() {
        if(!sex || !weight || !height || !age || !ratio) {
            calcValue.textContent = '____';
            return;
        }

        if (sex === "female") {
            calcValue.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            calcValue.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calculating();

    function getStaticInformation(selector, classActive) {
        const elemets = document.querySelectorAll(selector);

        elemets.forEach(item => {
            item.addEventListener("click", (e) => {
                if(e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elemets.forEach(e => {
                    e.classList.remove(classActive);
                });

                e.target.classList.add(classActive);

                calculating();
            });
        });
    }
    
    getStaticInformation("#gender div", 'calculating__choose-item_active');
    getStaticInformation(".calculating__choose_big div", 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener("input", () => {

            if(input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = "none";
            }

            switch(input.getAttribute("id")) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }

            calculating();
        });
    }

    getDynamicInformation("#age");
    getDynamicInformation("#height");
    getDynamicInformation("#weight");
}

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {
    // CLASSES

    class MenuOnDay {
        constructor (src, alt, title, desc, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this. title = title;
            this.desc = desc;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 36;
            this.changeToUAH();

        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const item = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = 'menu__item';
                item.classList.add(this.classes);
            } else {
                this.classes.forEach(className => item.classList.add(className));
            }

            item.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.desc}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">????????:</div>
                    <div class="menu__item-total"><span>${this.price}</span> ??????/????????</div>
                </div>
            `;
            this.parent.append(item);
        }
    }

    const getData = async (url) => {
        const res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    const parent = ".menu .container";
    getData("http://localhost:3000/menu")
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuOnDay( img, altimg, title, descr, price, parent).render();
            });
        });

    //
    // There is another way to create elemets 
    //

    // getData("http://localhost:3000/menu")
    //     .then(data => menuOfDay(data));

    // function menuOfDay(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');
    //         price = price * 40;
    //         element.classList.add('menu__item');
    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">????????:</div>
    //                 <div class="menu__item-total"><span>${price}</span> ??????/????????</div>
    //             </div>
    //         `;

    //         document.querySelector(parent).append(element);
    //     });
    // }
}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
    // FORMS

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/forms/spinner.svg',
        success: 'rdy',
        failure: 'Error'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
                           
            postData("http://localhost:3000/requests", json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                
                statusMessage.remove();
            })
            .catch(() => {
                showThanksModal(message.failure);
            })
            .finally(() => {
                form.reset();
            });
        });
    }


    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();
        
        const thanksMessage = document.createElement('div');
        thanksMessage.classList.add('modal__dialog');
        thanksMessage.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-modalclose>??</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksMessage);
        setTimeout(()=> {
            thanksMessage.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
            
        }, 4000);
    }
}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {
    // MODAL

    const modalBtnOpen = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');

        // modal.classList.toggle('show');  ?????????? ?????????????????????????????? ?????????? ?????????? ??????????????.

        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modalBtnOpen.forEach(item => {
        item.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');

        // modal.classList.toggle('show');

    document.body.style.overflow = 'scroll';
    }

    // ?????????? ???? ???? ?????? ?? e.target.getAttribute('data-modalclose') == '' 
    // ?????????????? ?? ??????. ?????????? ???????????????? ??????????
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-modalclose') == '') { 
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() {
    //SLIDER

    const slideItem = document.querySelectorAll(".offer__slide"),
          slider = document.querySelector('.offer__slider'),
          numberOfCurrentSlide = document.querySelector("#current"),
          numberOfTotalSlides = document.querySelector("#total"),
          arrowOfPrevSlier = document.querySelector('.offer__slider-prev'),
          arrowOfNextSlier = document.querySelector('.offer__slider-next'),
          sliderWrapper = document.querySelector('.offer__slider-wrapper'),
          sliderInner = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(sliderWrapper).width;

    let offset = 0,
        current = 0;

    if(slideItem.length < 10) {
        numberOfTotalSlides.textContent = `0${slideItem.length}`;
    } else {
        numberOfTotalSlides.textContent = slideItem.length;
    }

    sliderInner.style.width = 100 * slideItem.length + '%';
    sliderInner.style.display = "flex";
    sliderInner.style.transition = "0.5s all";
    
    sliderWrapper.style.overflow = 'hidden';

    slideItem.forEach(item => item.style.width = width);

    function showCurrent(n = 0) {
        if(n > 8) {
            numberOfCurrentSlide.textContent = +n + 1;
        } else {
            numberOfCurrentSlide.textContent = `0${+n + 1}`;
        }
    }
    showCurrent();

    function getOnlyDig(str) {
        return str.replace(/\D/g, '');
    }

    arrowOfNextSlier.addEventListener("click", () => {
        if(offset == +getOnlyDig(width) * (slideItem.length - 1)) {
            offset = 0;
            current = 0;
        } else {
            offset += +getOnlyDig(width);
            current++;
        }
        
        sliderInner.style.transform = `translateX(-${offset}px)`;
        showCurrent(current);
        changeOpacityForDot(current);
    });

    arrowOfPrevSlier.addEventListener("click", () => {
        if(offset == 0) {
            offset = +getOnlyDig(width) * (slideItem.length - 1);
            current = slideItem.length - 1;
        } else {
            offset -= +getOnlyDig(width);
            current--;
        }
        
        sliderInner.style.transform = `translateX(-${offset}px)`;
        showCurrent(current);
        changeOpacityForDot(current);
    });

    const dotCarousel = document.createElement('ol');
    dotCarousel.classList.add('carousel-indicators');
    dotCarousel.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.style.position = 'relative';
    slider.append(dotCarousel);

    let dotsArr = [];
    
    for(let i = 0; i < slideItem.length; i++) {
        const dot = document.createElement('li');
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        dot.setAttribute('data-slide-to', i);

        dotCarousel.append(dot);
        dotsArr.push(dot);

        if(i == 0) {
            dotsArr[i].style.opacity = 1;
        }      
    }

    dotsArr.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            current = slideTo;

            offset = +getOnlyDig(width) * (slideTo);
            sliderInner.style.transform = `translateX(-${offset}px)`;

            changeOpacityForDot(slideTo);
            showCurrent(slideTo);

        });
    });

    function changeOpacityForDot(n = 0) {
        dotsArr.forEach(item => item.style.opacity = '.5');
        dotsArr[n].style.opacity = 1;
    }

    // function hideSlide() {
    //     slideItem.forEach (slide => {
    //         slide.classList.add('hide');
    //         slide.classList.remove('show');
    //     });
    // }

    // function showSlide(i = 0) {
    //     slideItem[i].classList.add('show');
    //     slideItem[i].classList.remove('hide');

    //     numberOfCurrentSlide.innerHTML = `0${i+1}`;
    // }
    
    // function slider() {
    //     let current = 0,
    //         total = slideItem.length;

    //     if(total < 10) {
    //         numberOfTotalSlides.innerHTML = `0${total}`;
    //     } else {
    //         numberOfTotalSlides.innerHTML = `${total}`;
    //     }  
        
    //     arrowOfNextSlier.addEventListener('click', () => {    
    //         if(current <= total - 2) {
    //             current += 1;
    //         } else {
    //             current = 0;
    //         }
    
    //         hideSlide();
    //         showSlide(current);
    //     });
    
    //     arrowOfPrevSlier.addEventListener('click', () => {
    //         if(current <= 0) {
    //             current = total - 1;
    //         } else {
    //             current -= 1;
    //         }
    
    //         hideSlide();
    //         showSlide(current);
    //     });
    // }
    // slider();
    // hideSlide();
    // showSlide();
}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
    // TABS

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');
    
    function hideTabContent() {

        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade'); //fade - animation
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }    

    function showTabContent(i = 0) { 
        //i = 0 ?????????????? ???? ???? ???????????????????? ????????????????, ?????? ???????? ??????. ???????? ???? ???????????????? ???????????????? ?? ??????????????
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
// TIMER

const deadline = '2023-01-01';
function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());

    if (t <= 0 ) {
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
    } else {
        days = Math.floor(t / (1000 * 60 * 60 * 24));
        hours = Math.floor(t / (1000 * 60 * 60) % 24);
        minutes = Math.floor((t / 1000 / 60) % 60);
        seconds = Math.floor((t / 1000) % 60);
    }

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function getZero(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}


function setClock(selector, endtime) {

    const timer = document.querySelector(selector),
        days = timer.querySelector("#days"),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
        const t = getTimeRemaining(endtime);

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }
}

setClock('.timer', deadline);
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
"strict mode";

// const e = require("express");


window.addEventListener('DOMContentLoaded', () => {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
          slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
          modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
          forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
          cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
          calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");

    tabs();
    timer();
    slider();
    modal();
    forms();
    cards();
    calc();
});



})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map