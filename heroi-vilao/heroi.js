// Tela de Carregamento Imersiva
document.addEventListener('DOMContentLoaded', function() {
  const loadingScreen = document.querySelector('.loading-screen');
  const progressFill = document.querySelector('.progress-fill');
  const progressPercent = document.querySelector('.progress-percent');
  const loadingText = document.querySelector('.loading-text');
  const loadingMessages = [
    "Conectando com o núcleo estelar...",
    "Sincronizando constelações...",
    "Ativando poderes celestiais...",
    "Preparando a jornada...",
    "Quase lá, herói..."
  ];
  
  // Simular progresso de carregamento com mensagens dinâmicas
  let progress = 0;
  let messageIndex = 0;
  
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 100) progress = 100;
    
    progressFill.style.width = `${progress}%`;
    progressPercent.textContent = `${Math.floor(progress)}%`;
    
    // Mudar mensagem em intervalos específicos
    if (progress >= 20 * (messageIndex + 1) && messageIndex < loadingMessages.length - 1) {
      messageIndex++;
      loadingText.textContent = loadingMessages[messageIndex];
    }
    
    if (progress === 100) {
      clearInterval(interval);
      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
          loadingScreen.style.display = 'none';
          document.body.style.overflow = 'auto';
          initAnimations();
        }, 1000);
      }, 500);
    }
  }, 200);
  
  
  
  // Inicializar AOS (Animate On Scroll) com configurações aprimoradas
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: false,
    mirror: true,
    offset: 100,
    anchorPlacement: 'top-bottom'
  });
});

// Menu Mobile Aprimorado
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
  
  // Adicionar efeito sonoro
  const audio = new Audio('audio/menu-toggle.mp3');
  audio.volume = 0.3;
  audio.play();
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

// Scroll suave para links internos com offset
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

// Cursor Personalizado 3D
const initCustomCursor = () => {
  const cursor = document.querySelector('.custom-cursor');
  const cursorCore = document.querySelector('.cursor-core');
  const cursorAura = document.querySelector('.cursor-aura');
  
  if (cursor) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      
      // Efeito de arrasto para o núcleo
      gsap.to(cursorCore, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });
      
      // Efeito de arrasto mais lento para a aura
      gsap.to(cursorAura, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    // Elementos interativos
    const interactiveElements = document.querySelectorAll(
      'a, button, .nav-toggle, .gallery-slide, .cta-button, .tab-button, .gallery-prev, .gallery-next, .modal-close, .power-option, .slide-button0'
    );
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        
        // Efeito de escala
        gsap.to(cursorCore, { scale: 1.5, duration: 0.3 });
        gsap.to(cursorAura, { scale: 1.2, duration: 0.3 });
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        
        // Reverter efeito de escala
        gsap.to(cursorCore, { scale: 1, duration: 0.3 });
        gsap.to(cursorAura, { scale: 1, duration: 0.3 });
      });
    });
  }
};

// Controle do Modal do Trailer Holográfico
const initTrailerModal = () => {
  const modal = document.querySelector('.trailer-modal');
  const openButtons = document.querySelectorAll('.cta-button');
  const closeButton = document.querySelector('.modal-close');
  const video = document.getElementById('heroTrailer');
  
  if (modal && openButtons.length && closeButton && video) {
    // Abrir modal
    openButtons.forEach(button => {
      button.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Efeito sonoro
        const audio = new Audio('audio/modal-open.mp3');
        audio.volume = 0.5;
        audio.play();
        
        // Reproduzir vídeo
        setTimeout(() => {
          video.play();
        }, 500);
      });
    });
    
    // Fechar modal
    closeButton.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
      video.pause();
      
      // Efeito sonoro
      const audio = new Audio('audio/modal-close.mp3');
      audio.volume = 0.5;
      audio.play();
    });
    
    // Fechar ao clicar no overlay
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('modal-overlay')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        video.pause();
      }
    });
    
    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        video.pause();
      }
    });
  }
};

// Animar números estatísticos com GSAP
const animateStats = () => {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-count'));
    const duration = 2;
    
    gsap.fromTo(stat, 
      { textContent: 0 },
      {
        textContent: target,
        duration: duration,
        ease: "power1.out",
        snap: { textContent: 1 },
        onUpdate: function() {
          stat.textContent = Math.floor(this.targets()[0].textContent);
        }
      }
    );
  });
};

