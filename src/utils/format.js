// ─── FORMAT HELPERS ───────────────────────────────────────────────────────────
// Pure presentation helpers shared across screens.

/**
 * Human-friendly relative time (e.g. "Just now", "5m ago", "Yesterday").
 * Falls back to a short date for anything older than a week.
 */
export const getRelativeTime = (dateString) => {
  try {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
};

/** First letter of a name, uppercased. Safe for empty/undefined input. */
export const getInitial = (name) =>
  (String(name || '').trim().charAt(0) || 'S').toUpperCase();
