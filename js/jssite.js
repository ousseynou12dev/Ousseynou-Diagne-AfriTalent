
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




// 1. FADE-IN DES SECTIONS AU SCROLL


// On sélectionne toutes les sections avec la classe "fade-in-section"
let sections = document.querySelectorAll('.fade-in-section');

// On crée un observateur qui regarde si une section entre dans l'écran
let observateurFade = new IntersectionObserver(function(entries) {

  // Pour chaque section observée
  entries.forEach(function(entry) {

    // Si la section est visible à l'écran
    if (entry.isIntersecting) {
      // On lui ajoute la classe "visible" → déclenche l'animation CSS
      entry.target.classList.add('visible');
    }

  });

});

// On dit à l'observateur de surveiller chaque section
sections.forEach(function(section) {
  observateurFade.observe(section);
});



// 2. COMPTEURS ANIMÉS — index.html


// On sélectionne tous les compteurs du hero
let compteurs = document.querySelectorAll('.counter');

// On crée un observateur pour les compteurs
let observateurCompteur = new IntersectionObserver(function(entries) {

  entries.forEach(function(entry) {

    // Si le compteur est visible à l'écran
    if (entry.isIntersecting) {

      let element    = entry.target;
      let valeurFin  = parseInt(element.dataset.target); // ex: 2500
      let valeurNow  = 0;    // on part de 0
      let vitesse    = 30;   // millisecondes entre chaque mise à jour

      // On crée un intervalle qui incrémente le chiffre
      let intervalle = setInterval(function() {

        // On augmente la valeur de 1% de la valeur finale à chaque tick
        valeurNow += Math.ceil(valeurFin / 100);

        // Si on a dépassé la valeur finale, on s'arrête pile
        if (valeurNow >= valeurFin) {
          valeurNow = valeurFin;
          clearInterval(intervalle); // on arrête l'intervalle
        }

        // On affiche la valeur actuelle dans le span
        element.textContent = valeurNow + '+';

      }, vitesse);

      // On arrête d'observer ce compteur (pour ne pas relancer)
      observateurCompteur.unobserve(element);
    }

  });

});

// On dit à l'observateur de surveiller chaque compteur
compteurs.forEach(function(compteur) {
  observateurCompteur.observe(compteur);
});



// 3. COMPTEURS ANIMÉS — about.html



// On sélectionne la section chiffres (elle existe seulement sur about.html)
let sectionChiffres = document.querySelector('#chiffres');

// Si la section existe sur cette page
if (sectionChiffres) {

  // On sélectionne les grands chiffres dans cette section
  let grandsChiffres = sectionChiffres.querySelectorAll('.fs-1.fw-bold');

  // Pour chaque grand chiffre, on sauvegarde sa valeur originale
  grandsChiffres.forEach(function(el) {
    let texte   = el.textContent.trim(); // ex: "500+"  ou  "98%"
    let nombre  = parseInt(texte);       // extrait le nombre : 500  ou  98
    let suffixe = texte.replace(nombre, ''); // extrait le suffixe : "+"  ou  "%"

    // On sauvegarde dans des attributs data pour les retrouver plus tard
    el.dataset.target  = nombre;
    el.dataset.suffix  = suffixe;

    // On remet le texte à 0 avant l'animation
    el.textContent = '0' + suffixe;
  });

  // On crée un observateur pour ces chiffres
  let observateurAbout = new IntersectionObserver(function(entries) {

    entries.forEach(function(entry) {

      if (entry.isIntersecting) {

        let element   = entry.target;
        let valeurFin = parseInt(element.dataset.target);
        let suffixe   = element.dataset.suffix;
        let valeurNow = 0;
        let vitesse   = 30;

        let intervalle = setInterval(function() {

          valeurNow += Math.ceil(valeurFin / 100);

          if (valeurNow >= valeurFin) {
            valeurNow = valeurFin;
            clearInterval(intervalle);
          }

          element.textContent = valeurNow + suffixe;

        }, vitesse);

        observateurAbout.unobserve(element);
      }

    });

  });

  // On surveille chaque grand chiffre
  grandsChiffres.forEach(function(chiffre) {
    observateurAbout.observe(chiffre);
  });

}
