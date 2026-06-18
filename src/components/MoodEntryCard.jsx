import { useState } from 'react';
import styles from './MoodEntryCard.module.css';
import { MOOD_MAP } from '../utils/moodConfig';
import { formatDisplayDate } from '../utils/dateHelpers';

/**
 * A single row in the mood history. Handles its own "are you sure?"
 * delete confirmation state locally — the parent only ever hears
 * about a delete once it's actually confirmed.
 */
function MoodEntryCard({ entry, onDelete }) {
  const [confirming, setConfirming] = useState(false);
  const moodInfo = MOOD_MAP[entry.mood];

  if (!moodInfo) return null;

  return (
    <li
      className={styles.card}
      style={{ '--mood-color': moodInfo.color }}
    >
      <div className={styles.badge} aria-hidden="true">
        {moodInfo.emoji}
      </div>

      <div className={styles.body}>
        <div className={styles.topRow}>
          <span className={styles.moodLabel}>{moodInfo.label}</span>
          <span className={styles.date}>{formatDisplayDate(entry.date)}</span>
        </div>

        <div className={styles.energyRow}>
          <div
            className={styles.energyDots}
            role="img"
            aria-label={`Energy level ${entry.energy} out of 5`}
          >
            {[1, 2, 3, 4, 5].map((level) => (
              <span
                key={level}
                className={`${styles.dot} ${
                  level <= entry.energy ? styles.dotFilled : ''
                }`}
              />
            ))}
          </div>
          <span className={styles.energyText}>Energy {entry.energy}/5</span>
        </div>

        <p className={`${styles.note} ${!entry.note ? styles.noteEmpty : ''}`}>
          {entry.note || 'No note added.'}
        </p>
      </div>

      <div className={styles.actions}>
        {confirming ? (
          <div className={styles.confirmRow}>
            <span className={styles.confirmText}>Delete this entry?</span>
            <div className={styles.confirmButtons}>
              <button
                type="button"
                className={styles.confirmYes}
                onClick={() => onDelete(entry.id)}
              >
                Delete
              </button>
              <button
                type="button"
                className={styles.confirmNo}
                onClick={() => setConfirming(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className={styles.deleteButton}
            onClick={() => setConfirming(true)}
            aria-label="Delete entry"
            title="Delete entry"
          >
            ✕
          </button>
        )}
      </div>
    </li>
  );
}

export default MoodEntryCard;
