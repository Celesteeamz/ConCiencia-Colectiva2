function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

const canvas = document.getElementById("galaxy-bg");
const ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const stars = [];
const numStars = 200;

const colors = ["#d5e862", "#6552cc", "#5f5594", "#19191a"];

for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5,
        alpha: Math.random(),
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)]
    });
}

function animateGalaxy() {
    ctx.clearRect(0, 0, width, height);

    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        const c = star.color;
        ctx.fillStyle = `rgba(${parseInt(c.slice(1,3),16)},${parseInt(c.slice(3,5),16)},${parseInt(c.slice(5,7),16)},${star.alpha})`;
        ctx.fill();

        star.x += star.dx;
        star.y += star.dy;

        if(star.x < 0 || star.x > width) star.dx = -star.dx;
        if(star.y < 0 || star.y > height) star.dy = -star.dy;
    });

    requestAnimationFrame(animateGalaxy);
}

animateGalaxy();

window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

const slides = document.querySelectorAll(".carrusel-info .slide");
const prevBtn = document.querySelector(".carrusel-info .prev");
const nextBtn = document.querySelector(".carrusel-info .next");

let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove("active");
        if(i === index) slide.classList.add("active");
    });
}

prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});

nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
});

setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 6000);
