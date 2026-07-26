import { StyleSheet } from 'react-native';
import { COLORS, RADIUS, FONT } from '../theme';

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg, paddingVertical: 16 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  pageTitle: {
    fontSize: 22,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
  },

  markRead: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: FONT.semiBold,
    marginTop: 2,
  },

  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },

  unreadBadge: {
    backgroundColor: COLORS.primary3,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },

  unreadBadgeText: {
    fontSize: 10,
    fontWeight: FONT.semiBold,
    color: COLORS.primary,
  },

  // ── Priority section header ────────────────────────────────────────────────
  priorityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 6,
  },

  priorityIcon: { fontSize: 10 },

  priorityLabel: {
    fontSize: 11,
    fontWeight: FONT.semiBold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // ── Notification card ──────────────────────────────────────────────────────
  notifCard: {
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 3,
    flexDirection: 'row',
    gap: 10,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },

  notifCardUnread: {
    borderColor: '#DDE0F5',
  },

  unreadDot: {
    position: 'absolute',
    top: 6,
    left: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    zIndex: 1,
  },

  notifIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  notifBody: { flex: 1 },

  notifTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },

  notifTitle: {
    fontSize: 14,
    fontWeight: FONT.semiBold,
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: 8,
  },

  notifMsg: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 15.4,
    marginBottom: 4,
  },

  notifTime: {
    fontSize: 11,
    color: COLORS.textTertiary,
  },

  priorityTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2.5,
    borderRadius: RADIUS.sm,
    marginTop: 2,
  },

  priorityTagText: {
    fontSize: 10,
    fontWeight: FONT.semiBold,
  },

  // ── Empty state ────────────────────────────────────────────────────────────
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },

  emptyIcon: { fontSize: 40, marginBottom: 12 },

  emptyTitle: {
    fontSize: 16,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },

  emptySub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default styles;
