// Establecer la fecha del evento y desbloqueo
const eventDate = new Date("April 19, 2025 20:30:00").getTime();
const unlockDate = new Date("March 19, 2025 00:00:00").getTime(); // Fecha de desbloqueo del enlace

// Obtener el enlace de la invitación
const invitationLink = document.getElementById("invitation-link");

// Actualizar la cuenta regresiva cada segundo
const countdown = setInterval(function() {
    const now = new Date().getTime();
    const timeLeft = eventDate - now;

    // Calcular días, horas, minutos y segundos
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Mostrar la cuenta regresiva en una sola línea
    document.getElementById("countdown").textContent = 
        "Faltan " + days + " días " + hours + "h " + minutes + "m " + seconds + "s";

    // Cuando llegue el día de la fiesta
    if (timeLeft < 0) {
        clearInterval(countdown);
        document.getElementById("countdown").textContent = "¡Es el gran día!";
    }

    // Verificar si ya es la fecha para desbloquear el enlace
    if (now >= unlockDate) {
        invitationLink.href = "https://invitacionalosxvdeluciana.my.canva.site/dagd9rowhoq"; // Reemplaza con el enlace real
        invitationLink.classList.remove("blocked-link");
        invitationLink.classList.add("unlocked-link");
        invitationLink.textContent = "La invitación está aquí, ¡el gran día está más cerca!";
    }
}, 1000);

// Agregar un evento de clic para mostrar la alerta si intentan acceder antes de la fecha
invitationLink.addEventListener('click', function(event) {
    const now = new Date().getTime();

    if (now < unlockDate) {
        event.preventDefault(); // Evitar que se abra el enlace
        const daysRemaining = Math.ceil((unlockDate - now) / (1000 * 60 * 60 * 24)); // Calcular días restantes
        alert(`El enlace se habilitará pronto, estamos contando los días.`);
    }
});
