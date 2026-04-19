// ─── UPDATES SCREEN ──────────────────────────────────────────────────────────
// Two tabs: Announcements | Community
// Matches your existing design system exactly.

import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
} from "react-native";
import { COLORS, RADIUS, FONT } from "../theme/theme";
import { Avatar, FilterPill } from "../components/SharedComponents";
import NotificationBell from "../components/NotificationBell";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ANNOUNCEMENTS,
  POST_TYPE_CONFIG,
  SCOPE_CONFIG,
  TYPE_CONFIG,
  COMMUNITY_POSTS,
  MOCK_COMMENTS,
} from "../data/mockData";

const POST_FILTERS = [
  "All",
  "internship",
  "competition",
  "gpa_milestone",
  "project_completion",
  "certification",
];

const TabSwitcher = ({ activeTab, onTabChange }) => (
  <View style={ts.wrap}>
    <TouchableOpacity
      style={[ts.tab, activeTab === "announcements" && ts.tabActive]}
      onPress={() => onTabChange("announcements")}
      activeOpacity={0.8}
    >
      <Text style={[ts.label, activeTab === "announcements" && ts.labelActive]}>
        Announcements
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[ts.tab, activeTab === "community" && ts.tabActive]}
      onPress={() => onTabChange("community")}
      activeOpacity={0.8}
    >
      <Text style={[ts.label, activeTab === "community" && ts.labelActive]}>
        Community
      </Text>
    </TouchableOpacity>
  </View>
);

const ts = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 14,
    backgroundColor: COLORS.border + "55",
    borderRadius: 50,
    padding: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 50,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: FONT.semiBold,
    color: COLORS.textTertiary,
  },
  labelActive: {
    color: "#fff",
  },
});

// ─────────────────────────────────────────────────────────────
// ANNOUNCEMENTS TAB
// ─────────────────────────────────────────────────────────────

const AnnouncementCard = ({ item }) => {
  const cfg = TYPE_CONFIG[item.type] || TYPE_CONFIG.general;
  const scopeCfg = SCOPE_CONFIG[item.scope] || SCOPE_CONFIG.department;

  return (
    <View style={ann.card}>
      {/* HEADER */}
      <View style={ann.cardHeader}>
        <View style={ann.badgeRow}>
          <Text style={ann.emoji}>{cfg.emoji}</Text>
          <View>
            <Text style={ann.title}>{item.title}</Text>
            <Text style={ann.date}>{item.date}</Text>
          </View>
        </View>
      </View>

      {/* TAGS */}
      <View style={ann.tagRow}>
        <View style={[ann.tag, { backgroundColor: cfg.color + "18" }]}>
          <Text style={[ann.tagText, { color: cfg.color }]}>{cfg.label}</Text>
        </View>
        <View style={[ann.tag, { backgroundColor: scopeCfg.color + "18" }]}>
          <Text style={[ann.tagText, { color: scopeCfg.color }]}>
            {scopeCfg.label}
          </Text>
        </View>
      </View>

      {/* MESSAGE */}
      <Text style={ann.message}>{item.message}</Text>

      {/* VIEW DETAILS */}
      <TouchableOpacity>
        <Text style={ann.viewDetails}>View Details</Text>
      </TouchableOpacity>
    </View>
  );
};

const ann = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
  },
  cardHeader: {
    marginBottom: 8,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  emoji: {
    fontSize: 26,
    marginTop: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
    flexShrink: 1,
  },
  date: {
    fontSize: 11,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  tagRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  tagText: {
    fontSize: 10,
    fontWeight: FONT.semiBold,
  },
  message: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
    marginBottom: 10,
  },
  viewDetails: {
    fontSize: 13,
    fontWeight: FONT.semiBold,
    color: COLORS.primary,
    textAlign: "right",
  },
});

// ─────────────────────────────────────────────────────────────
// COMMUNITY TAB
// ─────────────────────────────────────────────────────────────

