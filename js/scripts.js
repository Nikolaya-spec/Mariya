let currentImageIndex = 0;

function openGallery(index) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    
    currentImageIndex = index;
    
    const images = document.querySelectorAll(".thumbnail");
    
    lightboxImg.src = images[index].src; 
    lightbox.style.display = "block";
}

function closeGallery() {
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "none";
}

function changeImage(direction) {
    const images = document.querySelectorAll(".thumbnail");
    
    currentImageIndex += direction;

    if (currentImageIndex >= images.length) {
        currentImageIndex = 0; // Вернуться к первому изображению
    } else if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1; // Вернуться к последнему изображению
    }
    const lightboxImg = document.getElementById("lightbox-img");
    lightboxImg.src = images[currentImageIndex].src; 
}

function submitReview(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    const nickname = document.getElementById("nickname").value;
    const reviewInput = document.getElementById("review-input").value;

    // Создаем новый элемент отзыва
    const newReview = document.createElement("div");
    newReview.classList.add("review");
    newReview.innerHTML = 
        <p class="review-text">${nickname}: ${reviewInput} <span class="more" onclick="toggleReview('new-review')">[развернуть]</span></p>
        <p class="full-review" style="display: none;">Спасибо за ваш отзыв!</p>
    ;

    // Добавляем новый отзыв в секцию отзывов
    document.querySelector(".reviews").appendChild(newReview);

    // Очищаем форму
    document.getElementById("review-form").reset();
}
