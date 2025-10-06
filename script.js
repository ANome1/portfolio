

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
    { id:1, title:'Site vitrine', desc:'Site responsive créé avec HTML/CSS et optimisation SEO.', tech:'HTML · CSS', link:'#' },
    { id:2, title:'Todo App', desc:'Application vanilla JS avec stockage local et tests unitaires.', tech:'JavaScript', link:'#' },
    { id:3, title:'Dashboard', desc:'Prototype UI réactif et accessible.', tech:'Design · UX', link:'#' },
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