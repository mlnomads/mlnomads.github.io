document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('newsletter-email');
  const submitBtn = document.getElementById('newsletter-submit');
  const status = document.getElementById('newsletter-status');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    if (!email || !email.includes('@')) {
      status.textContent = 'Please enter a valid email address.';
      status.className = 'newsletter-status error';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Opening...';

    const subject = encodeURIComponent('MLNomads — Interest from ' + email);
    const body = encodeURIComponent('Hi MLNomads team,\n\nI\'d like to stay updated on your research and community.\n\nEmail: ' + email);
    window.location.href = `mailto:info@mlnomads.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      status.textContent = 'Your email client should open shortly. Send the message to complete!';
      status.className = 'newsletter-status success';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Get in Touch';
      emailInput.value = '';
    }, 1000);
  });
});
