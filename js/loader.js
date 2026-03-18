document.addEventListener('DOMContentLoaded', () => {
    // Dynamic copyright year
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const loader = document.querySelector('.loader-wrapper');
    const minLoadTime = 200;
    const startTime = Date.now();

    const hideLoader = () => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(minLoadTime - elapsedTime, 0);

        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
                document.body.style.overflow = 'visible';
            }, 500);
        }, remainingTime);
    };

    window.addEventListener('load', hideLoader);
    setTimeout(hideLoader, 800);
    document.body.style.overflow = 'hidden';
});
