import { Festival } from '@/app/types/festival';

/**
 * Sorts festivals in ascending order by date.
 */
export function getSortedEvents(events: Festival[]): Festival[] {
  return [...events].sort((a, b) =>
    new Date(a.englishDate).getTime() - new Date(b.englishDate).getTime()
  );
}

/**
 * Returns only upcoming festivals (from today onward).
 */
export function getUpcomingEvents(events: Festival[]): Festival[] {
  const now = new Date();
  return getSortedEvents(events).filter(
    (event) => new Date(event.englishDate) >= now
  );
}

/**
 * Returns only past festivals (before today).
 */
export function getPastEvents(events: Festival[]): Festival[] {
  const now = new Date();
  return getSortedEvents(events).filter(
    (event) => new Date(event.englishDate) < now
  );
}

/**
 * Groups festivals by month (e.g., March, April, etc.).
 */
export function getEventsByMonth(events: Festival[]): { [month: string]: Festival[] } {
  const byMonth: { [month: string]: Festival[] } = {};

  events.forEach((event) => {
    const date = new Date(event.englishDate);
    const month = date.toLocaleString("default", { month: "long" });
    
    if (!byMonth[month]) {
      byMonth[month] = [];
    }

    byMonth[month].push(event);
  });

  return byMonth;
}
