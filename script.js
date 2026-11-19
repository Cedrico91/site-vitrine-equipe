/* =========================================================
   NOVA Studio — scripts communs à toutes les pages
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Réglages à personnaliser ---------- */
  // Adresse qui reçoit les demandes. Pour un envoi sans messagerie
  // (Formspree, Netlify Forms…), remplacez la fonction sendForm plus bas.
  var CONTACT_EMAIL = 'contact@exemple.fr';

  var root = document.documentElement;
  root.classList.add('js');

  /* ---------- Thème clair / sombre ---------- */
  var themeBtn = document.querySelector('[data-theme-toggle]');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') ||
        (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ---------- Menu mobile ---------- */
  var burger = document.querySelector('[data-burger]');
  var menu = document.getElementById('menu');
  function setMenu(open) {
    if (!menu || !burger) return;
    menu.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (burger) burger.addEventListener('click', function () { setMenu(!menu.classList.contains('is-open')); });
  if (menu) menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  matchMedia('(min-width: 1024px)').addEventListener('change', function () { setMenu(false); });

  /* ---------- En-tête au défilement ---------- */
  var header = document.querySelector('.header');
  function onScroll() { if (header) header.classList.toggle('is-scrolled', scrollY > 8); }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Fenêtres modales (créées ici pour toutes les pages) ---------- */
  var CLOSE_ICON = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  var modalsHTML =
    '<dialog class="modal" id="modal-seance" aria-labelledby="seance-title">' +
      '<div class="modal__inner">' +
        '<button class="icon-btn modal__close" type="button" data-close aria-label="Fermer">' + CLOSE_ICON + '</button>' +
        '<p class="eyebrow">Séance offerte</p>' +
        '<h2 id="seance-title">Réservez votre <em>séance offerte</em></h2>' +
        '<p class="lead">Laissez vos coordonnées : une coach vous rappelle sous 24 h pour fixer le créneau. Sans engagement.</p>' +
        '<form class="form" data-form data-subject="Demande de séance offerte" novalidate>' +
          '<div class="form__row">' +
            '<label class="field">Prénom<input name="Prénom" autocomplete="given-name" required></label>' +
            '<label class="field">Nom<input name="Nom" autocomplete="family-name" required></label>' +
          '</div>' +
          '<div class="form__row">' +
            '<label class="field">E-mail<input type="email" name="E-mail" autocomplete="email" required></label>' +
            '<label class="field">Téléphone<input type="tel" name="Téléphone" autocomplete="tel" required></label>' +
          '</div>' +
          '<label class="field">Votre objectif<select name="Objectif">' +
            '<option>Reprendre le sport en douceur</option><option>Perdre du poids durablement</option>' +
            '<option>Gagner en force et en tonus</option><option>Post-partum</option>' +
            '<option>Ménopause / équilibre hormonal</option><option>Soulager le dos ou les articulations</option>' +
          '</select></label>' +
          '<label class="field">Moment préféré<select name="Créneau préféré">' +
            '<option>Tôt le matin (6 h – 9 h)</option><option>Journée (9 h – 17 h)</option>' +
            '<option>Soirée (17 h – 21 h)</option><option>Week-end</option>' +
          '</select></label>' +
          '<button class="btn btn--block" type="submit">Réserver ma séance offerte</button>' +
          '<p class="form__status" role="status"></p>' +
        '</form>' +
      '</div>' +
    '</dialog>' +

    '<dialog class="modal" id="modal-formules" aria-labelledby="formules-title">' +
      '<div class="modal__inner">' +
        '<button class="icon-btn modal__close" type="button" data-close aria-label="Fermer">' + CLOSE_ICON + '</button>' +
        '<p class="eyebrow">Tarifs</p>' +
        '<h2 id="formules-title">Recevez nos <em>formules</em></h2>' +
        '<p class="lead">Nous vous envoyons le détail des abonnements et des packs, et nous vous aidons à choisir celui qui vous correspond.</p>' +
        '<form class="form" data-form data-subject="Demande des formules et tarifs" novalidate>' +
          '<label class="field">Prénom<input name="Prénom" autocomplete="given-name" required></label>' +
          '<div class="form__row">' +
            '<label class="field">E-mail<input type="email" name="E-mail" autocomplete="email" required></label>' +
            '<label class="field">Téléphone <span class="opt">(facultatif)</span><input type="tel" name="Téléphone" autocomplete="tel"></label>' +
          '</div>' +
          '<label class="consent"><input type="checkbox" name="Consentement" value="Oui" required>' +
            '<span>J\'accepte que NOVA Studio utilise ces informations pour me recontacter. Voir la <a href="mentions-legales.html#confidentialite">politique de confidentialité</a>.</span></label>' +
          '<button class="btn btn--block" type="submit">Recevoir les formules</button>' +
          '<p class="form__status" role="status"></p>' +
        '</form>' +
      '</div>' +
    '</dialog>';

  document.body.insertAdjacentHTML('beforeend', modalsHTML);

  var lastTrigger = null;
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-open]');
    if (trigger) {
      var dlg = document.getElementById('modal-' + trigger.getAttribute('data-open'));
      if (dlg && typeof dlg.showModal === 'function') {
        e.preventDefault();
        setMenu(false);
        lastTrigger = trigger;
        dlg.showModal();
      }
      return;
    }
    if (e.target.closest('[data-close]')) e.target.closest('dialog').close();
  });
  document.querySelectorAll('dialog.modal').forEach(function (dlg) {
    // Clic sur le fond pour fermer
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener('close', function () { if (lastTrigger) lastTrigger.focus(); });
  });

  /* ---------- Formulaires ---------- */
  function sendForm(form) {
    var lines = [];
    Array.prototype.forEach.call(form.elements, function (el) {
      if (!el.name || el.type === 'submit') return;
      if (el.type === 'checkbox' && !el.checked) return;
      if (el.value.trim()) lines.push(el.name + ' : ' + el.value.trim());
    });
    var subject = form.getAttribute('data-subject') || 'Demande depuis le site';
    location.href = 'mailto:' + CONTACT_EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(lines.join('\n'));
  }

  document.addEventListener('submit', function (e) {
    var form = e.target.closest('[data-form]');
    if (!form) return;
    e.preventDefault();
    var status = form.querySelector('.form__status');
    var firstInvalid = null;
    Array.prototype.forEach.call(form.elements, function (el) {
      if (!el.willValidate) return;
      var bad = !el.checkValidity() || (el.required && el.type !== 'checkbox' && !el.value.trim());
      if (el.type !== 'checkbox') el.setAttribute('aria-invalid', bad ? 'true' : 'false');
      if (bad && !firstInvalid) firstInvalid = el;
    });
    if (firstInvalid) {
      firstInvalid.focus();
      if (status) {
        status.className = 'form__status is-error';
        status.textContent = firstInvalid.type === 'checkbox'
          ? 'Merci de cocher la case de consentement.'
          : 'Merci de vérifier les champs obligatoires (e-mail valide, téléphone…).';
      }
      return;
    }
    sendForm(form);
    if (status) {
      status.className = 'form__status';
      status.textContent = 'Merci ! Votre messagerie s\'ouvre avec la demande pré-remplie : il ne reste qu\'à l\'envoyer.';
    }
  });
  document.addEventListener('input', function (e) {
    if (e.target.getAttribute('aria-invalid') === 'true' && e.target.checkValidity()) {
      e.target.setAttribute('aria-invalid', 'false');
    }
  });

  /* ---------- Carrousel d'avis ---------- */
  document.querySelectorAll('[data-carousel]').forEach(function (c) {
    var track = c.querySelector('.carousel__track');
    function step(dir) {
      var card = track.firstElementChild;
      var w = card ? card.getBoundingClientRect().width + 16 : track.clientWidth;
      track.scrollBy({ left: dir * w, behavior: 'smooth' });
    }
    c.querySelector('[data-prev]').addEventListener('click', function () { step(-1); });
    c.querySelector('[data-next]').addEventListener('click', function () { step(1); });
  });

  /* ---------- Filtres du blog ---------- */
  var filters = document.querySelectorAll('[data-filter]');
  if (filters.length) {
    var posts = document.querySelectorAll('[data-cat]');
    var empty = document.querySelector('[data-empty]');
    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cat = btn.getAttribute('data-filter');
        filters.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
        var shown = 0;
        posts.forEach(function (p) {
          var match = cat === 'tous' || p.getAttribute('data-cat') === cat;
          p.hidden = !match;
          if (match) shown++;
        });
        if (empty) empty.hidden = shown > 0;
      });
    });
  }

  /* ---------- Sous-menu collant (page Programmes) ---------- */
  var subLinks = document.querySelectorAll('.subnav a[href^="#"]');
  if (subLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    subLinks.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          subLinks.forEach(function (a) { a.classList.remove('is-active'); });
          var link = map[en.target.id];
          if (link) {
            link.classList.add('is-active');
            link.scrollIntoView({ block: 'nearest', inline: 'nearest' });
          }
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) spy.observe(el);
    });
  }

  /* ---------- Apparition au défilement ---------- */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Année du copyright ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