const CommentSheet = ({ onClose, onSubmit }) => {
  const [text, setText] = useState("");

  return (
    <View style={com.sheet}>
      <View style={com.handle} />
      <Text style={com.sheetTitle}>Comments</Text>

      {MOCK_COMMENTS.map((c) => (
        <View key={c.id} style={com.commentRow}>
          <View style={com.commentAvatar}>
            <Text style={com.commentAvatarText}>{c.initial}</Text>
          </View>
          <View style={com.commentBody}>
            <View style={com.commentMeta}>
              <Text style={com.commentAuthor}>{c.author}</Text>
              <Text style={com.commentTime}>{c.time}</Text>
            </View>
            <Text style={com.commentText}>{c.text}</Text>
          </View>
        </View>
      ))}

      <View style={com.inputRow}>
        <TextInput
          style={com.input}
          placeholder="Write a comment..."
          placeholderTextColor={COLORS.textTertiary}
          value={text}
          onChangeText={setText}
          multiline
        />
        <TouchableOpacity
          style={[com.sendBtn, !text.trim() && com.sendBtnDisabled]}
          onPress={() => {
            if (text.trim()) {
              onSubmit(text);
              setText("");
            }
          }}
          disabled={!text.trim()}
        >
          <Text style={com.sendBtnText}>Send</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={com.closeBtn} onPress={onClose}>
        <Text style={com.closeBtnText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const PostCard = ({ item, onLike, onComment }) => {
  const cfg = POST_TYPE_CONFIG[item.type] || POST_TYPE_CONFIG.custom;
  const isTeacher = item.authorRole === "teacher";

  return (
    <View style={post.card}>
      {/* TOP ROW */}
      <View style={post.cardTop}>
        <View style={[post.avatarWrap, isTeacher && post.avatarTeacher]}>
          <Text style={[post.avatarText, isTeacher && post.avatarTextTeacher]}>
            {item.authorInitial}
          </Text>
        </View>

        <View style={post.authorInfo}>
          <View style={post.nameRow}>
            <Text style={post.authorName}>{item.authorName}</Text>
            {isTeacher && (
              <View style={post.teacherBadge}>
                <Text style={post.teacherBadgeText}>Teacher</Text>
              </View>
            )}
          </View>
          <Text style={post.authorMeta}>
            {isTeacher ? "Faculty" : item.semester} · {item.timeAgo}
          </Text>
        </View>

        <View style={[post.typePill, { backgroundColor: cfg.color + "18" }]}>
          <Text style={post.typeEmoji}>{cfg.emoji}</Text>
          <Text style={[post.typeLabel, { color: cfg.color }]}>
            {cfg.label}
          </Text>
        </View>
      </View>

      {/* CONTENT */}
      <Text style={post.title}>{item.title}</Text>
      <Text style={post.body}>{item.body}</Text>

      {/* DIVIDER */}
      <View style={post.divider} />

      {/* ACTIONS */}
      <View style={post.actions}>
        <TouchableOpacity
          style={post.actionBtn}
          onPress={() => onLike(item.id)}
        >
          <Text style={post.actionIcon}>{item.liked ? "❤️" : "🤍"}</Text>
          <Text style={[post.actionCount, item.liked && post.actionCountLiked]}>
            {item.likesCount}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={post.actionBtn}
          onPress={() => onComment(item)}
        >
          <Text style={post.actionIcon}>💬</Text>
          <Text style={post.actionCount}>{item.commentsCount}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ─────────────────────────────────────────────────────────────
// MAIN SCREEN
// ─────────────────────────────────────────────────────────────

export default function UpdatesScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  // Tab state
  const [activeTab, setActiveTab] = useState("announcements");

  // Announcement filters
  const [activeTypeFilter, setActiveTypeFilter] = useState("All");
  const [activeScopeFilter, setActiveScopeFilter] = useState("All");

  // Community state
  const [posts, setPosts] = useState(COMMUNITY_POSTS);
  const [activePostFilter, setActivePostFilter] = useState("All");
  const [selectedPost, setSelectedPost] = useState(null);

  // Filtered announcements
  const filteredAnnouncements = useMemo(
    () =>
      ANNOUNCEMENTS.filter((a) => {
        const typeMatch =
          activeTypeFilter === "All" || a.type === activeTypeFilter;
        const scopeMatch =
          activeScopeFilter === "All" || a.scope === activeScopeFilter;
        return typeMatch && scopeMatch;
      }),
    [activeTypeFilter, activeScopeFilter],
  );

  // Filtered posts
  const filteredPosts = useMemo(
    () =>
      activePostFilter === "All"
        ? posts
        : posts.filter((p) => p.type === activePostFilter),
    [activePostFilter, posts],
  );

  const handleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              liked: !p.liked,
              likesCount: p.liked ? p.likesCount - 1 : p.likesCount + 1,
            }
          : p,
      ),
    );
  };

  return (
    <View style={[s.screen, { paddingTop: insets.top + 16 }]}>
      {/* ── HEADER ── */}
      <View style={s.header}>
        <Text style={s.pageTitle}>Updates</Text>
        <View style={s.headerRight}>
          <NotificationBell />
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Avatar label="S" size={36} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── TAB SWITCHER ── */}
      <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />

      {/* ── ANNOUNCEMENTS TAB ── */}
      {activeTab === "announcements" && (
        <>
          {/* Type filters */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.filterBar}
            style={s.filterScroll}
          >
            {["All", "important", "event", "general"].map((f) => (
              <FilterPill
                key={`type-${f}`}
                label={f === "All" ? "All Types" : TYPE_CONFIG[f]?.label || f}
                active={activeTypeFilter === f}
                onPress={() => setActiveTypeFilter(f)}
              />
            ))}
          </ScrollView>

          {/* Scope filters */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[s.filterBar, { marginBottom: 4 }]}
            style={s.filterScroll}
          >
            {["All", "class", "department"].map((f) => (
              <FilterPill
                key={`scope-${f}`}
                label={f === "All" ? "All Scopes" : SCOPE_CONFIG[f]?.label || f}
                active={activeScopeFilter === f}
                onPress={() => setActiveScopeFilter(f)}
              />
            ))}
          </ScrollView>

          <FlatList
            data={filteredAnnouncements}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <AnnouncementCard item={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              filteredAnnouncements.length === 0
                ? { flex: 1, justifyContent: "center", alignItems: "center" }
                : { paddingBottom: 32 }
            }
            ListEmptyComponent={
              <View style={s.emptyState}>
                <Text style={s.emptyIcon}>📭</Text>
                <Text style={s.emptyTitle}>No Announcements</Text>
                <Text style={s.emptySub}>
                  No announcements match your filters.
                </Text>
              </View>
            }
          />
        </>
      )}

      {/* ── COMMUNITY TAB ── */}
      {activeTab === "community" && (
        <>
          {/* Post type filter */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[s.filterBar, { marginBottom: 8 }]}
            style={s.filterScroll}
          >
            {POST_FILTERS.map((f) => (
              <FilterPill
                key={`post-${f}`}
                label={f === "All" ? "All" : POST_TYPE_CONFIG[f]?.label || f}
                active={activePostFilter === f}
                onPress={() => setActivePostFilter(f)}
              />
            ))}
          </ScrollView>

          <FlatList
            data={filteredPosts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PostCard
                item={item}
                onLike={handleLike}
                onComment={(p) => setSelectedPost(p)}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              filteredPosts.length === 0
                ? { flex: 1, justifyContent: "center", alignItems: "center" }
                : { paddingBottom: 100 }
            }
            ListEmptyComponent={
              <View style={s.emptyState}>
                <Text style={s.emptyIcon}>🏆</Text>
                <Text style={s.emptyTitle}>No achievements yet</Text>
                <Text style={s.emptySub}>
                  Be the first to share a win with your department.
                </Text>
              </View>
            }
          />

          {/* FAB */}
          <TouchableOpacity
            style={s.fab}
            onPress={() => navigation.navigate("CreateCommunityPost")}
            activeOpacity={0.85}
          >
            <Text style={s.fabText}>+ Share</Text>
          </TouchableOpacity>

          {/* Comment sheet */}
          {selectedPost && (
            <View style={s.sheetOverlay}>
              <TouchableOpacity
                style={s.sheetBackdrop}
                onPress={() => setSelectedPost(null)}
              />
              <CommentSheet
                onClose={() => setSelectedPost(null)}
                onSubmit={() => {
                  setPosts((prev) =>
                    prev.map((p) =>
                      p.id === selectedPost.id
                        ? { ...p, commentsCount: p.commentsCount + 1 }
                        : p,
                    ),
                  );
                  setSelectedPost(null);
                }}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
}

// ─────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  filterScroll: {
    flexGrow: 0,
  },
  filterBar: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    gap: 6,
  },
  emptyState: {
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyIcon: { fontSize: 36, marginBottom: 10 },
  emptyTitle: {
    fontSize: 14,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  emptySub: {
    fontSize: 11,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 20,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    elevation: 4,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: FONT.bold,
  },
  sheetOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
  },
  sheetBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
});

// Post card styles
const post = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary + "22",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  avatarTeacher: {
    backgroundColor: "#7C3AED22",
  },
  avatarText: {
    fontSize: 16,
    fontWeight: FONT.bold,
    color: COLORS.primary,
  },
  avatarTextTeacher: {
    color: "#7C3AED",
  },
  authorInfo: { flex: 1 },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  authorName: {
    fontSize: 14,
    fontWeight: FONT.semiBold,
    color: COLORS.textPrimary,
  },
  teacherBadge: {
    backgroundColor: "#7C3AED18",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
  },
  teacherBadgeText: {
    fontSize: 10,
    fontWeight: FONT.semiBold,
    color: "#7C3AED",
  },
  authorMeta: {
    fontSize: 11,
    color: COLORS.textTertiary,
    marginTop: 1,
  },
  typePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  typeEmoji: { fontSize: 11 },
  typeLabel: {
    fontSize: 10,
    fontWeight: FONT.semiBold,
  },
  title: {
    fontSize: 15,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  body: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 10,
  },
  actions: {
    flexDirection: "row",
    gap: 20,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  actionIcon: { fontSize: 16 },
  actionCount: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: FONT.semiBold,
  },
  actionCountLiked: { color: "#E11D48" },
});

