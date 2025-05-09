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
          setupRandomChoice();
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

// Função para escolha aleatória
function setupRandomChoice() {
  const randomBtn = document.getElementById('randomChoiceBtn');
  const heroBtn = document.querySelector('.hero-choice .choice-btn');
  const villainBtn = document.querySelector('.villain-choice .choice-btn');
  
  if (!randomBtn || !heroBtn || !villainBtn) return;
  
  randomBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Efeito visual de rolagem
    randomBtn.disabled = true;
    randomBtn.querySelector('span').textContent = 'Decidindo destino...';
    randomBtn.querySelector('i').classList.add('fa-spin');
    
    // Cria efeito de piscar nos cards
    const cards = document.querySelectorAll('.choice-card');
    let flashes = 0;
    const maxFlashes = 5;
    const flashInterval = 300;
    
    const flashCards = setInterval(() => {
      cards.forEach(card => {
        card.style.boxShadow = `0 0 ${flashes % 2 === 0 ? '30px' : '15px'} ${
          card.classList.contains('hero-choice') ? 'var(--hero-blue)' : 'var(--villain-red)'
        }`;
      });
      
      flashes++;
      if (flashes >= maxFlashes * 2) {
        clearInterval(flashCards);
        cards.forEach(card => card.style.boxShadow = '');
        makeRandomChoice();
      }
    }, flashInterval);
  });
  
  function makeRandomChoice() {
    const choices = ['hero', 'villain'];
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    
    // Efeito visual de seleção
    const selectedCard = randomChoice === 'hero' 
      ? document.querySelector('.hero-choice')
      : document.querySelector('.villain-choice');
    
    selectedCard.classList.add('chosen-randomly');
    
    // Animação antes de redirecionar
    setTimeout(() => {
      window.location.href = randomChoice === 'hero' 
        ? heroBtn.href 
        : villainBtn.href;
    }, 1000);
  }
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