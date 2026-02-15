// JavaScript do rozwijania kart usług i FAQ
// Dodaj ten kod na końcu pliku js/home.js LUB js/main.js

document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // ROZWIJANIE KART USŁUG
  // ========================================
  
  const serviceCards = document.querySelectorAll('[data-service-card]');
  
  serviceCards.forEach(card => {
    const button = card.querySelector('.service-details-toggle');
    
    if (button) {
      button.addEventListener('click', function() {
        // Toggle klasy is-expanded
        card.classList.toggle('is-expanded');
        
        // Zmiana tekstu przycisku
        const isExpanded = card.classList.contains('is-expanded');
        button.textContent = isExpanded ? 'Zwiń' : 'Szczegóły';
        
        // Zmiana aria-expanded
        button.setAttribute('aria-expanded', isExpanded);
      });
    }
  });
  
  // ========================================
  // ROZWIJANIE KART CENNIKA
  // ========================================
  
  const pricingCards = document.querySelectorAll('[data-pricing-card]');
  
  pricingCards.forEach(card => {
    const button = card.querySelector('.pricing-details-toggle');
    
    if (button) {
      button.addEventListener('click', function() {
        card.classList.toggle('is-expanded');
        
        const isExpanded = card.classList.contains('is-expanded');
        button.textContent = isExpanded ? 'Zwiń' : 'Szczegóły';
        button.setAttribute('aria-expanded', isExpanded);
      });
    }
  });
  
  // ========================================
  // ROZWIJANIE FAQ
  // ========================================
  
  const faqItems = document.querySelectorAll('[data-faq]');
  
  faqItems.forEach(item => {
    const button = item.querySelector('button');
    
    if (button) {
      button.addEventListener('click', function() {
        // Zamknij wszystkie inne FAQ
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('is-open')) {
            otherItem.classList.remove('is-open');
            otherItem.querySelector('button').setAttribute('aria-expanded', 'false');
          }
        });
        
        // Toggle obecnego FAQ
        item.classList.toggle('is-open');
        button.setAttribute('aria-expanded', item.classList.contains('is-open'));
      });
    }
  });
  
  console.log('✅ Service cards expansion loaded:', serviceCards.length, 'cards found');
  console.log('✅ Pricing cards expansion loaded:', pricingCards.length, 'cards found');
  console.log('✅ FAQ expansion loaded:', faqItems.length, 'items found');
});