import styles from './MoodFilter.module.css';
import { MOODS } from '../utils/moodConfig';

/**
 * Section 2 — filter chips for narrowing the history list down to
 * one mood (or showing all). Purely controlled: the parent owns
 * which filter is active so the History section can read it too.
 */
function MoodFilter({ activeFilter, onChangeFilter, entries }) {
  const countFor = (moodId) =>
    moodId === 'all'
      ? entries.length
      : entries.filter((entry) => entry.mood === moodId).length;

  const filters = [{ id: 'all', label: 'All', emoji: '🗒️', color: null }, ...MOODS];

  return (
    <div className={styles.filterBar} role="group" aria-label="Filter by mood">
      {filters.map((filter) => (
        <button
          key={filter.id}
          type="button"
          className={`${styles.filterChip} ${
            activeFilter === filter.id ? styles.filterChipActive : ''
          }`}
          style={filter.color ? { '--mood-color': filter.color } : undefined}
          onClick={() => onChangeFilter(filter.id)}
          aria-pressed={activeFilter === filter.id}
        >
          <span>{filter.emoji}</span>
          {filter.label}
          <span className={styles.filterCount}>({countFor(filter.id)})</span>
        </button>
      ))}
    </div>
  );
}

export default MoodFilter;
