 const scrollBtn = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('visible', window.scrollY > 400);
    });

    function toggleAccordion(id) {
      document.getElementById(id).classList.toggle('open');
    }

    function toggleFinding(header) {
      const body = header.nextElementSibling;
      body.classList.toggle('open');
      const chevron = header.querySelector('span:last-child');
      chevron.textContent = body.classList.contains('open') ? '▲' : '▼';
    }

    function toggleRespondents() {
      const rows   = document.querySelectorAll('.respondent-hidden');
      const btn    = document.getElementById('respondentToggle');
      const arrow  = document.getElementById('respondentArrow');
      const label  = document.getElementById('respondentLabel');
      const isOpen = btn.dataset.open === '1';
      rows.forEach(r => r.style.display = isOpen ? 'none' : 'table-row');
      btn.dataset.open   = isOpen ? '0' : '1';
      arrow.textContent  = isOpen ? '▼' : '▲';
      label.textContent  = isOpen ? 'Show 15 more' : 'Show less';
    }

    function openLightbox(src, caption) {
      const overlay = document.getElementById('lbOverlay');
      const img     = document.getElementById('lbImg');
      const cap     = document.getElementById('lbCaption');
      img.src       = src;
      img.alt       = caption || 'Full-size preview';
      cap.textContent = caption || '';
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      document.getElementById('lbOverlay').classList.remove('active');
      document.body.style.overflow = '';
    }

    function closeLightboxOutside(e) {
      if (e.target === document.getElementById('lbOverlay')) closeLightbox();
    }

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeLightbox();
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 100) current = sec.getAttribute('id'); });
      navLinks.forEach(a => {
        a.style.color      = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
        a.style.background = a.getAttribute('href') === '#' + current ? 'var(--surface2)' : '';
      });
    });

    const hamburger  = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      hamburger.classList.toggle('open', !isOpen);
      hamburger.setAttribute('aria-expanded', !isOpen);
      mobileMenu.setAttribute('aria-hidden', isOpen);
      if (!isOpen) {
        mobileMenu.style.display = 'block';
        requestAnimationFrame(() => mobileMenu.classList.add('open'));
      } else {
        mobileMenu.classList.remove('open');
        setTimeout(() => { mobileMenu.style.display = 'none'; }, 300);
      }
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        setTimeout(() => { mobileMenu.style.display = 'none'; }, 300);
      });
    });

    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        if (mobileMenu.classList.contains('open')) {
          hamburger.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
          mobileMenu.classList.remove('open');
          mobileMenu.setAttribute('aria-hidden', 'true');
          setTimeout(() => { mobileMenu.style.display = 'none'; }, 300);
        }
      }
    });