// Animar barras de poder com GSAP
const animatePowerBars = () => {
  const powerBars = document.querySelectorAll('.power-fill');
  
  powerBars.forEach(bar => {
    const level = bar.getAttribute('data-level');
    
    gsap.fromTo(bar,
      { width: "0%" },
      {
        width: `${level}%`,
        duration: 2,
        ease: "power2.out",
        delay: 0.5
      }
    );
    
    // Atualizar texto do nível
    const levelText = bar.nextElementSibling;
    if (levelText && levelText.classList.contains('power-level')) {
      gsap.fromTo(levelText,
        { textContent: "0%" },
        {
          textContent: `${level}%`,
          duration: 2,
          ease: "power1.out",
          snap: { textContent: 1 },
          delay: 0.5
        }
      );
    }
  });
};

// Galeria Interativa Aprimorada
const initGallery = () => {
  const galleryTrack = document.querySelector('.gallery-track');
  const gallerySlides = document.querySelectorAll('.gallery-slide');
  const prevBtn = document.querySelector('.gallery-prev');
  const nextBtn = document.querySelector('.gallery-next');
  const dotsContainer = document.querySelector('.gallery-dots');
  
  if (galleryTrack && gallerySlides.length && prevBtn && nextBtn) {
    let currentIndex = 0;
    const slideWidth = gallerySlides[0].offsetWidth;
    const gap = 32; // 2rem em pixels
    
    // Criar dots de navegação
    gallerySlides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('gallery-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        goToSlide(index);
      });
      dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.gallery-dot');
    
    // Função para ir para um slide específico com animação
    const goToSlide = (index) => {
      currentIndex = index;
      const offset = -(currentIndex * (slideWidth + gap));
      
      gsap.to(galleryTrack, {
        x: offset,
        duration: 0.8,
        ease: "power2.out"
      });
      
      // Atualizar dots ativos
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
      
      // Ativar animação AOS no slide atual
      AOS.refresh();
    };
    
    // Botão anterior
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + gallerySlides.length) % gallerySlides.length;
      goToSlide(currentIndex);
    });
    
    // Próximo botão
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % gallerySlides.length;
      goToSlide(currentIndex);
    });
    
    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + gallerySlides.length) % gallerySlides.length;
        goToSlide(currentIndex);
      } else if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % gallerySlides.length;
        goToSlide(currentIndex);
      }
    });
    
    // Redimensionamento da janela
    window.addEventListener('resize', () => {
      const newSlideWidth = gallerySlides[0].offsetWidth;
      const offset = -(currentIndex * (newSlideWidth + gap));
      galleryTrack.style.transform = `translateX(${offset}px)`;
    });
    
    // Efeito de hover nos slides
    gallerySlides.forEach(slide => {
      slide.addEventListener('mouseenter', () => {
        gsap.to(slide.querySelector('.slide-overlay'), {
          opacity: 1,
          duration: 0.3
        });
        
        gsap.to(slide.querySelector('.slide-caption'), {
          y: 0,
          duration: 0.5,
          ease: "back.out"
        });
      });
      
      slide.addEventListener('mouseleave', () => {
        gsap.to(slide.querySelector('.slide-overlay'), {
          opacity: 0,
          duration: 0.3
        });
        
        gsap.to(slide.querySelector('.slide-caption'), {
          y: "100%",
          duration: 0.5,
          ease: "back.in"
        });
      });
    });
  }
};

// Sistema de Abas Aprimorado
const initTabs = () => {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  const powerOptions = document.querySelectorAll('.power-option');
  const powerMeters = document.querySelectorAll('.power-meter');
  
  if (tabButtons.length && tabContents.length) {
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        // Remover classe ativa de todos os botões e conteúdos
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Adicionar classe ativa ao botão e conteúdo clicado
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');
        
        // Efeito sonoro
        const audio = new Audio('audio/tab-switch.mp3');
        audio.volume = 0.3;
        audio.play();
      });
    });
  }
  
  // Controle das opções de poder
  if (powerOptions.length && powerMeters.length) {
    powerOptions.forEach(option => {
      option.addEventListener('click', () => {
        const power = option.getAttribute('data-power');
        
        // Remover classe ativa de todas as opções e medidores
        powerOptions.forEach(opt => opt.classList.remove('active'));
        powerMeters.forEach(meter => meter.classList.remove('active'));
        
        // Adicionar classe ativa à opção e medidor selecionados
        option.classList.add('active');
        document.querySelector(`.power-meter[data-power="${power}"]`).classList.add('active');
        
        // Animação do orb de poder
        const orbCore = document.querySelector('.orb-core');
        gsap.to(orbCore, {
          scale: 1.5,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: "power1.out"
        });
      });
    });
  }
};

