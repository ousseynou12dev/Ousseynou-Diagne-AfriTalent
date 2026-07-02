/* ============================================================
   AFRITALENT — SCRIPT PRINCIPAL
   Sommaire :
   1. Mode sombre (dark mode) + mémorisation du choix
   2. Navbar qui rétrécit au scroll
   3. Bouton "retour en haut"
   4. Fondu en entrée des sections au scroll (IntersectionObserver)
   5. Compteurs animés — page Accueil (.counter)
   6. Compteurs animés — page À propos (#chiffres)
   7. Validation du formulaire de contact
   8. Filtrage des freelances (recherche / catégorie / statut)
   9. Modale "Voir le profil" (freelances.html)
   10. Année dynamique dans le footer
   ============================================================ */


/* ── 1. MODE SOMBRE (DARK MODE) ──────────────────────────── */

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


/* ── 2. NAVBAR AU SCROLL ─────────────────────────────────── */

// On récupère la navbar
let navbar = document.querySelector(".navbar");

// À chaque fois que l'utilisateur fait défiler la page
window.addEventListener("scroll", function () {

  // Si on a dépassé 60px vers le bas, on réduit la navbar
  if (window.scrollY > 60) {
    navbar.classList.add("navbar--scrolled");
  } else {
    navbar.classList.remove("navbar--scrolled");
  }

});


/* ── 3. BOUTON RETOUR EN HAUT ────────────────────────────── */

// On récupère le bouton (présent dans le HTML de chaque page)
let boutonHaut = document.getElementById("back-to-top");

// À chaque scroll, on affiche ou cache le bouton
window.addEventListener("scroll", function () {

  if (window.scrollY > 300) {
    boutonHaut.style.display = "flex";
  } else {
    boutonHaut.style.display = "none";
  }

});

// Quand on clique dessus, on remonte en haut de la page en douceur
boutonHaut.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


/* ── 4. FADE-IN DES SECTIONS AU SCROLL ───────────────────── */

// On sélectionne toutes les sections avec la classe "fade-in-section"
let sections = document.querySelectorAll('.fade-in-section');

// On crée un observateur qui regarde si une section entre dans l'écran
let observateurFade = new IntersectionObserver(function (entries) {

  // Pour chaque section observée
  entries.forEach(function (entry) {

    // Si la section est visible à l'écran
    if (entry.isIntersecting) {
      // On lui ajoute la classe "visible" → déclenche l'animation CSS
      entry.target.classList.add('visible');
    }

  });

});

// On dit à l'observateur de surveiller chaque section
sections.forEach(function (section) {
  observateurFade.observe(section);
});


/* ── 5. COMPTEURS ANIMÉS — index.html ────────────────────── */

// On sélectionne tous les compteurs du hero
let compteurs = document.querySelectorAll('.counter');

// On crée un observateur pour les compteurs
let observateurCompteur = new IntersectionObserver(function (entries) {

  entries.forEach(function (entry) {

    // Si le compteur est visible à l'écran
    if (entry.isIntersecting) {

      let element   = entry.target;
      let valeurFin = parseInt(element.dataset.target); // ex : 2500
      let valeurNow = 0;    // on part de 0
      let vitesse   = 30;   // millisecondes entre chaque mise à jour

      // On crée un intervalle qui incrémente le chiffre
      let intervalle = setInterval(function () {

        // On augmente la valeur de 1% de la valeur finale à chaque tick
        valeurNow += Math.ceil(valeurFin / 100);

        // Si on a dépassé la valeur finale, on s'arrête pile dessus
        if (valeurNow >= valeurFin) {
          valeurNow = valeurFin;
          clearInterval(intervalle); // on arrête l'intervalle
        }

        // On affiche la valeur actuelle dans le span
        element.textContent = valeurNow + '+';

      }, vitesse);

      // On arrête d'observer ce compteur (pour ne pas relancer l'animation)
      observateurCompteur.unobserve(element);
    }

  });

});

// On dit à l'observateur de surveiller chaque compteur
compteurs.forEach(function (compteur) {
  observateurCompteur.observe(compteur);
});


/* ── 6. COMPTEURS ANIMÉS — about.html ────────────────────── */

// On sélectionne la section chiffres (elle n'existe que sur about.html)
let sectionChiffres = document.querySelector('#chiffres');

