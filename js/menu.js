document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navbar = document.getElementById('navbar');

  if (!hamburger || !navbar) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('responsive');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when clicking a nav link (mobile)
  navbar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navbar.classList.contains('responsive')) {
        navbar.classList.remove('responsive');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navbar.classList.contains('responsive')) {
      navbar.classList.remove('responsive');
      hamburger.setAttribute('aria-expanded', 'false');
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
});
