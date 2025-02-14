const basket = document.getElementById("basket");
const scoreText = document.getElementById("score");
const message = document.getElementById("message");

let score = 0;
const maxScore = 5;

// Mover la canasta con el mouse
document.addEventListener("mousemove", (event) => {
    basket.style.left = `${event.clientX - 20}px`;
});

// Mover la canasta en celulares con el dedo
document.addEventListener("touchmove", (event) => {
    let touch = event.touches[0];
    basket.style.left = `${touch.clientX - 20}px`;
});

// Crear corazones cayendo
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");

    // 80% corazones naranjas, 20% rojos
    heart.textContent = Math.random() < 0.8 ? "🧡" : "❤️";
    heart.style.left = `${Math.random() * window.innerWidth}px`;
    heart.style.top = "0px";

    document.body.appendChild(heart);

    let fall = setInterval(() => {
        heart.style.top = `${heart.offsetTop + 5}px`;

        // Detectar colisión con la canasta
        const basketRect = basket.getBoundingClientRect();
        const heartRect = heart.getBoundingClientRect();

        if (
            heartRect.bottom >= basketRect.top &&
            heartRect.left >= basketRect.left &&
            heartRect.right <= basketRect.right
        ) {
            document.body.removeChild(heart);
            clearInterval(fall);

            if (heart.textContent === "❤️") {
                score++;
                scoreText.textContent = `Puntaje: ${score}`;
                
                if (score >= maxScore) {
                    message.classList.remove("hidden");
                }
            }
        }

        // Eliminar corazones que salgan de la pantalla
        if (heart.offsetTop > window.innerHeight) {
            document.body.removeChild(heart);
            clearInterval(fall);
        }
    }, 50);
}

// Crear corazones cada 800ms
setInterval(createHeart, 800);
