document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('events-grid');
  if (!grid) return;

  try {
    const response = await fetch('data/events.json');
    const data = await response.json();
    const events = data.events || [];

    if (events.length === 0) {
      grid.innerHTML = `
        <div class="events-empty">
          <i class="fas fa-calendar-alt"></i>
          <p>No upcoming events right now. Check back soon or follow us on <a href="https://lu.ma/mlnomads" target="_blank" style="color: var(--accent-color);">Luma</a> for updates!</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = events.slice(0, 6).map(event => `
      <a href="${event.link}" class="event-card" target="_blank">
        <span class="event-type ${event.type || ''}">${event.type || 'Event'}</span>
        <div class="event-date">
          <i class="fas fa-calendar-day"></i>
          ${event.date}
        </div>
        <h3>${event.title}</h3>
        <p>${event.description}</p>
        <span class="event-link">RSVP on Luma <i class="fas fa-arrow-right"></i></span>
      </a>
    `).join('');
  } catch (error) {
    grid.innerHTML = `
      <div class="events-empty">
        <i class="fas fa-calendar-alt"></i>
        <p>Check our upcoming events on <a href="https://lu.ma/mlnomads" target="_blank" style="color: var(--accent-color);">Luma</a>!</p>
      </div>
    `;
  }
});
