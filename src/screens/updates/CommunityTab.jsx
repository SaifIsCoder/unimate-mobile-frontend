// ─── COMMUNITY TAB ───────────────────────────────────────────────────────────
import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { COLORS, RADIUS, FONT } from "../../theme/theme";
import { FilterPill } from "../../components/SharedComponents";

// ── CONFIG ───────────────────────────────────────────────────
const TYPE_CFG = {
  internship: { label: "Internship", emoji: "💼", color: "#7C3AED" },
  competition: { label: "Competition", emoji: "🏆", color: "#D97706" },
  gpa_milestone: { label: "GPA Milestone", emoji: "⭐", color: "#059669" },
  project_completion: { label: "Project", emoji: "🚀", color: "#2563EB" },
  certification: { label: "Certified", emoji: "📜", color: "#DC2626" },
  custom: { label: "Achievement", emoji: "🎯", color: "#6B7280" },
};
const FILTERS = [
  "All",
  "internship",
  "competition",
  "gpa_milestone",
  "project_completion",
  "certification",
];

// ── MOCK DATA ────────────────────────────────────────────────
const INITIAL_POSTS = [
  {
    id: "p1",
    authorName: "Ahmed Raza",
    authorInitial: "A",
    authorRole: "student",
    semester: "6th Semester",
    type: "internship",
    title: "Secured Internship at Systems Limited",
    body: "Excited to share that I'll be joining Systems Limited this summer as a Software Engineer intern. Grateful for the support from our department!",
    likesCount: 24,
    liked: false,
    commentsCount: 5,
    timeAgo: "2h ago",
  },
  {
    id: "p2",
    authorName: "Dr. Tariq Mahmood",
    authorInitial: "T",
    authorRole: "teacher",
    type: "custom",
    title: "Internship Drive — Next Week",
    body: "A company will be visiting campus next Wednesday for on-spot interviews. BSIT 6th and 7th semester students should prepare their CVs.",
    likesCount: 41,
    liked: true,
    commentsCount: 12,
    timeAgo: "5h ago",
  },
  {
    id: "p3",
    authorName: "Zainab Khalid",
    authorInitial: "Z",
    authorRole: "student",
    semester: "4th Semester",
    type: "certification",
    title: "AWS Cloud Practitioner Certified",
    body: "Just passed my AWS Cloud Practitioner exam on the first attempt. Highly recommend it for anyone interested in cloud computing.",
    likesCount: 18,
    liked: false,
    commentsCount: 3,
    timeAgo: "1d ago",
  },
  {
    id: "p4",
    authorName: "Saif ur Rehman",
    authorInitial: "S",
    authorRole: "student",
    semester: "8th Semester",
    type: "gpa_milestone",
    title: "Hit 3.85 CGPA This Semester",
    body: "Alhamdulillah, managed to bring my CGPA up to 3.85. Consistency is the key.",
    likesCount: 56,
    liked: false,
    commentsCount: 8,
    timeAgo: "2d ago",
  },
  {
    id: "p5",
    authorName: "Bilal Akhtar",
    authorInitial: "B",
    authorRole: "student",
    semester: "6th Semester",
    type: "competition",
    title: "1st Place — FAST Programming Contest",
    body: "Our team took first place at the FAST NUCES programming contest. 3 months of grinding paid off.",
    likesCount: 73,
    liked: false,
    commentsCount: 14,
    timeAgo: "3d ago",
  },
];
const MOCK_COMMENTS = [
  {
    id: "c1",
    author: "Usman Ali",
    initial: "U",
    text: "Congratulations! Well deserved.",
    time: "1h ago",
  },
  {
    id: "c2",
    author: "Sara Noor",
    initial: "S",
    text: "Mashallah, very inspiring!",
    time: "2h ago",
  },
  {
    id: "c3",
    author: "Ali Hassan",
    initial: "A",
    text: "Keep it up!",
    time: "3h ago",
  },
];

