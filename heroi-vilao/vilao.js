// Tela de carregamento avançada
document.addEventListener('DOMContentLoaded', function() {
  const loadingScreen = document.querySelector('.loading-screen');
  const progressBar = document.querySelector('.progress');
  const loadingText = document.querySelector('.loading-text');
  
  // Simular progresso de carregamento
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 10;
    if (progress > 100) progress = 100;
    progressBar.style.width = `${progress}%`;
    
    if (progress === 100) {
      clearInterval(interval);
      loadingText.textContent = "Pronto para o abismo...";
      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
          loadingScreen.style.display = 'none';
          document.body.style.overflow = 'auto';
          // Iniciar animações após carregamento
          initAnimations();
        }, 1000);
      }, 500);
    }
  }, 200);
  
  // Inicializar particles.js
  if (window.particlesJS) {
    particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#ff0000"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          }
        },
        "opacity": {
          "value": 0.5,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 2,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ff0000",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1,
          "direction": "none",
          "random": true,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 1
            }
          },
          "push": {
            "particles_nb": 4
          }
        }
      },
      "retina_detect": true
    });
  }
});

// Menu mobile
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
});

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Scroll down button
document.querySelector('.scroll-down').addEventListener('click', () => {
  window.scrollBy({
    top: window.innerHeight - 100,
    behavior: 'smooth'
  });
});

// Efeito de aparecimento ao scroll
const fadeInOnScroll = () => {
  const fadeElements = document.querySelectorAll('.fade-in-scroll');
  
  fadeElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 100) {
      element.classList.add('fade-in');
    }
  });
};

// Mudar navbar no scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.main-nav');
  if (window.scrollY > 100) {
    nav.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
    nav.style.padding = '0.8rem 2rem';
    nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
  } else {
    nav.style.backgroundColor = 'rgba(10, 10, 10, 0.9)';
    nav.style.padding = '1.5rem 2rem';
    nav.style.boxShadow = 'none';
  }
  
  fadeInOnScroll();
});

document.addEventListener('DOMContentLoaded', function() {
  // Elementos do vídeo
  const videoContainer = document.getElementById('vilaoVideoContainer');
  const video = document.getElementById('vilaoTrailer');
  const playButton = document.getElementById('vilaoPlayButton');
  
  // Verifica se os elementos existem
  if (!videoContainer || !video || !playButton) {
    console.error('Elementos do vídeo não encontrados!');
    return;
  }

  // 1. Função para alternar play/pause
  const togglePlay = () => {
    if (video.paused) {
      video.play()
        .then(() => {
          playButton.style.display = 'none';
          enterFullscreen();
        })
        .catch(error => {
          console.error('Erro ao reproduzir:', error);
          // Mostra o botão se der erro
          playButton.style.display = 'flex'; 
        });
    } else {
      video.pause();
    }
  };

  // 2. Função para entrar em tela cheia
  const enterFullscreen = () => {
    if (!document.fullscreenElement) {
      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen().catch(e => {
          console.log('Erro ao entrar em tela cheia:', e);
        });
      } else if (videoContainer.webkitRequestFullscreen) { /* Safari */
        videoContainer.webkitRequestFullscreen();
      } else if (videoContainer.msRequestFullscreen) { /* IE11 */
        videoContainer.msRequestFullscreen();
      }
    }
  };

  // 3. Função para sair do fullscreen
  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
  };

  // 4. Evento de clique no container
  videoContainer.addEventListener('click', () => {
    togglePlay();
  });

  // 5. Eventos de teclado (Espaço/Enter)
  videoContainer.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault(); // Evita scroll com espaço
      togglePlay();
    }
  });

  // 6. Atualizar estado do botão play
  video.addEventListener('play', () => {
    playButton.style.display = 'none';
  });

  video.addEventListener('pause', () => {
    // Só mostra o botão se não estiver em fullscreen
    if (!document.fullscreenElement) {
      playButton.style.display = 'flex';
    }
  });

  // 7. Evento quando o vídeo termina
  video.addEventListener('ended', () => {
    exitFullscreen();
    playButton.style.display = 'flex';
  });

  // 8. Observar mudanças no fullscreen
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && !video.paused) {
      video.pause();
    }
  });

  // 9. Focar o container para funcionar teclado
  videoContainer.setAttribute('tabindex', '0');
  videoContainer.focus();

  // 10. Controle de volume (opcional)
  const volumeControl = () => {
    const volumeSlider = document.createElement('input');
    volumeSlider.type = 'range';
    volumeSlider.min = '0';
    volumeSlider.max = '1';
    volumeSlider.step = '0.1';
    volumeSlider.value = video.volume;
    volumeSlider.style.position = 'absolute';
    volumeSlider.style.bottom = '20px';
    volumeSlider.style.right = '20px';
    volumeSlider.style.width = '100px';
    volumeSlider.style.zIndex = '10';
    
    volumeSlider.addEventListener('input', (e) => {
      video.volume = e.target.value;
    });
    
    videoContainer.appendChild(volumeSlider);
    
    // Mostrar/ocultar controle
    videoContainer.addEventListener('mouseenter', () => {
      volumeSlider.style.opacity = '1';
    });
    
    videoContainer.addEventListener('mouseleave', () => {
      volumeSlider.style.opacity = '0';
    });
  };

  // Inicializar controle de volume (descomente se quiser)
  // volumeControl();
});

// Animar números estatísticos
function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-count'));
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(timer);
        current = target;
      }
      stat.textContent = Math.floor(current);
    }, 16);
  });
}

// Animar barras de poder
function animatePowerBars() {
  const powerBars = document.querySelectorAll('.power-fill');
  
  powerBars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    bar.style.width = width;
  });
}

// Galeria interativa
function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const prevBtn = document.querySelector('.gallery-prev');
  const nextBtn = document.querySelector('.gallery-next');
  let currentIndex = 0;
  
  if (galleryItems.length > 0) {
    galleryItems[currentIndex].classList.add('active');
    
    function showItem(index) {
      galleryItems.forEach(item => item.classList.remove('active'));
      galleryItems[index].classList.add('active');
    }
    
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        showItem(currentIndex);
      });
      
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        showItem(currentIndex);
      });
    }
    
    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        showItem(currentIndex);
      } else if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        showItem(currentIndex);
      }
    });
  }
}

// Inicializar todas as animações
function initAnimations() {
  // Adicionar classe de animação a elementos
  const animateElements = document.querySelectorAll('section, .title-section, .character-img, .character-description');
  animateElements.forEach(el => {
    el.classList.add('fade-in-scroll');
  });
  
  // Disparar animações iniciais
  fadeInOnScroll();
  animateStats();
  animatePowerBars();
  initGallery();
  initTrailerControls();
  
  // Observador de elementos para animação
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.fade-in-scroll').forEach(el => {
    observer.observe(el);
  });
}

// Inicializar quando a página estiver totalmente carregada
window.addEventListener('load', initAnimations);
