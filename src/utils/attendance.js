// ─── ATTENDANCE HELPERS ───────────────────────────────────────────────────────
// Shared attendance math (previously duplicated inline in several screens).

export const SAFE_ATTENDANCE_THRESHOLD = 0.75;

/** Attendance percentage (0–100), rounded. */
export const getAttendancePercent = (attended, total) =>
  total > 0 ? Math.round((attended / total) * 100) : 0;

/**
 * How many more classes must be attended to reach the safe threshold.
 * Never negative.
 */
export const getClassesNeededToBeSafe = (
  attended,
  total,
  threshold = SAFE_ATTENDANCE_THRESHOLD
) => Math.max(0, Math.ceil(threshold * total - attended));
