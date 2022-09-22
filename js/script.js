"strict mode";

// const e = require("express");


window.addEventListener('DOMContentLoaded', () => {
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
        //i = 0 означає що це стандартне значення, яке буде вик. якщо не передати аргумент у функцію
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


    // MODAL

    const modalBtnOpen = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');

        // modal.classList.toggle('show');  Можна використовувати також такий варіант.

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

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-modalclose') == '') { // Через те що тут є e.target.getAttribute('data-modalclose') == '' хрестик в мод. вікні закриває форму
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
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
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
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;

    //         document.querySelector(parent).append(element);
    //     });
    // }

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
            <div class="modal__close" data-modalclose>×</div>
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
            numberOfCurrentSlide.textContent = n + 1;
        } else {
            numberOfCurrentSlide.textContent = `0${n + 1}`;
        }
        
    }
    showCurrent();

    function changeOpacityForDot(n = 1) {
        dotsArr.forEach(item => item.style.opacity = '.5');
        dotsArr[n].style.opacity = 1;
    }
    changeOpacityForDot();

    arrowOfNextSlier.addEventListener("click", () => {
        if(offset == +width.slice(0, width.length - 2) * (slideItem.length - 1)) {
            offset = 0;
            current = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
            current++;
        }
        
        sliderInner.style.transform = `translateX(-${offset}px)`;
        showCurrent(current);
        changeOpacityForDot(current);
    });

    arrowOfPrevSlier.addEventListener("click", () => {
        if(offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slideItem.length - 1);
            current = slideItem.length - 1;
        } else {
            offset -= +width.slice(0, width.length - 2);
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

            offset = +width.slice(0, width.length - 2) * (slideTo - 1);
            sliderInner.style.transform = `translateX(-${offset}px)`;

            changeOpacityForDot(slideTo);
            showCurrent(slideTo);

        });
    });

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
});


