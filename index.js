// Tela de carregamento otimizada
document.addEventListener('DOMContentLoaded', function() {
  const loadingScreen = document.querySelector('.loading-screen');
  const progressBar = document.querySelector('.progress-bar');
  
  if (!loadingScreen || !progressBar) return;
  
  let progress = 0;
  const resources = [
    'css/main.css',
    'js/main.js',
    'imagens/heroi-card.jpg',
    'imagens/vilao-card.jpg'
  ];
  
  function updateProgress() {
    progress += 100 / resources.length;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
    
    if (progress >= 100) {
      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
          loadingScreen.style.display = 'none';
          initHoverEffects();
        }, 500);
      }, 300);
    }
  }
  
  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = resource.includes('.css') ? 'style' : 
              resource.includes('.js') ? 'script' : 'image';
    link.href = resource;
    link.onload = updateProgress;
    link.onerror = updateProgress;
    document.head.appendChild(link);
  });
});

// Efeitos de hover
function initHoverEffects() {
  const cards = document.querySelectorAll('.choice-card');
  
  if (!cards.length) return;
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('active-hover');
    });
    
    card.addEventListener('mouseleave', () => {
      card.classList.remove('active-hover');
    });
    
    card.addEventListener('touchstart', () => {
      card.classList.add('active-hover');
    }, { passive: true });
    
    card.addEventListener('touchend', () => {
      setTimeout(() => card.classList.remove('active-hover'), 300);
    });
  });
}

// Pré-carregar páginas de destino
window.addEventListener('load', function() {
  if ('connection' in navigator && navigator.connection.saveData) return;
  
  const links = document.querySelectorAll('.choice-btn[href]');
  links.forEach(link => {
    const prefetchLink = document.createElement('link');
    prefetchLink.rel = 'prefetch';
    prefetchLink.href = link.href;
    document.head.appendChild(prefetchLink);
  });
});