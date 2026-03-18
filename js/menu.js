document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navbar = document.getElementById('navbar');
  const overlay = document.getElementById('nav-overlay');

  if (!hamburger || !navbar) return;

  const closeMenu = () => {
    navbar.classList.remove('responsive');
    hamburger.setAttribute('aria-expanded', 'false');
    if (overlay) overlay.classList.remove('visible');
    document.body.style.overflow = '';
  };

  const openMenu = () => {
    navbar.classList.add('responsive');
    hamburger.setAttribute('aria-expanded', 'true');
    if (overlay) overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  };

  hamburger.addEventListener('click', () => {
    if (navbar.classList.contains('responsive')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Close menu when clicking a nav link (mobile)
  navbar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navbar.classList.contains('responsive')) {
        closeMenu();
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navbar.classList.contains('responsive')) {
      closeMenu();
      hamburger.focus();
    }
  });

  // Navbar background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Scroll-spy: highlight active nav link
  const sections = document.querySelectorAll('section[id]');
  const navLinks = navbar.querySelectorAll('a[href^="#"]');

  if (sections.length && navLinks.length) {
    const spy = () => {
      const scrollY = window.scrollY + 120;
      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    };
    window.addEventListener('scroll', spy, { passive: true });
  }
});