// Botão Voltar ao Topo com Efeito de Teletransporte
const initBackToTop = () => {
  const backToTopButton = document.querySelector('.back-to-top');
  
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    
    backToTopButton.addEventListener('click', () => {
      // Efeito de teletransporte
      const teleportEffect = backToTopButton.querySelector('.teleport-effect');
      gsap.to(teleportEffect, {
        scale: 3,
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          
          // Resetar efeito
          setTimeout(() => {
            gsap.set(teleportEffect, { scale: 1, opacity: 0 });
          }, 1000);
        }
      });
      
      // Efeito sonoro
      const audio = new Audio('audio/teleport.mp3');
      audio.volume = 0.5;
      audio.play();
    });
  }
};

// Efeito de Máquina de Escrever
const initTypewriter = () => {
  const elements = document.querySelectorAll('.typewriter');
  
  elements.forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    
    let i = 0;
    const speed = 30; // Velocidade em ms
    
    const type = () => {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        // Remover cursor piscante após terminar
        el.style.setProperty('--cursor-opacity', '0');
      }
    };
    
    // Iniciar após um pequeno delay para sincronizar com animações
    setTimeout(type, 500);
  });
};

// Efeito de Revelação de Texto
const initRevealText = () => {
  const elements = document.querySelectorAll('.reveal-text');
  
  elements.forEach(el => {
    // Criar elemento de overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'var(--dark-blue)';
    overlay.style.transform = 'translateX(-100%)';
    overlay.style.zIndex = '1';
    el.appendChild(overlay);
    
    // Animação GSAP
    gsap.to(overlay, {
      x: '100%',
      duration: 1.5,
      ease: 'power2.inOut',
      delay: 0.3
    });
  });
};

// Efeito de Onda de Áudio
const initAudioWave = () => {
  const audioButton = document.querySelector('.audio-button');
  const audioWave = document.querySelector('.audio-wave');
  
  if (audioButton && audioWave) {
    let isPlaying = false;
    
    audioButton.addEventListener('click', () => {
      isPlaying = !isPlaying;
      
      if (isPlaying) {
        audioButton.innerHTML = '<i class="fas fa-pause"></i>';
        audioWave.style.animationPlayState = 'running';
        
        // Efeito sonoro
        const audio = new Audio('audio/Audio-inabalavel .mp3');
        audio.play();
        
        audio.addEventListener('ended', () => {
          isPlaying = false;
          audioButton.innerHTML = '<i class="fas fa-play"></i>';
          audioWave.style.animationPlayState = 'paused';
        });
      } else {
        audioButton.innerHTML = '<i class="fas fa-play"></i>';
        audioWave.style.animationPlayState = 'paused';
      }
    });
  }
};

// Efeito de Flutuação para o Personagem 3D
const initCharacterFloat = () => {
  const character = document.querySelector('.character-3d');
  
  if (character) {
    // Criar animação GSAP
    gsap.to(character, {
      y: '-=20',
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }
};

// Inicializar todas as animações e funcionalidades
const initAnimations = () => {
  initCustomCursor();
  initTrailerModal();
  animateStats();
  animatePowerBars();
  initGallery();
  initTabs();
  initBackToTop();
  initTypewriter();
  initRevealText();
  initAudioWave();
  initCharacterFloat();
  
  // Observador de elementos para animação
  const animateElements = document.querySelectorAll('.fade-in-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: 0.1 });
  
  animateElements.forEach(el => {
    observer.observe(el);
  });
  
  // Efeito parallax em elementos
  const parallaxElements = document.querySelectorAll('.parallax');
  
  window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    
    parallaxElements.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-speed')) || 0.5;
      const offset = scrollPosition * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
  });
  
  // Efeito de hover nos botões CTA
  const ctaButtons = document.querySelectorAll('.cta-button');
  
  ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      // Efeito sonoro
      const audio = new Audio('audio/button-hover.mp3');
      audio.volume = 0.2;
      audio.play();
    });
    
    button.addEventListener('click', () => {
      // Efeito sonoro
      const audio = new Audio('audio/button-click.mp3');
      audio.volume = 0.3;
      audio.play();
    });
  });
};

// Inicializar quando a página estiver totalmente carregada
window.addEventListener('load', initAnimations);