// ─── NOTIFICATION CONSTANTS ──────────────────────────────────────────────────
// All notification enums, configs, and validators.
// Single source of truth — no magic strings in screens.

import { COLORS } from '../theme/theme';

// ── Notification Types ───────────────────────────────────────────────────────
export const NOTIFICATION_TYPES = {
  EVENT: 'event',
  GENERAL: 'general',
  IMPORTANT: 'important',
};

// ── Scopes ───────────────────────────────────────────────────────────────────
export const NOTIFICATION_SCOPES = {
  CLASS: 'class',
  DEPARTMENT: 'department',
};

// ── Priorities ───────────────────────────────────────────────────────────────
export const NOTIFICATION_PRIORITIES = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL',
};

// ── Entity Types ─────────────────────────────────────────────────────────────
export const ENTITY_TYPES = {
  TASK: 'task',
  ANNOUNCEMENT: 'announcement',
  GRADE: 'grade',
};

// ── Priority → UI Config ─────────────────────────────────────────────────────
// Used by NotificationsScreen cards and anywhere priority styling is needed.
export const PRIORITY_CONFIG = {
  CRITICAL: {
    color: COLORS.red,
    bgColor: '#FFF5F5',
    borderColor: COLORS.red,
    icon: '🔴',
    label: 'Critical',
  },
  HIGH: {
    color: COLORS.orange,
    bgColor: '#FEF9F0',
    borderColor: COLORS.orange,
    icon: '🟠',
    label: 'High Priority',
  },
  MEDIUM: {
    color: COLORS.primary,
    bgColor: '#FAFBFF',
    borderColor: COLORS.primary,
    icon: '🟣',
    label: 'Medium',
  },
  LOW: {
    color: COLORS.textTertiary,
    bgColor: COLORS.card,
    borderColor: COLORS.border,
    icon: '⚪',
    label: 'Low',
  },
};

// ── Type → Title Mapping (for announcements) ─────────────────────────────────
export const ANNOUNCEMENT_TYPE_TITLES = {
  important: '⚠️ Important Announcement',
  event: '📅 Upcoming Event',
  general: '📢 Notice',
};

// ── Type → Priority Mapping (for announcements) ─────────────────────────────
export const ANNOUNCEMENT_PRIORITY_MAP = {
  important: NOTIFICATION_PRIORITIES.HIGH,
  event: NOTIFICATION_PRIORITIES.MEDIUM,
  general: NOTIFICATION_PRIORITIES.LOW,
};

// ── Entity Type → Icon Mapping ───────────────────────────────────────────────
export const ENTITY_ICON_MAP = {
  task: '📝',
  announcement: '📣',
  grade: '🎓',
};

// ── Safe Validators ──────────────────────────────────────────────────────────
// Fallback gracefully for unknown values — never crash.

const VALID_TYPES = new Set(Object.values(NOTIFICATION_TYPES));
const VALID_PRIORITIES = new Set(Object.values(NOTIFICATION_PRIORITIES));
const VALID_SCOPES = new Set(Object.values(NOTIFICATION_SCOPES));
const VALID_ENTITY_TYPES = new Set(Object.values(ENTITY_TYPES));

/** Returns the type if valid, otherwise 'general' */
export const safeType = (type) =>
  VALID_TYPES.has(type) ? type : NOTIFICATION_TYPES.GENERAL;

/** Returns the priority if valid, otherwise 'MEDIUM' */
export const safePriority = (priority) =>
  VALID_PRIORITIES.has(priority) ? priority : NOTIFICATION_PRIORITIES.MEDIUM;

/** Returns the scope if valid, otherwise 'class' */
export const safeScope = (scope) =>
  VALID_SCOPES.has(scope) ? scope : NOTIFICATION_SCOPES.CLASS;

/** Returns the entity type if valid, otherwise 'announcement' */
export const safeEntityType = (entityType) =>
  VALID_ENTITY_TYPES.has(entityType) ? entityType : ENTITY_TYPES.ANNOUNCEMENT;

// ── Priority Order (for sorting) ─────────────────────────────────────────────
export const PRIORITY_ORDER = {
  CRITICAL: 0,
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
};
