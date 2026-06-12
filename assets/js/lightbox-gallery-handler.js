document.addEventListener("DOMContentLoaded", function() {
    const lightbox = document.querySelector(".custom-lightbox-gallery");
    const lightboxImg = document.querySelector(".lightbox-gallery-image");
    const lightboxCaption = document.querySelector(".lightbox-caption");
    const prevBtn = document.querySelector(".lightbox-prev");
    const nextBtn = document.querySelector(".lightbox-next");

    let currentImgIndex = 0;
    let imagesArray = [];

    document.addEventListener("click", function(e) {
        const trigger = e.target.closest(".expandable-gallery-image");
        
        if (trigger) {
            e.preventDefault();
            
            // Re-fetch all active images to ensure dynamic ordering is fresh
            imagesArray = Array.from(document.querySelectorAll(".expandable-gallery-image img, img.expandable-gallery-image"));
            const clickedImg = trigger.tagName === "IMG" ? trigger : trigger.querySelector("img");

            if (clickedImg && lightboxImg && lightbox) {
                currentImgIndex = imagesArray.indexOf(clickedImg);
                
                updateLightboxContent();
                lightbox.classList.add("active");
            }
        }
    });

    function updateLightboxContent() {
        const activeTarget = imagesArray[currentImgIndex];
        if (activeTarget && lightboxImg) {
            lightboxImg.src = activeTarget.src;
            if (lightboxCaption) {
                lightboxCaption.textContent = activeTarget.alt;
            }
        }
    }

    function nextImage() {
        if (imagesArray.length === 0) return;
        currentImgIndex = (currentImgIndex + 1) % imagesArray.length;
        updateLightboxContent();
    }

    function prevImage() {
        if (imagesArray.length === 0) return;
        currentImgIndex = (currentImgIndex - 1 + imagesArray.length) % imagesArray.length;
        updateLightboxContent();
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            nextImage();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            prevImage();
        });
    }
    
    document.addEventListener("keydown", function(e) {
        if (lightbox && lightbox.classList.contains("active")) {
            if (e.key === "ArrowRight") {
                nextImage();
            } else if (e.key === "ArrowLeft") {
                prevImage();
            } else if (e.key === "Escape") {
                lightbox.classList.remove("active");
            }
        }
    });

    if (lightbox) {
        lightbox.addEventListener("click", function(e) {
            if (e.target === lightbox) {
                lightbox.classList.remove("active");
            }
        });
    }
});
