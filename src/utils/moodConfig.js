// Centralized mood configuration — single source of truth for labels,
// emoji, and the accent color used to theme each mood throughout the app.

export const MOODS = [
  { id: 'happy', label: 'Happy', emoji: '😀', color: '#E8A33D' },
  { id: 'calm', label: 'Calm', emoji: '😌', color: '#7C9885' },
  { id: 'neutral', label: 'Neutral', emoji: '😐', color: '#9B948A' },
  { id: 'sad', label: 'Sad', emoji: '😔', color: '#6E83A6' },
  { id: 'tired', label: 'Tired', emoji: '😴', color: '#8B7099' },
];

export const MOOD_MAP = MOODS.reduce((acc, mood) => {
  acc[mood.id] = mood;
  return acc;
}, {});

export const ENERGY_LABELS = {
  1: 'Very low',
  2: 'Low',
  3: 'Moderate',
  4: 'High',
  5: 'Very high',
};

export const NOTE_MAX_LENGTH = 200;

export const STORAGE_KEY = 'mood-tracker-entries';
