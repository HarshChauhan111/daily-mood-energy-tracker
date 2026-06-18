import { useState } from 'react';
import styles from './MoodEntryForm.module.css';
import { MOODS, ENERGY_LABELS, NOTE_MAX_LENGTH } from '../utils/moodConfig';
import { getTodayISO } from '../utils/dateHelpers';

const ENERGY_LEVELS = [1, 2, 3, 4, 5];

/**
 * Section 1 — the daily entry form. Owns its own draft state (mood,
 * energy, note) and validation, and only hands a finished entry up
 * to the parent once it passes validation.
 */
function MoodEntryForm({ onAddEntry }) {
  const [mood, setMood] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState({});
  const [justSaved, setJustSaved] = useState(false);

  function validate() {
    const nextErrors = {};
    if (!mood) {
      nextErrors.mood = 'Choose the mood that fits today.';
    }
    if (!energy) {
      nextErrors.energy = 'Select an energy level between 1 and 5.';
    }
    if (note.length > NOTE_MAX_LENGTH) {
      nextErrors.note = `Notes can be at most ${NOTE_MAX_LENGTH} characters.`;
    }
    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setJustSaved(false);
      return;
    }

    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      mood,
      energy,
      note: note.trim(),
      date: getTodayISO(),
    };

    onAddEntry(entry);

    // Reset the form for the next entry.
    setMood(null);
    setEnergy(null);
    setNote('');
    setErrors({});
    setJustSaved(true);
    window.setTimeout(() => setJustSaved(false), 2200);
  }

  function handleNoteChange(event) {
    setNote(event.target.value);
    if (errors.note) {
      setErrors((prev) => ({ ...prev, note: undefined }));
    }
  }

  const noteRemaining = NOTE_MAX_LENGTH - note.length;
  const noteOverLimit = noteRemaining < 0;

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.fieldGroup}>
        <label className={styles.label} id="mood-label">
          How does today feel?
        </label>
        <div
          className={styles.moodOptions}
          role="radiogroup"
          aria-labelledby="mood-label"
        >
          {MOODS.map((option) => (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={mood === option.id}
              className={`${styles.moodOption} ${
                mood === option.id ? styles.moodOptionSelected : ''
              }`}
              style={{ '--mood-color': option.color }}
              onClick={() => {
                setMood(option.id);
                if (errors.mood) {
                  setErrors((prev) => ({ ...prev, mood: undefined }));
                }
              }}
            >
              <span className={styles.moodEmoji}>{option.emoji}</span>
              {option.label}
            </button>
          ))}
        </div>
        {errors.mood && (
          <p className={styles.errorMessage} role="alert">
            {errors.mood}
          </p>
        )}
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} id="energy-label">
          Energy level{' '}
          <span className={styles.labelHint}>(1 = very low, 5 = very high)</span>
        </label>
        <div
          className={styles.energyScale}
          role="radiogroup"
          aria-labelledby="energy-label"
        >
          {ENERGY_LEVELS.map((level) => (
            <button
              key={level}
              type="button"
              role="radio"
              aria-checked={energy === level}
              className={`${styles.energyButton} ${
                energy === level ? styles.energyButtonSelected : ''
              }`}
              onClick={() => {
                setEnergy(level);
                if (errors.energy) {
                  setErrors((prev) => ({ ...prev, energy: undefined }));
                }
              }}
            >
              <span className={styles.energyNumber}>{level}</span>
              <span className={styles.energyWord}>{ENERGY_LABELS[level]}</span>
            </button>
          ))}
        </div>
        {errors.energy && (
          <p className={styles.errorMessage} role="alert">
            {errors.energy}
          </p>
        )}
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="note-field">
          Short note <span className={styles.labelHint}>(optional)</span>
        </label>
        <div className={styles.textareaWrapper}>
          <textarea
            id="note-field"
            className={styles.textarea}
            placeholder="Had a productive day."
            value={note}
            onChange={handleNoteChange}
            rows={3}
          />
          <span
            className={`${styles.charCount} ${
              noteOverLimit ? styles.charCountWarning : ''
            }`}
          >
            {noteRemaining}
          </span>
        </div>
        {errors.note && (
          <p className={styles.errorMessage} role="alert">
            {errors.note}
          </p>
        )}
      </div>

      <div className={styles.submitRow}>
        <button type="submit" className={styles.submitButton}>
          Save today's entry
        </button>
        <span
          className={`${styles.successNote} ${
            justSaved ? styles.successNoteVisible : ''
          }`}
        >
          Saved to your history ✓
        </span>
      </div>
    </form>
  );
}

export default MoodEntryForm;
