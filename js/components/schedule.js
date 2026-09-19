/**
 * DHYUTHI 7.0 — SCHEDULE & CALENDAR EXPORTER
 */

export class Schedule {
  constructor() {
    this.init();
  }

  init() {
    const dayButtons = document.querySelectorAll('.day-tab-btn');
    const dayContainers = document.querySelectorAll('[data-day-schedule]');

    dayButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        dayButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const targetDay = btn.getAttribute('data-day');

        dayContainers.forEach((container) => {
          if (container.getAttribute('data-day-schedule') === targetDay) {
            container.style.display = 'block';
          } else {
            container.style.display = 'none';
          }
        });
      });
    });

    // Handle .ics Calendar Export
    const calBtn = document.getElementById('exportCalendarBtn');
    if (calBtn) {
      calBtn.addEventListener('click', () => this.exportIcsCalendar());
    }
  }

  exportIcsCalendar() {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//IEEE SCT SB//Dhyuthi 7.0 Festival//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:Dhyuthi 7.0 — Day 1: Ignition & Keynotes
DTSTART:20261023T093000Z
DTEND:20261023T180000Z
DESCRIPTION:Inaugural Ceremony, Keynote Addresses, and Light Core Showcase at SCTCE Trivandrum.
LOCATION:Sree Chitra Thirunal College of Engineering, Trivandrum
STATUS:CONFIRMED
END:VEVENT
BEGIN:VEVENT
SUMMARY:Dhyuthi 7.0 — Day 2: Parallel Track Workshops & Hackathon
DTSTART:20261024T090000Z
DTEND:20261024T183000Z
DESCRIPTION:Full day technical workshops across AIGENIX, CELLESTRO, INCEPTA, and SYNKRON tracks.
LOCATION:SCTCE Campus Laboratories, Trivandrum
STATUS:CONFIRMED
END:VEVENT
BEGIN:VEVENT
SUMMARY:Dhyuthi 7.0 — Day 3: Project Pitches & Grand Cultural Night
DTSTART:20261025T093000Z
DTEND:20261025T213000Z
DESCRIPTION:Grand Finals, Award Ceremonies, KTU Certificate distributions, and live pro-show.
LOCATION:Main Auditorium, SCTCE Trivandrum
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Dhyuthi-7-Official-Schedule.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
