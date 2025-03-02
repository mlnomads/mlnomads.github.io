class ContentLoader {
    static async loadSection(sectionId, jsonFile) {
        try {
            const response = await fetch(`data/${jsonFile}`);
            const data = await response.json();
            const container = document.querySelector(`#${sectionId} .${sectionId}-grid`);
            const items = data[sectionId];

            // Only show first 3 items
            const displayItems = items.slice(0, 3);
            
            container.innerHTML = displayItems.map(item => `
                <div class="card">
                    <img src="${item.image}" alt="${item.title}">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <a href="${item.link}" class="learn-more-btn">Learn More</a>
                </div>
            `).join('');

            // Add "See All" button if there are more items
            if (items.length > 3) {
                const seeAllBtn = document.createElement('button');
                seeAllBtn.className = 'see-all-btn';
                seeAllBtn.textContent = 'See All';
                seeAllBtn.onclick = () => window.location.href = `/${sectionId}`;
                container.parentElement.appendChild(seeAllBtn);
            }
        } catch (error) {
            console.error(`Error loading ${sectionId}:`, error);
        }
    }
}

// Load content when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    ContentLoader.loadSection('events', 'events.json');
    ContentLoader.loadSection('courses', 'courses.json');
    ContentLoader.loadSection('projects', 'projects.json');
    ContentLoader.loadSection('blog', 'blog.json');
});

// Add scroll-based animation
const sections = document.querySelectorAll('.content-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));
