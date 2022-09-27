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