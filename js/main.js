(function () {
  'use strict';

  var header = document.getElementById('site-header');
  var menuToggle = document.getElementById('menu-toggle');
  var mainNav = document.getElementById('main-nav');

  if (!header) return;

  // Sticky header – dodaj cień po scrollu
  function onScroll() {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menu mobilne
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      mainNav.classList.toggle('is-open');
      var isOpen = mainNav.classList.contains('is-open');
      menuToggle.setAttribute('aria-label', isOpen ? 'Zamknij menu' : 'Otwórz menu');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });
  }
})();
