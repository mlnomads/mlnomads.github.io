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
    submitBtn.textContent = 'Sending...';

    // Open mailto as fallback — in production, replace with an API call
    const subject = encodeURIComponent('Newsletter Subscription');
    const body = encodeURIComponent(`New subscriber: ${email}`);
    window.location.href = `mailto:info@mlnomads.com?subject=${subject}&body=${body}`;

    // Show success after short delay
    setTimeout(() => {
      status.textContent = 'Thanks! Check your email client to confirm.';
      status.className = 'newsletter-status success';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Subscribe';
      emailInput.value = '';
    }, 1000);
  });
});
