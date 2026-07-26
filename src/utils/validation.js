// ─── VALIDATION HELPERS ───────────────────────────────────────────────────────
// Single source of truth for auth input validation (previously inline in
// services/authService.js).

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// At least 8 chars with lower, upper, digit, and special character.
export const STRONG_PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

export const normalizeEmail = (email) =>
  String(email || '').trim().toLowerCase();

export const isValidEmail = (email) => EMAIL_REGEX.test(email);

export const isStrongPassword = (password) =>
  Boolean(password) && STRONG_PASSWORD_REGEX.test(password);
