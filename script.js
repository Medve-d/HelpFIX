document.addEventListener("DOMContentLoaded", function() {
    const openBtn = document.getElementById("openBtn");
    const closeBtn = document.getElementById("closeBtn");
    const sidenav = document.getElementById("mySidenav");

    // Ajoute un gestionnaire d'événement pour ouvrir le menu burger
    openBtn.addEventListener("click", function(event) {
        event.stopPropagation(); // Empêche la propagation de l'événement de clic
        sidenav.classList.add("active");
        openBtn.style.display = "none"; // Hide the open button when the menu is open
        openBtn.style.visibility = "hidden"; // Hide the button completely
    });

    // Ajoute un gestionnaire d'événement pour fermer le menu burger
    closeBtn.addEventListener("click", function() {
        sidenav.classList.remove("active");
        openBtn.style.display = "block"; // Show the open button when the menu is closed
        openBtn.style.visibility = "visible"; // Make the button visible again
    });
});
