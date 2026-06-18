import styles from './MoodHistory.module.css';
import MoodEntryCard from './MoodEntryCard';

/**
 * Section 3 — renders the (already filtered, already sorted) list of
 * entries the parent passes down. Keeping filtering/sorting logic in
 * the parent means this component only has one job: display a list,
 * or an empty state when there's nothing to show.
 */
function MoodHistory({ entries, onDelete, hasAnyEntries }) {
  if (entries.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyEmoji}>📭</div>
        <p className={styles.emptyTitle}>
          {hasAnyEntries ? 'No entries match this filter' : 'No entries yet'}
        </p>
        <p className={styles.emptyText}>
          {hasAnyEntries
            ? 'Try a different mood filter to see more of your history.'
            : 'Fill out the form above to log how today feels.'}
        </p>
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {entries.map((entry) => (
        <MoodEntryCard key={entry.id} entry={entry} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default MoodHistory;