// ── COMMENT SHEET ────────────────────────────────────────────
const CommentSheet = ({ onClose, onSubmit }) => {
  const [text, setText] = useState("");
  return (
    <View style={cs.sheet}>
      <View style={cs.handle} />
      <Text style={cs.title}>Comments</Text>
      {MOCK_COMMENTS.map((c) => (
        <View key={c.id} style={cs.row}>
          <View style={cs.avatar}>
            <Text style={cs.avatarText}>{c.initial}</Text>
          </View>
          <View style={cs.body}>
            <View style={cs.meta}>
              <Text style={cs.author}>{c.author}</Text>
              <Text style={cs.time}>{c.time}</Text>
            </View>
            <Text style={cs.commentText}>{c.text}</Text>
          </View>
        </View>
      ))}
      <View style={cs.inputRow}>
        <TextInput
          style={cs.input}
          placeholder="Write a comment..."
          placeholderTextColor={COLORS.textTertiary}
          value={text}
          onChangeText={setText}
          multiline
        />
        <TouchableOpacity
          style={[cs.sendBtn, !text.trim() && cs.sendBtnDisabled]}
          onPress={() => {
            if (text.trim()) {
              onSubmit(text);
              setText("");
            }
          }}
          disabled={!text.trim()}
        >
          <Text style={cs.sendBtnText}>Send</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={cs.closeBtn} onPress={onClose}>
        <Text style={cs.closeBtnText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

// ── POST CARD ────────────────────────────────────────────────
const PostCard = ({ item, onLike, onComment }) => {
  const cfg = TYPE_CFG[item.type] || TYPE_CFG.custom;
  const isTeacher = item.authorRole === "teacher";
  return (
    <View style={pc.card}>
      <View style={pc.top}>
        <View style={[pc.avatar, isTeacher && pc.avatarTeacher]}>
          <Text style={[pc.avatarText, isTeacher && pc.avatarTextTeacher]}>
            {item.authorInitial}
          </Text>
        </View>
        <View style={pc.authorInfo}>
          <View style={pc.nameRow}>
            <Text style={pc.authorName}>{item.authorName}</Text>
            {isTeacher && (
              <View style={pc.teacherBadge}>
                <Text style={pc.teacherBadgeText}>Teacher</Text>
              </View>
            )}
          </View>
          <Text style={pc.meta}>
            {isTeacher ? "Faculty" : item.semester} · {item.timeAgo}
          </Text>
        </View>
        <View style={[pc.typePill, { backgroundColor: cfg.color + "18" }]}>
          <Text style={pc.typeEmoji}>{cfg.emoji}</Text>
          <Text style={[pc.typeLabel, { color: cfg.color }]}>{cfg.label}</Text>
        </View>
      </View>
      <Text style={pc.title}>{item.title}</Text>
      <Text style={pc.body}>{item.body}</Text>
      <View style={pc.divider} />
      <View style={pc.actions}>
        <TouchableOpacity style={pc.actionBtn} onPress={() => onLike(item.id)}>
          <Text style={pc.actionIcon}>{item.liked ? "❤️" : "🤍"}</Text>
          <Text style={[pc.actionCount, item.liked && pc.actionCountLiked]}>
            {item.likesCount}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={pc.actionBtn} onPress={() => onComment(item)}>
          <Text style={pc.actionIcon}>💬</Text>
          <Text style={pc.actionCount}>{item.commentsCount}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ── MAIN ─────────────────────────────────────────────────────
export default function CommunityTab({ navigation }) {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedPost, setSelectedPost] = useState(null);

  const filtered = useMemo(
    () =>
      activeFilter === "All"
        ? posts
        : posts.filter((p) => p.type === activeFilter),
    [activeFilter, posts],
  );

  const handleLike = (id) =>
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

  const handleCommentSubmit = () => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === selectedPost?.id
          ? { ...p, commentsCount: p.commentsCount + 1 }
          : p,
      ),
    );
    setSelectedPost(null);
  };

  return (
    <View style={s.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.filterBar}
        style={s.filterScroll}
      >
        {FILTERS.map((f) => (
          <FilterPill
            key={f}
            label={f === "All" ? "All" : TYPE_CFG[f]?.label || f}
            active={activeFilter === f}
            onPress={() => setActiveFilter(f)}
          />
        ))}
      </ScrollView>

      <FlatList
        style={{ flex: 1 }}
        data={filtered}
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
          filtered.length === 0
            ? { flex: 1, justifyContent: "center", alignItems: "center" }
            : { paddingBottom: 65 }
        }
        ListEmptyComponent={
          <View style={s.empty}>
            <Text style={s.emptyIcon}>🏆</Text>
            <Text style={s.emptyTitle}>No achievements yet</Text>
            <Text style={s.emptySub}>
              Be the first to share a win with your department.
            </Text>
          </View>
        }
      />

      <TouchableOpacity
        style={s.fab}
        onPress={() => navigation.navigate("CreateCommunityPost")}
        activeOpacity={0.85}
      >
        <Text style={s.fabText}>+ Share</Text>
      </TouchableOpacity>

      {selectedPost && (
        <View style={s.overlay}>
          <TouchableOpacity
            style={s.backdrop}
            onPress={() => setSelectedPost(null)}
          />
          <CommentSheet
            onClose={() => setSelectedPost(null)}
            onSubmit={handleCommentSubmit}
          />
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  filterScroll: { flexGrow: 0, flexShrink: 0 },
  filterBar: { paddingHorizontal: 16, paddingVertical: 6, gap: 6 },
  empty: { alignItems: "center", paddingHorizontal: 40 },
  emptyIcon: { fontSize: 36, marginBottom: 10 },
  emptyTitle: {
    fontSize: 14,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  emptySub: { fontSize: 11, color: COLORS.textSecondary, textAlign: "center" },
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
  fabText: { color: "#fff", fontSize: 14, fontWeight: FONT.bold },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
  },
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)" },
});
const pc = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
  },
  top: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary + "22",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  avatarTeacher: { backgroundColor: "#7C3AED22" },
  avatarText: { fontSize: 16, fontWeight: FONT.bold, color: COLORS.primary },
  avatarTextTeacher: { color: "#7C3AED" },
  authorInfo: { flex: 1 },
  nameRow: { flexDirection: "row", alignItems: "center", gap: 6 },
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
  meta: { fontSize: 11, color: COLORS.textTertiary, marginTop: 1 },
  typePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  typeEmoji: { fontSize: 11 },
  typeLabel: { fontSize: 10, fontWeight: FONT.semiBold },
  title: {
    fontSize: 15,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  body: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 19 },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 10 },
  actions: { flexDirection: "row", gap: 20 },
  actionBtn: { flexDirection: "row", alignItems: "center", gap: 5 },
  actionIcon: { fontSize: 16 },
  actionCount: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: FONT.semiBold,
  },
  actionCountLiked: { color: "#E11D48" },
});
const cs = StyleSheet.create({
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
  title: {
    fontSize: 15,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
    marginBottom: 14,
  },
  row: { flexDirection: "row", marginBottom: 12, gap: 10 },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary + "22",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 13, fontWeight: FONT.bold, color: COLORS.primary },
  body: { flex: 1 },
  meta: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 2 },
  author: {
    fontSize: 12,
    fontWeight: FONT.semiBold,
    color: COLORS.textPrimary,
  },
  time: { fontSize: 10, color: COLORS.textTertiary },
  commentText: { fontSize: 12, color: COLORS.textSecondary, lineHeight: 17 },
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
  sendBtnText: { color: "#fff", fontSize: 13, fontWeight: FONT.bold },
  closeBtn: {
    alignSelf: "center",
    marginTop: 12,
    paddingVertical: 6,
    paddingHorizontal: 24,
  },
  closeBtnText: { fontSize: 13, color: COLORS.textTertiary },
});
