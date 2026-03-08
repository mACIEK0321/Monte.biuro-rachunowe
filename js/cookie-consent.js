(function () {
  'use strict';

  var STORAGE_KEY = 'montebiuro-cookie-consent';

  function getBannerHtml() {
    return (
      '<div id="cookie-banner" class="cookie-banner" role="dialog" aria-label="Informacja o plikach cookie">' +
      '<div class="cookie-banner-inner">' +
      '<p>Używamy plików cookie, aby poprawić jakość przeglądania i analizować ruch na stronie. ' +
      'Szczegóły w <a href="polityka-prywatnosci.html">Polityce prywatności</a>.</p>' +
      '<div class="cookie-banner-actions">' +
      '<button type="button" class="btn btn-accept">Akceptuj</button> ' +
      '<a href="#" class="btn btn-outline cookie-manage">Zarządzaj</a>' +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }

  function hasConsent() {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch (e) {
      return false;
    }
  }

  function setConsent() {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch (e) {}
  }

  function hideBanner() {
    var banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.classList.add('cookie-banner--hidden');
    }
  }

  function showBanner() {
    var banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.classList.remove('cookie-banner--hidden');
    }
  }

  function init() {
    if (hasConsent()) {
      return;
    }

    var wrap = document.createElement('div');
    wrap.innerHTML = getBannerHtml();
    var banner = wrap.firstElementChild;
    document.body.appendChild(banner);

    var acceptBtn = banner.querySelector('.btn-accept');
    var manageLink = banner.querySelector('.cookie-manage');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        setConsent();
        hideBanner();
      });
    }

    if (manageLink) {
      manageLink.addEventListener('click', function (e) {
        e.preventDefault();
        setConsent();
        hideBanner();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