// Comment sheet styles
const com = StyleSheet.create({
  sheet: {
    backgroundColor: COLORS.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    paddingBottom: 32,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.border,
    alignSelf: "center",
    marginBottom: 14,
  },
  sheetTitle: {
    fontSize: 15,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
    marginBottom: 14,
  },
  commentRow: {
    flexDirection: "row",
    marginBottom: 12,
    gap: 10,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary + "22",
    alignItems: "center",
    justifyContent: "center",
  },
  commentAvatarText: {
    fontSize: 13,
    fontWeight: FONT.bold,
    color: COLORS.primary,
  },
  commentBody: { flex: 1 },
  commentMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 2,
  },
  commentAuthor: {
    fontSize: 12,
    fontWeight: FONT.semiBold,
    color: COLORS.textPrimary,
  },
  commentTime: {
    fontSize: 10,
    color: COLORS.textTertiary,
  },
  commentText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 17,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 12,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.bg,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    color: COLORS.textPrimary,
    maxHeight: 80,
  },
  sendBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: RADIUS.md,
  },
  sendBtnDisabled: { opacity: 0.4 },
  sendBtnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: FONT.bold,
  },
  closeBtn: {
    alignSelf: "center",
    marginTop: 12,
    paddingVertical: 6,
    paddingHorizontal: 24,
  },
  closeBtnText: {
    fontSize: 13,
    color: COLORS.textTertiary,
  },
});
