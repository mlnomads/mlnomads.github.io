document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('events-grid');
  if (!grid) return;

  // Show skeleton loading state
  grid.innerHTML = Array.from({ length: 3 }, () => `
    <div class="event-card skeleton">
      <div class="skeleton-line skeleton-tag"></div>
      <div class="skeleton-line skeleton-short"></div>
      <div class="skeleton-line skeleton-title"></div>
      <div class="skeleton-line skeleton-text"></div>
      <div class="skeleton-line skeleton-text"></div>
    </div>
  `).join('');

  const esc = (str) => {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  };

  const safeUrl = (url) => {
    try {
      const u = new URL(url);
      return ['http:', 'https:'].includes(u.protocol) ? u.href : '#';
    } catch { return '#'; }
  };

  try {
    const response = await fetch('data/events.json');
    const data = await response.json();
    const events = data.events || [];

    if (events.length === 0) {
      grid.innerHTML = `
        <div class="events-empty">
          <i class="fas fa-calendar-alt"></i>
          <p>No upcoming events right now. Check back soon or follow us on <a href="https://lu.ma/mlnomads" target="_blank" class="accent-link">Luma</a> for updates!</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = events.slice(0, 6).map(event => `
      <a href="${safeUrl(event.link)}" class="event-card" target="_blank" rel="noopener">
        <span class="event-type ${esc(event.type)}">${esc(event.type) || 'Event'}</span>
        <div class="event-date">
          <i class="fas fa-calendar-day"></i>
          ${esc(event.date)}
        </div>
        <h3>${esc(event.title)}</h3>
        <p>${esc(event.description)}</p>
        <span class="event-link">RSVP on Luma <i class="fas fa-arrow-right"></i></span>
      </a>
    `).join('');
  } catch (error) {
    grid.innerHTML = `
      <div class="events-empty">
        <i class="fas fa-calendar-alt"></i>
        <p>Check our upcoming events on <a href="https://lu.ma/mlnomads" target="_blank" class="accent-link">Luma</a>!</p>
      </div>
    `;
  }
});
