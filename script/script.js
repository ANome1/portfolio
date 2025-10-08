document.addEventListener('DOMContentLoaded', () => {

  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));
  const escapeHtml = str => String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[s]));

  // ========================================
  // ANIMATIONS D'APPARITION AU SCROLL
  // ========================================
  const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    // Observer les sections et cartes
    $$('section, .project-card, .about, .contact').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  };

  // ========================================
  // ANIMATION TYPING POUR LE HERO
  // ========================================
  const typeWriter = (element, text, speed = 100) => {
    if (!element) return;
    element.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
        element.classList.add('typing-complete');
      }
    }, speed);
  };

  // ========================================
  // EFFET PARTICULES FLOTTANTES
  // ========================================
  const createFloatingParticles = () => {
    const hero = $('.hero');
    if (!hero) return;

    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 6 + 2}px;
        height: ${Math.random() * 6 + 2}px;
        background: rgba(139, 92, 246, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${Math.random() * 3 + 4}s ease-in-out infinite alternate;
        pointer-events: none;
      `;
      hero.appendChild(particle);
    }

    // CSS d'animation pour les particules
    if (!$('#particle-styles')) {
      const style = document.createElement('style');
      style.id = 'particle-styles';
      style.textContent = `
        .hero { position: relative; overflow: hidden; }
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          100% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
        }
      `;
      document.head.appendChild(style);
    }
  };

  // ========================================
  // EFFET PARALLAXE SIMPLE AU SCROLL
  // ========================================
  const parallaxEffect = () => {
    const hero = $('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.3;
      hero.style.transform = `translateY(${rate}px)`;
    });
  };

  // ========================================
  // ANIMATIONS POUR LES CARTES PROJETS
  // ========================================
  const animateProjectCards = () => {
    $$('.project-card').forEach((card, index) => {
      // Animation d'apparition décalée
      card.style.animationDelay = `${index * 0.1}s`;
      card.classList.add('card-animate');

      // Effet de tilt au survol
      card.addEventListener('mouseenter', (e) => {
        card.style.transform = 'translateY(-8px) rotateX(5deg)';
        card.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      });

      card.addEventListener('mouseleave', (e) => {
        card.style.transform = 'translateY(0) rotateX(0)';
      });

      // Effet de suivi de la souris
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    });

    // CSS pour les animations des cartes
    if (!$('#card-styles')) {
      const style = document.createElement('style');
      style.id = 'card-styles';
      style.textContent = `
        .card-animate {
          opacity: 0;
          transform: translateY(50px);
          animation: slideInUp 0.6s ease forwards;
        }
        @keyframes slideInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `;
      document.head.appendChild(style);
    }
  };

  // ========================================
  // ANIMATION SMOOTH SCROLL AMÉLIORÉ
  // ========================================
  const smoothScrollLinks = () => {
    $$('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = $(targetId);
        
        if (targetElement) {
          // Animation custom de scroll
          const startPosition = window.pageYOffset;
          const targetPosition = targetElement.offsetTop - 80;
          const distance = targetPosition - startPosition;
          const duration = 800;
          let start = null;

          const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const percentage = Math.min(progress / duration, 1);
            
            // Easing function (easeInOutCubic)
            const ease = percentage < 0.5 
              ? 4 * percentage * percentage * percentage 
              : (percentage - 1) * (2 * percentage - 2) * (2 * percentage - 2) + 1;
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (progress < duration) {
              requestAnimationFrame(step);
            }
          };
          
          requestAnimationFrame(step);
        }
      });
    });
  };

  // ========================================
  // ANIMATION POUR LE FORMULAIRE DE CONTACT
  // ========================================
  const animateContactForm = () => {
    const form = $('#contact-form');
    if (!form) return;

    const inputs = $$('input, textarea');
    inputs.forEach(input => {
      const label = input.previousElementSibling;
      
      input.addEventListener('focus', () => {
        if (label) {
          label.style.transform = 'translateY(-8px) scale(0.9)';
          label.style.color = 'var(--accent)';
        }
        input.style.borderColor = 'var(--accent)';
        input.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.3)';
      });

      input.addEventListener('blur', () => {
        if (label && !input.value) {
          label.style.transform = 'translateY(0) scale(1)';
          label.style.color = 'var(--text)';
        }
        input.style.borderColor = 'rgba(139, 92, 246, 0.2)';
        input.style.boxShadow = 'none';
      });
    });
  };

  // ========================================
  // LOADER D'APPARITION DE PAGE
  // ========================================
  const pageLoader = () => {
    // Créer le loader
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = `
      <div class="loader-content">
        <div class="loader-spinner"></div>
        <p>Chargement...</p>
      </div>
    `;
    loader.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, var(--bg) 0%, #2d1b69 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      transition: opacity 0.5s ease;
    `;

    // CSS du loader
    const style = document.createElement('style');
    style.textContent = `
      .loader-content {
        text-align: center;
        color: var(--text);
      }
      .loader-spinner {
        width: 50px;
        height: 50px;
        border: 3px solid rgba(139, 92, 246, 0.3);
        border-top: 3px solid var(--accent);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 16px;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(loader);

    // Supprimer le loader après chargement
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
      }, 800);
    });
  };

  // ========================================
  // INITIALISATION
  // ========================================
  
  // Démarrer le loader
  pageLoader();

  // Initialiser les animations
  observeElements();
  createFloatingParticles();
  parallaxEffect();
  smoothScrollLinks();
  animateContactForm();

  // Animation typing pour le titre principal
  setTimeout(() => {
    const heroTitle = $('.hero h2');
    if (heroTitle) {
      const originalText = heroTitle.textContent;
      typeWriter(heroTitle, originalText, 80);
    }
  }, 1000);

  // Animer les cartes de projets quand elles sont créées
  setTimeout(animateProjectCards, 1500);

  // ========================================
  // CODE EXISTANT (année, navigation, projets, etc.)
  // ========================================
  
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const navToggle = $('.nav-toggle');
  const mainNav = $('#main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      $('.header-inner')?.classList.toggle('nav-open', !expanded);
    });
  }

  const projects = [
    { id:1, title:'TERMINA RPG', desc:'Un RPG textuel dans un univers fantastique, développé en Go.', tech:'GOLANG', link:'https://github.com/ANome1/projet-red_TERMINA_RPG' },
    { id:2, title: 'POWER 4', desc: 'Jeu de Puissance 4 en Go avec une interface web.', tech: 'GOLANG, HTML & CSS', link: 'https://github.com/ANome1/projet_Power4' },
  ];

  const grid = $('#projects-grid');
  if (grid) {
    grid.innerHTML = projects.map(p => `
      <div class="project-card">
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.desc)}</p>
        <div class="project-meta">
          <span class="badge">${escapeHtml(p.tech)}</span>
          <a href="${escapeHtml(p.link)}" target="_blank" rel="noopener">Voir →</a>
        </div>
      </div>
    `).join('');
  }

  const form = $('#contact-form');
  const status = $('#form-status');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (status) status.textContent = 'Merci pour votre message !';
      form.reset();
    });
  }

  // ========================================
  // WIP MODAL (version simplifiée)
  // ========================================
  try {
    const overlay = $('#wip-modal-overlay');
    const modal = $('#wip-modal');
    const closeBtn = $('#wip-close');
    const checkbox = $('#wip-no-show');

    if (overlay && modal && closeBtn) {
      // Affichage après les autres animations
      setTimeout(() => {
        overlay.classList.remove('wip-hidden');
        modal.classList.remove('wip-hidden');
        closeBtn.focus();
      }, 2000);

      const hide = (save) => {
        overlay.classList.add('wip-hidden');
        modal.classList.add('wip-hidden');
        if (save && checkbox && checkbox.checked) {
          localStorage.setItem('wip-dismissed','1');
        }
      };

      closeBtn.addEventListener('click', () => hide(true));
      overlay.addEventListener('click', () => hide(false));
      document.addEventListener('keydown', (e) => { 
        if (e.key === 'Escape') hide(false); 
      });
    }
  } catch (err) {
    console.error('WIP modal error:', err);
  }

});