// On ne fait ce traitement que si la section existe sur la page courante
if (sectionChiffres) {

  // On sélectionne les grands chiffres dans cette section
  let grandsChiffres = sectionChiffres.querySelectorAll('.fs-1.fw-bold');

  // Pour chaque grand chiffre, on sauvegarde sa valeur originale
  grandsChiffres.forEach(function (el) {
    let texte   = el.textContent.trim();      // ex : "500+" ou "98%"
    let nombre  = parseInt(texte);             // extrait le nombre : 500 ou 98
    let suffixe = texte.replace(nombre, '');   // extrait le suffixe : "+" ou "%"

    // On sauvegarde dans des attributs data pour les retrouver plus tard
    el.dataset.target = nombre;
    el.dataset.suffix  = suffixe;

    // On remet le texte à 0 avant l'animation
    el.textContent = '0' + suffixe;
  });

  // On crée un observateur pour ces chiffres
  let observateurAbout = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

      if (entry.isIntersecting) {

        let element   = entry.target;
        let valeurFin = parseInt(element.dataset.target);
        let suffixe   = element.dataset.suffix;
        let valeurNow = 0;
        let vitesse   = 30;

        let intervalle = setInterval(function () {

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
  grandsChiffres.forEach(function (chiffre) {
    observateurAbout.observe(chiffre);
  });

}


/* ── 7. VALIDATION DU FORMULAIRE DE CONTACT ──────────────── */

// On attend que la page soit complètement chargée
document.addEventListener('DOMContentLoaded', function () {

  // On récupère le formulaire
  let formulaire = document.querySelector('form');

  // Si le formulaire n'existe pas sur cette page, on arrête
  if (!formulaire) return;

  // On récupère chaque champ
  let champNom     = document.getElementById('nom');
  let champPrenom  = document.getElementById('prenom');
  let champEmail   = document.getElementById('email');
  let champSujet   = document.getElementById('sujet');
  let champMessage = document.getElementById('message');

  // Fonction : afficher une erreur sous un champ
  function montrerErreur(champ, texteErreur) {

    // On met le champ en rouge
    champ.classList.remove('is-valid');
    champ.classList.add('is-invalid');

    // On cherche si un message d'erreur existe déjà sous ce champ
    let erreurExistante = champ.parentElement.querySelector('.erreur-message');

    // Si pas encore de message, on le crée
    if (!erreurExistante) {
      let message = document.createElement('p');
      message.classList.add('erreur-message');
      message.style.color     = 'red';
      message.style.fontSize  = '13px';
      message.style.marginTop = '4px';
      champ.parentElement.appendChild(message);
    }

    // On écrit le texte d'erreur
    champ.parentElement.querySelector('.erreur-message').textContent = texteErreur;
  }

  // Fonction : effacer l'erreur d'un champ
  function effacerErreur(champ) {

    // On met le champ en vert
    champ.classList.remove('is-invalid');
    champ.classList.add('is-valid');

    // On supprime le message d'erreur s'il existe
    let erreurExistante = champ.parentElement.querySelector('.erreur-message');
    if (erreurExistante) {
      erreurExistante.remove();
    }
  }

  // Fonction : valider l'email avec une regex
  function emailEstValide(email) {
    // La regex vérifie le format : quelquechose@domaine.extension
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Quand on soumet le formulaire
  formulaire.addEventListener('submit', function (event) {

    // On empêche l'envoi réel du formulaire (pas de backend ici)
    event.preventDefault();

    // On suppose que tout est valide au départ
    let formulaireValide = true;

    // --- Vérification du Nom ---
    if (champNom.value.trim() === '') {
      montrerErreur(champNom, 'Le nom est obligatoire.');
      formulaireValide = false;
    } else {
      effacerErreur(champNom);
    }

    // --- Vérification du Prénom ---
    if (champPrenom.value.trim() === '') {
      montrerErreur(champPrenom, 'Le prénom est obligatoire.');
      formulaireValide = false;
    } else {
      effacerErreur(champPrenom);
    }

    // --- Vérification de l'Email ---
    if (champEmail.value.trim() === '') {
      montrerErreur(champEmail, 'L\'email est obligatoire.');
      formulaireValide = false;
    } else if (!emailEstValide(champEmail.value.trim())) {
      montrerErreur(champEmail, 'Format email invalide. Ex : nom@exemple.com');
      formulaireValide = false;
    } else {
      effacerErreur(champEmail);
    }

    // --- Vérification du Sujet ---
    if (champSujet.value === '') {
      montrerErreur(champSujet, 'Veuillez choisir un sujet.');
      formulaireValide = false;
    } else {
      effacerErreur(champSujet);
    }

    // --- Vérification du Message (minimum 20 caractères) ---
    if (champMessage.value.trim() === '') {
      montrerErreur(champMessage, 'Le message est obligatoire.');
      formulaireValide = false;
    } else if (champMessage.value.trim().length < 20) {
      montrerErreur(champMessage, 'Le message doit contenir au moins 20 caractères. (' + champMessage.value.trim().length + '/20)');
      formulaireValide = false;
    } else {
      effacerErreur(champMessage);
    }

    // Si tout est valide → on affiche un message de succès
    if (formulaireValide) {

      // On cache le formulaire
      formulaire.style.display = 'none';

      // On crée le message de succès
      let messageSucces = document.createElement('div');
      messageSucces.style.textAlign    = 'center';
      messageSucces.style.padding      = '40px';
      messageSucces.style.background   = '#DFF8EB';
      messageSucces.style.borderRadius = '12px';
      messageSucces.style.border       = '1px solid #214E34';

      messageSucces.innerHTML = `
        <p style="font-size: 50px; margin-bottom: 16px;">✅</p>
        <h3 style="color: #214E34;">Message envoyé !</h3>
        <p style="color: #364156;">Merci, nous vous répondrons dans les plus brefs délais.</p>
      `;

      // On insère le message à la place du formulaire
      formulaire.parentElement.appendChild(messageSucces);
    }

  });

});


/* ── 8. FILTRAGE DES FREELANCES (sans rechargement de page) ── */

document.addEventListener('DOMContentLoaded', function () {

  const searchInput    = document.getElementById('search');
  const categorySelect = document.getElementById('category');
  const statusSelect   = document.getElementById('status');
  const filterBtn      = document.querySelector('#barre-de-filtre .btn-primary');

  // Si la barre de filtre n'existe pas sur cette page, on arrête
  if (!searchInput || !categorySelect || !statusSelect) return;

  // Sélectionne toutes les cartes (colonnes) de la grille de profils
  function getCards() {
    return document.querySelectorAll('#grilledeprofil .col-12');
  }

  // Applique le filtre texte + catégorie + statut sur chaque carte
  function filtrer() {
    const terme     = searchInput.value.toLowerCase().trim();
    const categorie = categorySelect.value;
    const statut    = statusSelect.value;

    let visibles = 0;

    getCards().forEach(function (col) {
      const nom = (col.dataset.name     || '').toLowerCase();
      const cat = (col.dataset.category || '').toLowerCase();
      const st  = (col.dataset.status   || '').toLowerCase();

      const matchNom  = terme === '' || nom.includes(terme);
      const matchCat  = categorie === '' || cat === categorie;
      const matchStat = statut === '' || st === statut;

      if (matchNom && matchCat && matchStat) {
        col.style.display = '';
        visibles++;
      } else {
        col.style.display = 'none';
      }
    });

    afficherMessageVide(visibles);
  }

  // Affiche un message si aucun résultat ne correspond au filtre
  function afficherMessageVide(nb) {
    let msg = document.getElementById('no-result');

    if (nb === 0) {
      if (!msg) {
        msg = document.createElement('p');
        msg.id = 'no-result';
        msg.textContent = 'Aucun freelance ne correspond à votre recherche.';
        msg.style.cssText = 'text-align:center;color:var(--bs-secondary);margin-top:2rem;width:100%;';
        document.querySelector('#grilledeprofil .row').appendChild(msg);
      }
    } else if (msg) {
      msg.remove();
    }
  }

  // Filtrage au clic du bouton
  if (filterBtn) filterBtn.addEventListener('click', filtrer);

  // Filtrage en temps réel pendant la saisie
  searchInput.addEventListener('input', filtrer);

  // Filtrage instantané au changement des menus déroulants
  categorySelect.addEventListener('change', filtrer);
  statusSelect.addEventListener('change', filtrer);

});


/* ── 9. MODALE "VOIR LE PROFIL" (freelances.html) ────────── */

document.addEventListener('DOMContentLoaded', function () {

  // La modale n'existe que sur freelances.html
  const modalProfil = document.getElementById('profilModal');
  if (!modalProfil) return;

  // Éléments internes de la modale à remplir dynamiquement
  const modalImg         = document.getElementById('profilModalImg');
  const modalNom         = document.getElementById('profilModalNom');
  const modalSpecialite  = document.getElementById('profilModalSpecialite');
  const modalBio         = document.getElementById('profilModalBio');
  const modalTarif       = document.getElementById('profilModalTarif');

  // Tous les boutons "Voir le profil" de la grille
  const boutonsProfil = document.querySelectorAll('#grilledeprofil .btn-outline-primary');

  boutonsProfil.forEach(function (bouton) {

    bouton.addEventListener('click', function () {

      // On remonte jusqu'à la carte pour récupérer ses informations
      const carte = bouton.closest('.card, article.card');
      if (!carte) return;

      const img        = carte.querySelector('img');
      const nom         = carte.querySelector('.card-title');
      const specialite  = carte.querySelector('.card-subtitle');
      const bio         = carte.querySelector('.card-text');
      const tarif       = bouton.dataset.tarif || '';

      // On remplit la modale avec les données de la carte cliquée
      modalImg.src = img ? img.src : '';
      modalImg.alt = img ? img.alt : '';
      modalNom.textContent        = nom ? nom.textContent : '';
      modalSpecialite.textContent = specialite ? specialite.textContent : '';
      modalBio.textContent        = bio ? bio.textContent : '';
      modalTarif.textContent      = tarif;

    });

  });

});


/* ── 10. ANNÉE DYNAMIQUE DANS LE FOOTER ──────────────────── */


let elementAnnee = document.getElementById('currentYear');
if (elementAnnee) {
  elementAnnee.textContent = new Date().getFullYear();
}