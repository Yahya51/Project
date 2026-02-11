// Smooth Scroll Effect
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({
                behavior: "smooth"
            });
    });
});

// Simple Fade Animation on Scroll
const sections = document.querySelectorAll(".section");

window.addEventListener("scroll", () => {
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 400;

        if (top > offset) {
            sec.style.opacity = "1";
            sec.style.transform = "translateY(0)";
        }
    });
});

sections.forEach(sec => {
    sec.style.opacity = "0";
    sec.style.transform = "translateY(40px)";
    sec.style.transition = "0.6s";
});
