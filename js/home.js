(function () {
  'use strict';

  // Smooth scrolling dla linkĂłw #...
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

  // selectPackage â€“ przewiĹ„ do kontaktu
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

  // WysĹ‚anie formularza gĹ‚Ăłwnego (kontakt)
  var form = document.getElementById('contactForm');
  if (form) {
    var formMessage = document.getElementById('contactFormMessage');
    var submitButton = form.querySelector('button[type="submit"]');

    var setFormMessage = function (message, isSuccess) {
      if (!formMessage) return;
      formMessage.textContent = message || '';
      formMessage.classList.remove('is-success', 'is-error');
      if (message) {
        formMessage.classList.add(isSuccess ? 'is-success' : 'is-error');
      }
    };

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      setFormMessage('', false);
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Wysylanie...';
      }

      try {
        var formData = new FormData(form);
        var payload = {
          email: formData.get('email') || '',
          phone: formData.get('phone') || '',
          topic: formData.get('topic') || ''
        };

        var response = await fetch('/api/contact.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        var data;
        try {
          data = await response.json();
        } catch (jsonError) {
          data = { ok: false, message: 'Nie udalo sie odczytac odpowiedzi serwera.' };
        }

        if (!response.ok || !data.ok) {
          setFormMessage(data.message || 'Nie udalo sie wyslac formularza. Sprobuj ponownie.', false);
          return;
        }

        setFormMessage(data.message || 'Dziekujemy. Formularz zostal wyslany poprawnie.', true);
        form.reset();
      } catch (error) {
        setFormMessage('Blad polaczenia z serwerem. Sprobuj ponownie za chwile.', false);
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = 'Wyslij!';
        }
      }
    });
  }

  // Krotki formularz CTA
  var ctaShortForm = document.getElementById('ctaShortForm');
  if (ctaShortForm) {
    ctaShortForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('DziÄ™kujemy! Skontaktujemy siÄ™ z TobÄ… do 24h (pnâ€“pt, 8â€“16).');
      ctaShortForm.reset();
    });
  }

  // Nawigacja â€“ dropdown Oferta / Dla kogo (na mobile: klik otwiera menu)
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

  // ZakĹ‚adki Oferta / Dla kogo â€“ przeĹ‚Ä…czanie tabĂłw (bez przejĹ›cia na podstrony)
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

  // Rozwijanie kart uslug (akordeon: tylko jedna karta naraz)
  var serviceCards = document.querySelectorAll('[data-service-card]');
  serviceCards.forEach(function (card) {
    var button = card.querySelector('.service-details-toggle');
    if (!button) return;

    button.addEventListener('click', function () {
      var isAlreadyExpanded = card.classList.contains('is-expanded');

      serviceCards.forEach(function (otherCard) {
        if (otherCard === card) return;
        otherCard.classList.remove('is-expanded');
        var otherButton = otherCard.querySelector('.service-details-toggle');
        if (!otherButton) return;
        otherButton.textContent = 'Szczeg\u00f3\u0142y';
        otherButton.setAttribute('aria-expanded', 'false');
      });

      if (isAlreadyExpanded) {
        card.classList.remove('is-expanded');
        button.textContent = 'Szczeg\u00f3\u0142y';
        button.setAttribute('aria-expanded', 'false');
        return;
      }

      card.classList.add('is-expanded');
      button.textContent = 'Zwi\u0144';
      button.setAttribute('aria-expanded', 'true');
    });
  });

  // Rozwijanie kart cennika (akordeon: tylko jedna karta naraz)
  var pricingCards = document.querySelectorAll('[data-pricing-card]');
  pricingCards.forEach(function (card) {
    var button = card.querySelector('.pricing-details-toggle');
    if (!button) return;

    button.addEventListener('click', function () {
      var isAlreadyExpanded = card.classList.contains('is-expanded');

      pricingCards.forEach(function (otherCard) {
        if (otherCard === card) return;
        otherCard.classList.remove('is-expanded');
        var otherButton = otherCard.querySelector('.pricing-details-toggle');
        if (!otherButton) return;
        otherButton.textContent = 'Szczeg\u00f3\u0142y';
        otherButton.setAttribute('aria-expanded', 'false');
      });

      if (isAlreadyExpanded) {
        card.classList.remove('is-expanded');
        button.textContent = 'Szczeg\u00f3\u0142y';
        button.setAttribute('aria-expanded', 'false');
        return;
      }

      card.classList.add('is-expanded');
      button.textContent = 'Zwi\u0144';
      button.setAttribute('aria-expanded', 'true');
    });
  });

  // Rozwijanie FAQ
  var faqItems = document.querySelectorAll('[data-faq]');
  faqItems.forEach(function (item) {
    var button = item.querySelector('button');
    if (!button) return;

    button.addEventListener('click', function () {
      faqItems.forEach(function (otherItem) {
        if (otherItem !== item && otherItem.classList.contains('is-open')) {
          otherItem.classList.remove('is-open');
          var otherButton = otherItem.querySelector('button');
          if (otherButton) {
            otherButton.setAttribute('aria-expanded', 'false');
          }
        }
      });

      item.classList.toggle('is-open');
      button.setAttribute('aria-expanded', item.classList.contains('is-open'));
    });
  });

  console.log('\u2705 Service cards expansion loaded:', serviceCards.length, 'cards found');
  console.log('\u2705 Pricing cards expansion loaded:', pricingCards.length, 'cards found');
  console.log('\u2705 FAQ expansion loaded:', faqItems.length, 'items found');
  // PrzeĹ‚Ä…czanie logo (z tĹ‚em / jasne tĹ‚o / bez tĹ‚a / "monte chyba bez tĹ‚a")
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
      document.documentElement.setAttribute('data-logo-variant', variant);
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

  // PrzeĹ‚Ä…cznik motywu (czekoladowy / pomaraĹ„czowy / turkusowy / niebieski)
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
        var labels = { chocolate: ' Czekoladowy', orange: ' PomaraĹ„czowy', teal: ' Turkusowy', jbs: ' Niebieski' };
        themeLabel.textContent = labels[next] || ' Motyw';
      }
    });
  }
})();
