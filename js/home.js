(function () {
  'use strict';

  // Smooth scrolling dla linków #...
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      var target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (document.getElementById('main-nav').classList.contains('is-open')) {
          document.getElementById('main-nav').classList.remove('is-open');
        }
      }
    });
  });

  // selectPackage – przewiń do kontaktu
  window.selectPackage = function (packageName) {
    var contactSection = document.getElementById('kontakt');
    if (!contactSection) return;

    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Animacje przy scrollu (fade-in)
  var scrollObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.fade-in-scroll').forEach(function (el) {
    scrollObserver.observe(el);
  });

  // Wysłanie formularza głównego (kontakt)
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var packageSelect = document.getElementById('packageSelect');
      var selectedText = packageSelect && packageSelect.value
        ? packageSelect.options[packageSelect.selectedIndex].text
        : '';
      var msg = selectedText
        ? 'Dziękujemy za zainteresowanie pakietem ' + selectedText + '! Skontaktujemy się z Tobą w ciągu 24 godzin.'
        : 'Dziękujemy za wiadomość! Skontaktujemy się z Tobą w ciągu 24 godzin.';
      alert(msg);
      form.reset();
    });
  }

  // Krótki formularz CTA („Umów się na 15-min. rozmowę”)
  var ctaShortForm = document.getElementById('ctaShortForm');
  if (ctaShortForm) {
    ctaShortForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Dziękujemy! Skontaktujemy się z Tobą do 24h (pn–pt, 8–16).');
      ctaShortForm.reset();
    });
  }

  // Nawigacja – dropdown Oferta / Dla kogo (na mobile: klik otwiera menu)
  document.querySelectorAll('.nav-dropdown-trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      if (window.matchMedia('(max-width: 768px)').matches) {
        e.preventDefault();
        var dropdown = this.closest('.nav-dropdown');
        if (!dropdown) return;
        dropdown.classList.toggle('is-open');
        document.querySelectorAll('.nav-dropdown').forEach(function (d) {
          if (d !== dropdown) d.classList.remove('is-open');
        });
      }
    });
  });

  // Zakładki Oferta / Dla kogo – przełączanie tabów (bez przejścia na podstrony)
  document.querySelectorAll('[data-tabs] .tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var container = this.closest('[data-tabs]');
      if (!container) return;
      var tabId = this.getAttribute('data-tab');
      var panel = container.querySelector('.tab-panel#' + tabId);
      container.querySelectorAll('.tab-btn').forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      container.querySelectorAll('.tab-panel').forEach(function (p) {
        p.classList.remove('active');
        p.hidden = true;
      });
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');
      if (panel) {
        panel.classList.add('active');
        panel.hidden = false;
      }
    });
  });

  // Karty usług – rozwijanie szczegółów na stronie głównej (bez przejścia na podstronę)
  document.querySelectorAll('.service-details-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = this.closest('[data-service-card]');
      if (!card) return;
      var isExpanded = card.classList.contains('is-expanded');
      card.classList.toggle('is-expanded');
      isExpanded = card.classList.contains('is-expanded');
      this.setAttribute('aria-expanded', isExpanded);
      this.textContent = isExpanded ? 'Zwiń' : 'Szczegóły';
    });
  });

  // Karty cennika – rozwijanie szczegółów (pakiet indywidualny)
  document.querySelectorAll('.pricing-details-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = this.closest('[data-pricing-card]');
      if (!card) return;
      var isExpanded = card.classList.contains('is-expanded');
      card.classList.toggle('is-expanded');
      isExpanded = card.classList.contains('is-expanded');
      this.setAttribute('aria-expanded', isExpanded);
      this.textContent = isExpanded ? 'Zwiń' : 'Szczegóły';
    });
  });

  // FAQ – accordion (toggle otwarte/zamknięte)
  document.querySelectorAll('.faq-item[data-faq]').forEach(function (item) {
    var btn = item.querySelector('button');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.faq-item.is-open').forEach(function (openItem) {
        openItem.classList.remove('is-open');
        var openBtn = openItem.querySelector('button');
        if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Przełączanie logo (z tłem / jasne tło / bez tła / "monte chyba bez tła")
  var logoToggleEls = document.querySelectorAll('[data-logo-toggle]');
  if (logoToggleEls.length) {
    var logoStateKey = 'monteLogoVariant';
    var variantOrder = ['default', 'alt', 'clean', 'chyba'];
    var storedVariant = null;
    try {
      storedVariant = localStorage.getItem(logoStateKey);
    } catch (e) {
      storedVariant = null;
    }
    var currentVariant = variantOrder.indexOf(storedVariant) !== -1 ? storedVariant : 'default';

    var getLogoImg = function (el) {
      if (!el) return null;
      if (el.tagName === 'IMG') return el;
      return el.querySelector('img');
    };

    var applyLogoVariant = function (variant) {
      logoToggleEls.forEach(function (el) {
        var img = getLogoImg(el);
        if (!img) return;
        var srcAttr = 'data-logo-' + variant;
        var src = img.getAttribute(srcAttr) || img.getAttribute('data-logo-default');
        if (src) img.setAttribute('src', src);
        img.setAttribute('data-logo-current', variant);
      });
    };

    var toggleLogoVariant = function () {
      var i = variantOrder.indexOf(currentVariant);
      currentVariant = variantOrder[(i + 1) % variantOrder.length];
      try {
        localStorage.setItem(logoStateKey, currentVariant);
      } catch (e) {
        // lokalny storage moze byc zablokowany
      }
      applyLogoVariant(currentVariant);
    };

    applyLogoVariant(currentVariant);

    logoToggleEls.forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        toggleLogoVariant();
      });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleLogoVariant();
        }
      });
    });
  }

  // Przełącznik motywu (czekoladowy / pomarańczowy / turkusowy / niebieski)
  var themeToggle = document.getElementById('theme-toggle');
  var themeLabel = document.getElementById('theme-label');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var body = document.body;
      var current = body.getAttribute('data-theme') || 'chocolate';
      var order = ['chocolate', 'orange', 'teal', 'jbs'];
      var i = order.indexOf(current);
      var next = order[(i + 1) % order.length];
      body.setAttribute('data-theme', next);
      var dot = themeToggle.querySelector('.theme-dot');
      if (dot) dot.className = 'theme-dot ' + next;
      if (themeLabel) {
        var labels = { chocolate: ' Czekoladowy', orange: ' Pomarańczowy', teal: ' Turkusowy', jbs: ' Niebieski' };
        themeLabel.textContent = labels[next] || ' Motyw';
      }
    });
  }
})();
