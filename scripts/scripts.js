'use strict'

document.addEventListener("DOMContentLoaded", () => {

    /*  1. Создание модального окна для при входе и регистрации на сайте
    *
    *   Алгоритм
    *
    *   1. Начало.
    *   2. Получаем все элементы текста на странице
    *   3. Проверка условия: массив пустой или нет.
    *       3.1. Да: Конец.
    *       3.2. Нет: Проверка условий (навешиваем слушатели событий на действии click): если нажали на кнопку регистрации или входа.
    *           3.2.1. Да: Открыть модальное окно.
    *               3.2.1.1. Проверка условия (навешиваем слушатель собтий на закрытие модального окна): если нажали на знак "крестик".
    *                   3.2.1.1.1. Да: Скрыть модальное окно.
    *                   3.2.1.1.2. Нет: Оставлять модальное окно открытым.
    *           3.2.2. Нет: Конец.
    *   4. Конец
    * 
    *   Блок-схема: images/Block-schema.png
    */

    // Получаем элементы
    const loginButton = document.getElementById('loginButton');
    const registerButton = document.getElementById('registerButton');
    const modal = document.getElementById('authModal');
    const overlay = document.getElementById('modalOverlay');
    const closeModalBtn = document.getElementById('closeModal');

    // Функция открытия модального окна
    function openModal() {
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
        // Блокируем прокрутку страницы
        document.body.style.overflow = 'hidden';
    }

    // Функция закрытия модального окна
    function closeModal() {
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
        // Разблокируем прокрутку страницы
        document.body.style.overflow = '';
    }

    // Навешиваем обработчики на кнопки
    loginButton.addEventListener('click', openModal);
    registerButton.addEventListener('click', openModal);

    // Закрытие по крестику
    closeModalBtn.addEventListener('click', closeModal);

    // Закрытие по клику на overlay
    overlay.addEventListener('click', closeModal);

    // (Необязательно) Закрытие по клавише Esc
    document.addEventListener('keydown', function (event) {
        if (!modal.classList.contains('hidden') && event.key === 'Escape') {
            closeModal();
        }
    });


    /* 2. Создание слайдера в секции Галерея */ 
    // Переменная, которая хранит текущий индекс первой карточки, отображаемой в слайдере. Изначально она равна 0, что означает, что первая карточка будет видна.
    let currentIndex = 0;

    //Объявляем переменную slider и сохраняем в нее все элементы на странице с классом treners__item
    const slider = document.querySelectorAll(".gallery__item");
    // объявляем переменную prevButton и сохраняем в нее кнопку для перехода к предыдущей группе карточек
    const prevButton = document.querySelector(".gallery__left");
    // объявляем переменную nextButton и сохраняем в нее кнопку для перехода к следующей группе карточек
    const nextButton = document.querySelector(".gallery__right");
    //объявлем переменную для хранения количества отображаемых карточек
    const visibleCards = 3;
    // Вызываем функцию updateSlider() для первоначальной настройки отображения карточек. 
    updateSlider();

    //Для кнопки «предыдущий» добавляем обработчик события клика по этой кнопке:
    prevButton.addEventListener("click", () => {
        // Если индекс у карточки (currentIndex) больше 0, то уменьшаем его на 1, чтобы показать предыдущую карточку.
        if (currentIndex > 0) {
            currentIndex--;
        }
        // Иначе переход к последним карточкам, если мы уже находимся на первой 
        else {
            currentIndex = slider.length - visibleCards;
        }
        //Теперь нужно обновить отображение карточек на экране, вызвав функцию updateSlider:
        updateSlider();
    });

    // Для кнопки «следующий» добавляем обработчик события клика по этой кнопке:
    nextButton.addEventListener("click", () => {
        // Если индекс у карточки (currentIndex) меньше, чем индекс первой карточки в последней группе, то мы можем увеличить currentIndex на 1 и перейти к следующей карточке
        if (currentIndex < slider.length - visibleCards) {
            currentIndex++;
        }
        // Иначе если индекс у карточки (currentIndex) больше 0, то уменьшаем его на 1, чтобы показать предыдущую карточку.
        else {
            currentIndex = 0; // Переход к началу карточек
        }
        //Теперь нужно обновить отображение карточек на экране, вызвав функцию updateSlider:
        updateSlider();
    });

    // Создаем функцию, которая отвечает за обновление отображения карточек в слайдере
    function updateSlider() {
        // Проходим по каждому элементу массива slider с помощью цикла forEach. Внутри функции 2 переменные: item – текущая карточка, а index — его индекс в массиве.
        slider.forEach((item, index) => {
            // Проверяем, нужно ли показывать карточку (находится ли индекс карточки в пределах видимых карточек?)
            // Если индекс карточки находится в пределах видимых карточек:
            if (index >= currentIndex && index < currentIndex + visibleCards) {
                // Показываем карточку
                item.style.display = "block";
            }
            // Иначе скрываем карточку 
            else {
                item.style.display = "none";
            }
        });
    }

    /* 3. Секция Отзывы */ 
    function submitReview(event) {
        event.preventDefault(); // Предотвращаем перезагрузку страницы

        const nickname = document.getElementById("nickname").value;
        const reviewInput = document.getElementById("review-input").value;

        // Создаем новый элемент отзыва
        const newReview = document.createElement("div");
        newReview.classList.add("review");
        newReview.innerHTML = `
            <><p class="review-text">${nickname}: ${reviewInput} <span class="more" onclick="toggleReview('new-review')">[развернуть]</span></p><p class="full-review" style="display: none;">Спасибо за ваш отзыв!</p></>
            `
        // Добавляем новый отзыв в секцию отзывов
        document.querySelector(".reviews").appendChild(newReview);

        // Очищаем форму
        document.getElementById("review-form").reset();
    }

    console.log('Скрипт отработал корректно')
})