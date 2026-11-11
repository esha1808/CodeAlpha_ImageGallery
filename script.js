// Select HTML Elements
const cards = document.querySelectorAll(".image-card");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const closeBtn = document.getElementById("close");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const filterButtons = document.querySelectorAll(".filter-btn");

// Store visible images
let currentImages = [];
let currentIndex = 0;

// Get currently visible images
function updateImages() {
    currentImages = Array.from(cards)
        .filter(card => card.style.display !== "none")
        .map(card => card.querySelector("img").src);
}

// Open Lightbox
function openLightbox(index) {
    updateImages();

    if (currentImages.length === 0) return;

    currentIndex = index;
    lightboxImg.src = currentImages[currentIndex];

    lightbox.style.display = "flex";
}

// Image Click Event
cards.forEach(card => {

    card.addEventListener("click", () => {

        updateImages();

        const clickedImage = card.querySelector("img").src;

        currentIndex = currentImages.indexOf(clickedImage);

        openLightbox(currentIndex);

    });

});

// Next Image
nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= currentImages.length) {
        currentIndex = 0;
    }

    lightboxImg.src = currentImages[currentIndex];

});

// Previous Image
prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = currentImages.length - 1;
    }

    lightboxImg.src = currentImages[currentIndex];

});

// Close Lightbox
closeBtn.addEventListener("click", () => {

    lightbox.style.display = "none";

});

// Close when clicking outside image
lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        lightbox.style.display = "none";
    }

});

// Category Filtering
filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedCategory = button.dataset.filter;

        // Update active button
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        // Filter images
        cards.forEach(card => {

            const category = card.dataset.category;

            if (selectedCategory === "all" ||
                category === selectedCategory) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});

// Keyboard Navigation
document.addEventListener("keydown", (event) => {

    if (lightbox.style.display === "flex") {

        if (event.key === "ArrowRight") {
            nextBtn.click();
        }

        if (event.key === "ArrowLeft") {
            prevBtn.click();
        }

        if (event.key === "Escape") {
            lightbox.style.display = "none";
        }

    }

});