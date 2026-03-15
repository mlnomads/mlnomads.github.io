document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader-wrapper');
    const minLoadTime = 400;
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
    setTimeout(hideLoader, 1500);
    document.body.style.overflow = 'hidden';
});
