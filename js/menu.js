function toggleMenu() {
  const navbar = document.querySelector('.navbar');
  navbar.classList.toggle('responsive');
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.navbar-dropdown').forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle('active');
      }
    });
  });
});
