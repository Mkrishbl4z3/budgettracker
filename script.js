// script.js

document.addEventListener("DOMContentLoaded", () => {
    anime({
        targets: ".container",
        opacity: [0, 1],
        translateY: [-50, 0],
        duration: 1000,
        easing: "easeOutExpo"
    });

    document.querySelector(".btn").addEventListener("click", () => {
        anime({
            targets: ".btn",
            scale: [1, 0.95, 1],
            duration: 300,
            easing: "easeInOutQuad"
        });
    });

    document.querySelectorAll(".input-box input").forEach(input => {
        input.addEventListener("focus", () => {
            anime({
                targets: input,
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                duration: 300,
                easing: "easeInOutQuad"
            });
        });
        input.addEventListener("blur", () => {
            anime({
                targets: input,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                duration: 300,
                easing: "easeInOutQuad"
            });
        });
    });
});
