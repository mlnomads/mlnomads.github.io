document.addEventListener('DOMContentLoaded', () => {
  // Scroll Progress
  const scrollProgressLeft = document.querySelector('.scroll-progress-left');
  const scrollProgressRight = document.querySelector('.scroll-progress-right');
  
  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    const barWidth = `${scrolled}%`;
    
    // Calculate width relative to the half-width of navbar (excluding logo)
    scrollProgressLeft.style.width = `calc(${barWidth} * 0.4)`;  // 40% of navbar width
    scrollProgressRight.style.width = `calc(${barWidth} * 0.4)`; // 40% of navbar width
  });

  // Active Section Tracking
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar');
});
