import { useMemo } from 'react';
import styles from './MoodSummary.module.css';
import { MOOD_MAP } from '../utils/moodConfig';

/**
 * Section 4 — derives summary stats purely from the full entry list
 * (never the filtered list, since "most selected mood" etc. should
 * reflect the whole history regardless of which filter is active).
 * All math is memoized so it only recomputes when entries change.
 */
function MoodSummary({ entries }) {
  const stats = useMemo(() => {
    const total = entries.length;

    if (total === 0) {
      return { total: 0, topMood: null, averageEnergy: null };
    }

    const moodCounts = {};
    let energySum = 0;

    entries.forEach((entry) => {
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
      energySum += entry.energy;
    });

    const topMoodId = Object.keys(moodCounts).reduce((best, moodId) =>
      moodCounts[moodId] > moodCounts[best] ? moodId : best
    );

    return {
      total,
      topMood: MOOD_MAP[topMoodId],
      topMoodCount: moodCounts[topMoodId],
      averageEnergy: (energySum / total).toFixed(1),
    };
  }, [entries]);

  return (
    <div className={styles.summary}>
      <div className={styles.stamp}>
        <div className={styles.stampValue}>{stats.total}</div>
        <div className={styles.stampLabel}>Total entries</div>
      </div>

      <div className={styles.stamp}>
        <div className={styles.stampValue}>
          {stats.topMood ? (
            <>
              <span className={styles.stampEmoji}>{stats.topMood.emoji}</span>
              {stats.topMood.label}
            </>
          ) : (
            '—'
          )}
        </div>
        <div className={styles.stampLabel}>Most selected mood</div>
        {stats.topMood && (
          <div className={styles.stampSub}>
            logged {stats.topMoodCount}{' '}
            {stats.topMoodCount === 1 ? 'time' : 'times'}
          </div>
        )}
      </div>

      <div className={styles.stamp}>
        <div className={styles.stampValue}>
          {stats.averageEnergy ?? '—'}
          {stats.averageEnergy && (
            <span className={styles.stampUnit}>/5</span>
          )}
        </div>
        <div className={styles.stampLabel}>Average energy</div>
      </div>
    </div>
  );
}

export default MoodSummary;
