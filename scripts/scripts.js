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

    if (prevButton) {
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
    }
    if (nextButton) {
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
    }

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

    /* 3. Создание свайпера для изображений в секции Галерея как модального окна */
    const gallery__modal = document.getElementById('gallery__modal');
    const openModalButton = document.querySelector('.gallery__open-modal');
    const closeModalButton = document.getElementById('gallery__close-modal');

    if (openModalButton) {
        // Открытие модального окна
        openModalButton.addEventListener('click', () => {
            gallery__modal.style.display = 'block';
            initializeSwiper(); // Инициализация Swiper при открытии
        });
    }
    if (closeModalButton) {
        // Закрытие модального окна
        closeModalButton.addEventListener('click', () => {
            gallery__modal.style.display = 'none';
        });
    }

    if (window) {
        // Закрытие модального окна при клике вне его
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                gallery__modal.style.display = 'none';
            }
        });
    }

    function initializeSwiper() {
        const swiper = new Swiper('.mySwiper', {
            pagination: {
                el: '.swiper-pagination',
                type: "fraction",
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    /* 4. Секция Отзывы */
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

    /* 5. Динамическое формирование навигационного меню */
    //Объявляем переменную headerMenu и сохраняем в нее header__navigation
    const headerMenu = document.querySelector('.header__navigation');
    // Если такой элемент существует
    if (headerMenu) {
        //Объявляем переменную headerList и сохраняем в нее header__list, чтобы мы могли добавить новые элементы
        const headerList = headerMenu.querySelector('.header__list');

        //Создаем объект menuData, который содержит данные для трех ссылок меню.
        const menuData = {
            // Каждая ссылка содержит link (адрес ссылки; если ссылка никуда не ведет, то можно оставить #) и title (текст ссылки).
            link1: {
                link: '#',
                title: 'Участие в благотворительности',
            },
            link2: {
                link: '#',
                title: 'Корзина',
            }
        }

        //Создаем функцию createLink, которая будет добавлять ссылку в меню. Внутри функции 2 переменные: UrlLink – адрес, а title — текст ссылки.
        const createLink = (UrlLink, title) => {
            // создаем переменную  link, которая будет содержать HTML-код ссылки и вставляем в него 2 переменные
            const link = `
            <button type="button" class="nav-button button"><a href="${UrlLink}" class="header__link">${title}</a></button>
            `;
            return link;
        }

        // Создаем цикл for и проходим по всем элементам объекта menuData.
        for (const linkItem in menuData) {
            //Получаем данные для ссылки и сохраняем в переменную link.
            const link = menuData[linkItem];
            //Создаем переменную linkIndex и вызываем функцию createLink, куда передаем адрес и заголовок.
            const linkIndex = createLink(link.UrlLink, link.title);
            // С помощью метода insertAdjacentHTML добавляем созданный HTML-код в конец списка headerList.
            headerList.insertAdjacentHTML('beforeend', linkIndex);

        }
    }

    /* 6. Формирование массива из текстов (описаний изображений) для свайпера в модальном окне Галереи */
    //Объявляем переменную imagesContainer и сохраняем в нее элементы swiper-wrapper
    const imagesContainer = document.querySelector(".swiper-wrapper");

    // проверяем существует ли элемент imagesContainer, если он существует то переходим далее
    if (imagesContainer) {
        //далее создаем массив dataImgDescription, который содержит строки с описаниями изображений.(здесь уже пишем те значения, которые надо подставить вместо слов "Вставьте описание изображения")
        const dataImgDescription = [
            "Утро начинается с кофе",
            "Добро пожаловать!",
            "Мистично",
            "Лучшая погода, чтобы расслабиться",
            "Немножечко Light Academia",
            "Просто - значит красиво"
        ];

        //Объявляем переменную titleDescriptions и сохраняем в нее все элементы на странице с классом description-img (где должны стоять описания изображений)
        const titleDescriptions = imagesContainer.querySelectorAll(".description-img");

        // Проходим по каждому элементу массива titleDescriptions с помощью цикла forEach. Внутри функции 2 переменные: item – текущий заголовок, а index — его индекс в массиве.
        titleDescriptions.forEach((item, index) => {

            //здесь обновляем значение текущего заголовка (textContent) на новое значение из массива dataImgDescription, используя индекс текущего заголовка.
            item.textContent = dataImgDescription[index];
        });
    }


    /* 7. Динамическая галерея МЕНЮ; Реализация переключения между изображениями при клике */
    //Объявляем переменную cardsImages и сохраняем в нее элементы секции menu
    const cardsImages = document.querySelector(".menu");
    //  проверяем существует ли элемент cardsImages, если он существует то переходим далее
    if (cardsImages) {
        //Объявляем переменную cardListImages и сохраняем в нее список с классом menu__list, куда будут добавляться изображения
        const cardListImages = cardsImages.querySelector(".menu__list");
        // Пример URL для получения данных с сервера (откуда загружаются данные)
        const apiUrl = "images.json";
        // Функция для создания карточки
        // объявляем функцию, принимает 3 параметра imageUrl, imageAlt, imageWidth

        const createCard = (imageUrl, imageAlt, imageWidth) => {
            // создается переменная image, которая содержит HTML-код для карточки изображения. Внутри <li> (элемента списка) создаются два элемента <img>:
            // 1) Первое изображение (imageUrl[0]) отображается по умолчанию.
            // 2) Второе изображение (imageUrl[1]) скрыто изначально с помощью стиля style="display: none;". Это изображение будет показано при клике.
            const image = `
            <li class="images__item">
                <img class="images__picture" src="${imageUrl[0]}" alt="${imageAlt}" width="${imageWidth}">
                <img class="images__picture" src="${imageUrl[1]}" alt="${imageAlt}" width="${imageWidth}" style="display: none;">
            </li>
        `;
            //возвращает строку image, которая содержит HTML-код для карточки изображения
            return image;
        };

        //КОД ИЗ П 4. Загрузка данных с сервера
        // Запрос к серверу с помощью метода fetch
        fetch(apiUrl)
            // После того как запрос выполнен, возвращается объект Response, где вызывается метод json(), который преобразует ответ в формат JSON
            .then((response) => response.json())
            //получение данных 
            .then((images) => {
                console.log(images); // Вывод данных в консоль
                console.log(typeof images); // Вывод в консоль Типа полученных данных

                images.forEach((item) => {
                    // создается переменная cardElement, где для каждого элемента массива вызывается функция createCard и передаются параметры
                    const cardElement = createCard(
                        item.imageUrl,
                        item.imageAlt,
                        item.imageWidth
                    );
                    // Добавление карточки на страницу в список cardListImages  с помощью метода insertAdjacentHTML beforeend указывает, что карточка должна быть добавлена в конец списка
                    cardListImages.insertAdjacentHTML("beforeend", cardElement);
                });

                //КОД ИЗ П 6. «Добавление обработчика событий для переключения изображений при клике на них»
                //Объявляем переменную pictures и сохраняем в нее все изображения с классом images__picture 
                const pictures = document.querySelectorAll(".images__picture");
                if (pictures) {
                    // Пройдемся по каждому элементу массива pictures, с помощью цикла forEach. 
                    pictures.forEach((picture) => {
                        //добавляем обработчик события клика по изображению:
                        picture.addEventListener("click", () => {
                            // получаем родительский элемент текущего изображения
                            const parentItem = picture.parentElement;

                            // Получаем все изображения в родительском элементе, для того чтобы работать только с изображениями, которые находятся в одной карточке
                            const parentPictures =
                                parentItem.querySelectorAll(".images__picture");

                            // проходимся по всем изображениям, найденным в карточке
                            parentPictures.forEach((parentPictures) => {
                                //проверка условия если на текущее изображение не кликали, то оставляем это изображение видимым, иначе скрываем
                                if (parentPictures !== picture) {
                                    parentPictures.style.display = "block"; // Показываем другое изображение
                                } else {
                                    parentPictures.style.display = "none"; // Скрываем текущее изображение
                                }
                            });
                        });
                    });
                }
            });
    }

    console.log('Скрипт отработал корректно')
})


