function modal() {
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

    // Через те що тут є e.target.getAttribute('data-modalclose') == '' 
    // хрестик в мод. вікні закриває форму
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