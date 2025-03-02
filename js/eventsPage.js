class EventsPage {
    static async loadAllEvents() {
        try {
            const response = await fetch('../data/events.json');
            const data = await response.json();
            const container = document.querySelector('.events-container');
            
            container.innerHTML = data.events.map(event => `
                <div class="event-card">
                    <img src="../${event.image}" alt="${event.title}">
                    <div class="event-content">
                        <h3>${event.title}</h3>
                        <p class="date">${event.date}</p>
                        <p>${event.description}</p>
                        <a href="${event.link}" class="event-link">Register Now</a>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error loading events:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    EventsPage.loadAllEvents();
});
