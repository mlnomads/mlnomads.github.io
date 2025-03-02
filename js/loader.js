document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader-wrapper');
    const minLoadTime = 1000; // Minimum time to show loader
    const maxLoadTime = 3000; // Maximum time to show loader
    const startTime = Date.now();

    const hideLoader = () => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(minLoadTime - elapsedTime, 0);
        
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
                document.body.style.overflow = 'visible'; // Enable scrolling
            }, 800); // Match transition duration
        }, remainingTime);
    };

    // Handle normal page load
    window.addEventListener('load', hideLoader);
    
    // Failsafe: Force hide after max time
    setTimeout(hideLoader, maxLoadTime);
    
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';
    
    // Add loading progress indication
    const updateProgress = () => {
        const progress = Math.min((Date.now() - startTime) / maxLoadTime * 100, 100);
        loader.style.setProperty('--loading-progress', `${progress}%`);
    };
    
    const progressInterval = setInterval(() => {
        if (loader.classList.contains('fade-out')) {
            clearInterval(progressInterval);
        } else {
            updateProgress();
        }
    }, 100);
});
