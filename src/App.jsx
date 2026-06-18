import { useMemo, useState } from 'react';
import styles from './App.module.css';
import MoodEntryForm from './components/MoodEntryForm';
import MoodFilter from './components/MoodFilter';
import MoodHistory from './components/MoodHistory';
import MoodSummary from './components/MoodSummary';
import { useLocalStorage } from './hooks/useLocalStorage';
import { STORAGE_KEY } from './utils/moodConfig';
import { formatDisplayDate, getTodayISO } from './utils/dateHelpers';

function App() {
  const [entries, setEntries] = useLocalStorage(STORAGE_KEY, []);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  function handleAddEntry(newEntry) {
    // Newest entry first so the history always reads top-to-bottom
    // as "most recent day first," matching how a journal is read.
    setEntries((prev) => [newEntry, ...prev]);
  }

  function handleDeleteEntry(entryId) {
    setEntries((prev) => prev.filter((entry) => entry.id !== entryId));
  }

  const visibleEntries = useMemo(() => {
    return entries.filter((entry) => {
      const matchesMood = activeFilter === 'all' || entry.mood === activeFilter;
      const matchesSearch =
        searchTerm.trim() === '' ||
        entry.note.toLowerCase().includes(searchTerm.trim().toLowerCase());
      return matchesMood && matchesSearch;
    });
  }, [entries, activeFilter, searchTerm]);

  const todayLabel = formatDisplayDate(getTodayISO());

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Daily check-in</p>
        <h1 className={styles.title}>
          How are you, <span className={styles.titleAccent}>really</span>?
        </h1>
        <p className={styles.subtitle}>
          A quiet place to note your mood and energy, day by day, so the
          shape of your weeks becomes easier to see.
        </p>
        <div className={styles.dateStamp}>
          Today
          <span className={styles.dateStampDay}>{todayLabel}</span>
        </div>
      </header>

      <section className={styles.section} aria-labelledby="entry-heading">
        <div className={styles.sectionHeading}>
          <span className={styles.sectionNumber}>one</span>
          <h2 className={styles.sectionTitle} id="entry-heading">
            Log today's entry
          </h2>
        </div>
        <MoodEntryForm onAddEntry={handleAddEntry} />
      </section>

      <section className={styles.section} aria-labelledby="summary-heading">
        <div className={styles.sectionHeading}>
          <span className={styles.sectionNumber}>two</span>
          <h2 className={styles.sectionTitle} id="summary-heading">
            At a glance
          </h2>
        </div>
        <MoodSummary entries={entries} />
      </section>

      <section className={styles.section} aria-labelledby="history-heading">
        <div className={styles.sectionHeading}>
          <span className={styles.sectionNumber}>three</span>
          <h2 className={styles.sectionTitle} id="history-heading">
            Your history
          </h2>
        </div>
        <div className={styles.filterRow}>
          <MoodFilter
            activeFilter={activeFilter}
            onChangeFilter={setActiveFilter}
            entries={entries}
          />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search your notes…"
          aria-label="Search notes"
          className={styles.searchInput}
        />
        <MoodHistory
          entries={visibleEntries}
          onDelete={handleDeleteEntry}
          hasAnyEntries={entries.length > 0}
        />
      </section>

      <footer className={styles.footer}>
        Your entries are stored only in this browser — nothing leaves your
        device.
      </footer>
    </div>
  );
}

export default App;
