document.addEventListener("DOMContentLoaded", function() {
    const lightbox = document.querySelector(".custom-lightbox");
    const lightboxImg = document.querySelector(".lightbox-image");

    document.addEventListener("click", function(e) {
        const trigger = e.target.closest(".expandable-image");
        
        if (trigger) {
            console.log("clicked")
            e.preventDefault();
            
            const clickedImg = trigger.tagName === "IMG" ? trigger : trigger.querySelector("img");
            if (clickedImg && lightboxImg && lightbox) {
                lightboxImg.src = clickedImg.src;
                lightboxImg.alt = clickedImg.alt;
                lightbox.classList.add("active");
                            console.log("it was added")
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
