// Small date helpers kept separate from components so formatting logic
// has one home and is easy to unit test or swap later.

/**
 * Returns today's date as an ISO string (YYYY-MM-DD), used as the
 * canonical stored value for an entry's date.
 */
export function getTodayISO() {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60 * 1000;
  const local = new Date(now.getTime() - offsetMs);
  return local.toISOString().slice(0, 10);
}

/**
 * Formats an ISO date string (YYYY-MM-DD) into a human-friendly
 * "17 June 2026" style string for display in the UI.
 */
export function formatDisplayDate(isoDate) {
  if (!isoDate) return '';
  const [year, month, day] = isoDate.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
