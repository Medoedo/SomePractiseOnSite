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