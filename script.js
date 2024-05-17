document.addEventListener("DOMContentLoaded", function() {
    const openBtn = document.getElementById("openBtn");
    const closeBtn = document.getElementById("closeBtn");
    const sidenav = document.getElementById("mySidenav");

    // Ajoute un gestionnaire d'événement pour ouvrir le menu burger
    openBtn.addEventListener("click", function(event) {
        event.stopPropagation(); // Empêche la propagation de l'événement de clic
        sidenav.classList.add("active");
    });

    // Ajoute un gestionnaire d'événement pour fermer le menu burger
    closeBtn.addEventListener("click", function() {
        sidenav.classList.remove("active");
    });
});


document.addEventListener("DOMContentLoaded", function() {
    // Sélection des boutons
    const accepterBtns = document.querySelectorAll('.accepter');
    const refuserBtns = document.querySelectorAll('.refuser');

    // Ajout d'un gestionnaire d'événement pour chaque bouton "Accepter"
    accepterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // Code à exécuter lorsqu'on clique sur "Accepter"
            console.log("Prestation acceptée");
        });
    });

    // Ajout d'un gestionnaire d'événement pour chaque bouton "Refuser"
    refuserBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // Code à exécuter lorsqu'on clique sur "Refuser"
            console.log("Prestation refusée");
        });
    });
});

