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
        loadingText.textContent = "Destino aguardando...";
        setTimeout(() => {
          loadingScreen.style.opacity = '0';
          setTimeout(() => {
            loadingScreen.style.display = 'none';
            document.body.style.overflow = 'auto';
            // Iniciar animações após carregamento
            initParticles();
            initChoiceEffects();
          }, 1000);
        }, 500);
      }
    }, 200);
  });
  
  // Inicializar particles.js
  function initParticles() {
    if (window.particlesJS) {
      particlesJS('particles-js', {
        "particles": {
          "number": {
            "value": 100,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": ["#00a8ff", "#ff0000"]
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
            "color": "#ffffff",
            "opacity": 0.2,
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
                "opacity": 0.5
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
  }
  
  // Efeitos nas escolhas
  function initChoiceEffects() {
    const heroChoice = document.querySelector('.hero-choice');
    const villainChoice = document.querySelector('.villain-choice');
    
    if (heroChoice) {
      heroChoice.addEventListener('mouseenter', () => {
        particlesJS('particles-js', {
          /* Configuração com mais partículas azuis */
          particles: {
            color: { value: "#00a8ff" },
            line_linked: { color: "#00a8ff" }
          }
        });
      });
    }
    
    if (villainChoice) {
      villainChoice.addEventListener('mouseenter', () => {
        particlesJS('particles-js', {
          /* Configuração com mais partículas vermelhas */
          particles: {
            color: { value: "#ff0000" },
            line_linked: { color: "#ff0000" }
          }
        });
      });
    }
    
    // Efeito de digitação no subtítulo
    const subtitle = document.querySelector('.portal-subtitle');
    if (subtitle) {
      const originalText = subtitle.textContent;
      subtitle.textContent = '';
      
      let i = 0;
      const typingEffect = setInterval(() => {
        if (i < originalText.length) {
          subtitle.textContent += originalText.charAt(i);
          i++;
        } else {
          clearInterval(typingEffect);
        }
      }, 50);
    }
  }