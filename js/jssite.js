// =============================================
//   AFRITALENT — main.js
// =============================================


// ── 1. DARK MODE ──────────────────────────────

// On récupère le bouton toggle dans la navbar
let boutonTheme = document.getElementById("theme-toggle");

// Au chargement de la page, on vérifie si l'utilisateur
// avait déjà choisi le dark mode avant
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

// Quand on clique sur le bouton
boutonTheme.addEventListener("click", function () {

  // On bascule la classe "dark-mode" sur le body
  document.body.classList.toggle("dark-mode");

  // On sauvegarde le choix dans localStorage
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }

});


// ── 2. NAVBAR AU SCROLL ───────────────────────

// On récupère la navbar
let navbar = document.querySelector(".navbar");

// À chaque fois que l'utilisateur fait défiler la page
window.addEventListener("scroll", function () {

  // Si on a dépassé 60px vers le bas
  if (window.scrollY > 60) {
    navbar.classList.add("navbar--scrolled");
  } else {
    navbar.classList.remove("navbar--scrolled");
  }

});


// ── 3. BOUTON RETOUR EN HAUT ──────────────────

// On récupère le bouton (à ajouter dans le HTML)
let boutonHaut = document.getElementById("back-to-top");

// À chaque scroll, on affiche ou cache le bouton
window.addEventListener("scroll", function () {

  if (window.scrollY > 300) {
    boutonHaut.style.display = "flex";
  } else {
    boutonHaut.style.display = "none";
  }

});

// Quand on clique dessus, on remonte en haut
boutonHaut.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});