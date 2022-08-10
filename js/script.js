"strict mode";

// TABS

window.addEventListener('DOMContentLoaded', () => {

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

const deadline = '2022-08-20';
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
      modalBtnClose = document.querySelector('[data-modalClose]'),
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

modalBtnClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modal.classList.contains('show')) {
        closeModal();
    }
});

const modalTimerId = setTimeout(openModal, 3000);

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

new MenuOnDay(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    10,
    '.menu .container'
).render();


});


