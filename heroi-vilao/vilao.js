document.addEventListener('DOMContentLoaded', function () {
  // Efeito de carregamento
  const loadingScreen = document.querySelector('.loading-screen');
  const progressFill = document.querySelector('.progress-fill');
  const progressPercent = document.querySelector('.progress-percent');

  let progress = 0;
  const loadingInterval = setInterval(() => {
    progress += Math.random() * 10;
    progressFill.style.width = `${progress}%`;
    progressPercent.textContent = `${Math.floor(progress)}%`;

    if (progress >= 100) {
      progress = 100;
      clearInterval(loadingInterval);

      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';

        // Cursor personalizado
        const customCursor = document.querySelector('.custom-cursor');
        const cursorCore = document.querySelector('.cursor-core');
        const cursorAura = document.querySelector('.cursor-aura');

        document.addEventListener('mousemove', (e) => {
          customCursor.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
        });

        const hoverElements = document.querySelectorAll('a, button, .tab-button, .power-option, .gallery-dot, .gallery-prev, .gallery-next, .modal-action, .slide-button, .checkbox-container, .footer-social a');

        hoverElements.forEach(el => {
          el.addEventListener('mouseenter', () => customCursor.classList.add('active'));
          el.addEventListener('mouseleave', () => customCursor.classList.remove('active'));
        });

        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        navToggle.addEventListener('click', () => {
          navToggle.classList.toggle('active');
          navMenu.classList.toggle('active');
        });

        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
          link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
          });
        });

        // Scroll suave
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
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

        // Modal de trailer
        const trailerModal = document.querySelector('.trailer-modal');
        const trailerButtons = document.querySelectorAll('.cta-button, .slide-button');
        const modalClose = document.querySelector('.modal-close');

        trailerButtons.forEach(button => {
          button.addEventListener('click', () => {
            trailerModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            const video = document.getElementById('vilaoTrailer');
            video.currentTime = 0;
            video.play();
          });
        });

        modalClose.addEventListener('click', () => {
          trailerModal.classList.remove('active');
          document.body.style.overflow = 'auto';
          const video = document.getElementById('vilaoTrailer');
          video.pause();
        });

        trailerModal.addEventListener('click', (e) => {
          if (e.target === trailerModal) {
            trailerModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            const video = document.getElementById('vilaoTrailer');
            video.pause();
          }
        });

        // Tabs
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
          button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
          });
        });

        // Power options
        const powerOptions = document.querySelectorAll('.power-option');
        const powerMeters = document.querySelectorAll('.power-meter');

        powerOptions.forEach(option => {
          option.addEventListener('click', () => {
            powerOptions.forEach(opt => opt.classList.remove('active'));
            powerMeters.forEach(meter => meter.classList.remove('active'));
            option.classList.add('active');
            const powerId = option.getAttribute('data-power');
            const powerMeter = document.querySelector(`.power-meter[data-power="${powerId}"]`);
            powerMeter.classList.add('active');
            const powerFill = powerMeter.querySelector('.power-fill');
            const powerLevel = powerFill.getAttribute('data-level');
            powerFill.style.width = `${powerLevel}%`;
          });
        });

        // Galeria
        const galleryTrack = document.querySelector('.gallery-track');
        const gallerySlides = document.querySelectorAll('.gallery-slide');
        const galleryDots = document.querySelector('.gallery-dots');
        const galleryPrev = document.querySelector('.gallery-prev');
        const galleryNext = document.querySelector('.gallery-next');

        let currentSlide = 0;
        const slideWidth = gallerySlides[0].offsetWidth + 32;

        gallerySlides.forEach((_, index) => {
          const dot = document.createElement('div');
          dot.classList.add('gallery-dot');
          if (index === 0) dot.classList.add('active');
          dot.addEventListener('click', () => goToSlide(index));
          galleryDots.appendChild(dot);
        });

        function goToSlide(slideIndex) {
          currentSlide = slideIndex;
          galleryTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
          document.querySelectorAll('.gallery-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
          });
        }

        galleryNext.addEventListener('click', () => {
          if (currentSlide < gallerySlides.length - 1) {
            goToSlide(currentSlide + 1);
          } else {
            goToSlide(0);
          }
        });

        galleryPrev.addEventListener('click', () => {
          if (currentSlide > 0) {
            goToSlide(currentSlide - 1);
          } else {
            goToSlide(gallerySlides.length - 1);
          }
        });

        let autoSlideInterval = setInterval(() => {
          galleryNext.click();
        }, 5000);

        const galleryViewport = document.querySelector('.gallery-viewport');
        galleryViewport.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        galleryViewport.addEventListener('mouseleave', () => {
          autoSlideInterval = setInterval(() => galleryNext.click(), 5000);
        });

        // Contadores
        const statNumbers = document.querySelectorAll('.stat-number');
        function animateStats() {
          statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              stat.textContent = Math.floor(current);
            }, 16);
          });
        }

        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              if (entry.target.id === 'about') animateStats();
              if (entry.target.id === 'powers') {
                const activePowerFill = document.querySelector('.power-meter.active .power-fill');
                const powerLevel = activePowerFill.getAttribute('data-level');
                activePowerFill.style.width = `${powerLevel}%`;
              }
            }
          });
        }, observerOptions);

        const sectionsToObserve = document.querySelectorAll('#about, #powers');
        sectionsToObserve.forEach(section => observer.observe(section));

        // Preenche barra de poder ativa ao iniciar
        const activePowerFill = document.querySelector('.power-meter.active .power-fill');
        if (activePowerFill) {
          const powerLevel = activePowerFill.getAttribute('data-level');
          activePowerFill.style.width = `${powerLevel}%`;
        }

        // AOS
        if (typeof AOS !== 'undefined') {
          AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: false,
            mirror: true,
            offset: 100,
            anchorPlacement: 'top-bottom'
          });
        }

        // Botão de áudio
        const audioButton = document.querySelector('.audio-button');
        const audioWave = document.querySelectorAll('.audio-wave span');
        const audio = document.getElementById('quote-audio');

        audioButton.addEventListener('click', () => {
          if (audio.paused) {
            audio.play();
            audioButton.classList.add('playing');
            audioButton.innerHTML = '<i class="fas fa-pause"></i>';
            audioWave.forEach(bar => bar.style.animationPlayState = 'running');
          } else {
            audio.pause();
            audioButton.classList.remove('playing');
            audioButton.innerHTML = '<i class="fas fa-play"></i>';
            audioWave.forEach(bar => bar.style.animationPlayState = 'paused');
          }
        });

        audio.addEventListener('ended', () => {
          audioButton.classList.remove('playing');
          audioButton.innerHTML = '<i class="fas fa-play"></i>';
          audioWave.forEach(bar => bar.style.animationPlayState = 'paused');
        });

        // Typewriter
        setTimeout(() => {
          const typewriterElements = document.querySelectorAll('.typewriter');
          typewriterElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            let i = 0;
            const typingInterval = setInterval(() => {
              if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
              } else {
                clearInterval(typingInterval);
                const cursor = document.createElement('span');
                cursor.classList.add('blinking-cursor');
                cursor.textContent = '|';
                element.appendChild(cursor);
              }
            }, 50);
          });
        }, 500); // Espera 500ms depois do carregamento
      }, 500); // Espera 500ms depois da barra de progresso completar
    }
  }, 100);
});