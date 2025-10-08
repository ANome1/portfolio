document.addEventListener('DOMContentLoaded', () => {

  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));
  const escapeHtml = str => String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[s]));

  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const navToggle = $('.nav-toggle');
  const mainNav = $('#main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      mainNav.setAttribute('aria-expanded', String(!expanded));
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({behavior: 'smooth', block: 'start'});

        if (navToggle && navToggle.getAttribute('aria-expanded') === 'true') {
          navToggle.click();
        }
      }
    });
  });


  const projects = [
    { id:1, title:'TERMINA RPG', desc:'Un RPG textuel dans un univers fantastique, développé en Go.', tech:'GOLANG', link:'https://github.com/ANome1/projet-red_TERMINA_RPG' },
    { id:2, title: 'POWER 4', desc: 'Jeu de Puissance 4 en Go avec une interface web.', tech: 'GOLANG, HTML & CSS', link: 'https://github.com/ANome1/projet_Power4' },
  ];


  const grid = $('#projects-grid');
  if (grid) {
    grid.innerHTML = projects.map(p => {
      return `
        <article class="project-card" aria-labelledby="proj-${p.id}">
          <h3 id="proj-${p.id}">${escapeHtml(p.title)}</h3>
          <p>${escapeHtml(p.desc)}</p>
          <div class="project-meta">
            <span class="badge">${escapeHtml(p.tech)}</span>
            <a href="${escapeHtml(p.link)}" class="btn" aria-label="Voir ${escapeHtml(p.title)}">Voir</a>
          </div>
        </article>
      `;
    }).join('');
  }


  const form = $('#contact-form');
  const status = $('#form-status');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.textContent = '';
      const nom = form.nom.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (nom.length < 2 || email.length < 5 || message.length < 10) {
        status.textContent = 'Veuillez compléter tous les champs correctement.';
        return;
      }

      try {

        const buttons = form.querySelectorAll('button');
        buttons.forEach(b => b.disabled = true);

   
        await new Promise(r => setTimeout(r, 700));

    
        status.textContent = 'Message envoyé, merci !';
        form.reset();
      } catch (err) {
        console.error(err);
        status.textContent = 'Erreur lors de l\'envoi. Réessayez plus tard.';
      } finally {
        const buttons = form.querySelectorAll('button');
        buttons.forEach(b => b.disabled = false);
      }
    });
  }
});


// met à jour l'année dans le footer
document.addEventListener('DOMContentLoaded', function () {
  const btn = document.querySelector('.nav-toggle');
  const headerInner = document.querySelector('.header-inner');
  const nav = document.getElementById('main-nav');

  if (btn && headerInner && nav) {
    // initialise aria si absent
    if (!btn.hasAttribute('aria-expanded')) btn.setAttribute('aria-expanded', 'false');

    btn.addEventListener('click', function () {
      const opened = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!opened));
      headerInner.classList.toggle('nav-open', !opened);
    });
  }

  // garde l'ancien code (ex: année dans le footer)
  const yEl = document.getElementById('year');
  if (yEl) yEl.textContent = new Date().getFullYear();
});


document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Merci pour votre message !');
    this.reset();
});


document.addEventListener('DOMContentLoaded', function () {
  // WIP modal — affiche instantanément sur la page d'accueil (tous appareils)
  try {
    const overlay = document.getElementById('wip-modal-overlay');
    const modal = document.getElementById('wip-modal');
    const closeBtn = document.getElementById('wip-close');
    const checkbox = document.getElementById('wip-no-show');

    function showWip() {
      if (!modal || !overlay) return;
      overlay.classList.remove('wip-hidden');
      overlay.setAttribute('aria-hidden', 'false');
      modal.classList.remove('wip-hidden');
      modal.setAttribute('aria-hidden', 'false');
      closeBtn?.focus();
    }
    function hideWip(save) {
      if (!modal || !overlay) return;
      overlay.classList.add('wip-hidden');
      overlay.setAttribute('aria-hidden', 'true');
      modal.classList.add('wip-hidden');
      modal.setAttribute('aria-hidden', 'true');
      if (save && checkbox && checkbox.checked) {
        localStorage.setItem('wip-dismissed', '1');
      }
    }

    // détecte page d'accueil et affiche immédiatement
    const p = location.pathname || '/';
    const isHome = p === '/' || p.endsWith('/index.html') || p === '';
    if (isHome && modal && overlay && closeBtn) {
      showWip(); // affichage instant
      closeBtn.addEventListener('click', () => hideWip(true));
      overlay.addEventListener('click', () => hideWip(false));
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hideWip(false); });
    }
  } catch (e) { /* silent fail */ }

  const btn = document.querySelector('.nav-toggle');
  const headerInner = document.querySelector('.header-inner');
  const nav = document.getElementById('main-nav');

  if (btn && headerInner && nav) {
    // initialise aria si absent
    if (!btn.hasAttribute('aria-expanded')) btn.setAttribute('aria-expanded', 'false');

    btn.addEventListener('click', function () {
      const opened = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!opened));
      headerInner.classList.toggle('nav-open', !opened);
    });
  }

  // garde l'ancien code (ex: année dans le footer)
  const yEl = document.getElementById('year');
  if (yEl) yEl.textContent = new Date().getFullYear();
});