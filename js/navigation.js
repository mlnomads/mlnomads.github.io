document.addEventListener('DOMContentLoaded', () => {
  const scrollLeft = document.querySelector('.scroll-progress-left');
  const scrollRight = document.querySelector('.scroll-progress-right');

  if (!scrollLeft || !scrollRight) return;

  window.addEventListener('scroll', () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;

    const scrolled = (window.scrollY / scrollable) * 100;
    const barWidth = `${scrolled * 0.4}%`;

    scrollLeft.style.width = barWidth;
    scrollRight.style.width = barWidth;
  }, { passive: true });
});
