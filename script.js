// ============================================================
// COLIBRI ENERGY — interactions du site (3 fonctionnalités)
//   1. Mise à jour automatique de l'année dans le pied de page
//   2. Menu mobile (ouverture/fermeture du panneau hamburger)
//   3. Animation d'apparition des blocs au défilement (.reveal)
//   4. Formulaire de contact -> ouvre la messagerie (mailto)
// ============================================================

// --- 1. Année automatique dans le footer (© 2026 Colibri Energy...) ---
document.getElementById('year').textContent = new Date().getFullYear();


// --- 2. Menu mobile : ouverture/fermeture au clic sur le bouton hamburger ---
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  // Ajoute/retire la classe "open" définie dans style.css (media query mobile)
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Referme le menu automatiquement quand on clique sur un lien
mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});


// --- 3. Apparition en fondu des blocs marqués class="reveal" dans le HTML
//        au fur et à mesure qu'ils entrent dans l'écran au défilement ---
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible'); // déclenche l'animation CSS
        io.unobserve(entry.target); // on ne l'anime qu'une seule fois
      }
    });
  }, { threshold: 0.15 }); // se déclenche dès que 15% du bloc est visible

  revealEls.forEach((el) => io.observe(el));
} else {
  // Navigateur trop ancien : on affiche directement tout sans animation
  revealEls.forEach((el) => el.classList.add('is-visible'));
}


// --- 4. Formulaire de contact -> ouvre le logiciel mail avec un message
//        pré-rempli. Site 100% statique : il n'y a PAS d'envoi serveur,
//        donc aucun back-end ni service tiers n'est nécessaire.
//        (Pour changer l'adresse de destination, modifier la ligne
//        "mailto:contact@colibri-enr.com" ci-dessous.) ---
const form = document.getElementById('contact-form');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // empêche le rechargement de page par défaut du formulaire

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  const subject = encodeURIComponent(`Demande de contact — ${name}`);
  const body = encodeURIComponent(
    `Nom : ${name}\nEmail : ${email}\n\nMessage :\n${message}`
  );

  // Adresse de contact du site : à modifier ici si elle change un jour
  window.location.href = `mailto:contact@colibri-enr.com?subject=${subject}&body=${body}`;
});
