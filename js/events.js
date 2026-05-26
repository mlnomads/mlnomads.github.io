document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('events-grid');
  if (!grid) return;

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

  const safeImage = (url) => {
    try {
      const u = new URL(url);
      if (!['http:', 'https:'].includes(u.protocol)) return '';
      return u.href;
    } catch { return ''; }
  };

  try {
    const response = await fetch('data/events.json', { cache: 'no-cache' });
    const data = await response.json();
    const events = data.events || [];

    if (events.length === 0) {
      grid.innerHTML = `
        <div class="events-empty">
          <i class="fas fa-calendar-alt"></i>
          <p>No upcoming events right now. Follow us on <a href="https://lu.ma/mlnomads" target="_blank" rel="noopener" class="accent-link">Luma</a> to hear when the next one is announced.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = events.slice(0, 6).map(event => {
      const img = safeImage(event.image);
      const location = event.location ? esc(event.location) : '';
      return `
        <a href="${safeUrl(event.link)}" class="event-card${img ? ' has-image' : ''}" target="_blank" rel="noopener">
          ${img ? `<div class="event-cover" style="background-image:url('${img}')" aria-hidden="true"></div>` : ''}
          <div class="event-body">
            <span class="event-type ${esc(event.type)}">${esc(event.type) || 'Event'}</span>
            <h3>${esc(event.title)}</h3>
            <div class="event-meta">
              <span class="event-date"><i class="fas fa-calendar-day"></i> ${esc(event.date)}</span>
              ${location ? `<span class="event-location"><i class="fas fa-map-marker-alt"></i> ${location}</span>` : ''}
            </div>
            <span class="event-link">RSVP on Luma <i class="fas fa-arrow-right"></i></span>
          </div>
        </a>
      `;
    }).join('');
  } catch (error) {
    grid.innerHTML = `
      <div class="events-empty">
        <i class="fas fa-calendar-alt"></i>
        <p>Check our upcoming events on <a href="https://lu.ma/mlnomads" target="_blank" rel="noopener" class="accent-link">Luma</a>.</p>
      </div>
    `;
  }
});
