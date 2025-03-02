document.addEventListener('DOMContentLoaded', () => {
  // Scroll Progress
  const scrollProgress = document.querySelector('.scroll-progress');
  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = `${scrolled}%`;
  });

  // Active Section Tracking
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar');
});
