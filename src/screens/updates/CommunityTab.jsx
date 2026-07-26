// ─── COMMUNITY TAB ───────────────────────────────────────────────────────────
import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, RADIUS, FONT } from "../../theme";
import { FilterPill } from "../../components/ui";
import { s, pc, cs } from "./CommunityTab.styles";

// ── CONFIG ───────────────────────────────────────────────────
const TYPE_CFG = {
  internship: { label: "Internship", icon: "work", color: "#7C3AED" },
  competition: { label: "Competition", icon: "emoji-events", color: "#D97706" },
  gpa_milestone: { label: "GPA Milestone", icon: "star", color: "#059669" },
  project_completion: { label: "Project", icon: "rocket-launch", color: "#2563EB" },
  certification: { label: "Certified", icon: "workspace-premium", color: "#DC2626" },
  custom: { label: "Achievement", icon: "track-changes", color: "#6B7280" },
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
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1484&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1454165833767-027ffea9e778?q=80&w=1470&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop",
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
const PostCard = React.memo(({ item, onLike, onComment }) => {
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
          </View>
          <Text style={pc.meta}>
            {isTeacher ? "Faculty" : item.semester} · {item.timeAgo}
          </Text>
        </View>
        <View style={[pc.typePill, { backgroundColor: cfg.color + "18" }]}>
          <MaterialIcons name={cfg.icon} size={11} color={cfg.color} />
          <Text style={[pc.typeLabel, { color: cfg.color }]}>{cfg.label}</Text>
        </View>
      </View>
      <Text style={pc.title}>{item.title}</Text>
      <Text style={pc.body}>{item.body}</Text>
      {item.image && (
        <Image source={{ uri: item.image }} style={pc.postImage} resizeMode="cover" />
      )}
      <View style={pc.divider} />
      <View style={pc.actions}>
        <TouchableOpacity style={pc.actionBtn} onPress={() => onLike(item.id)}>
          <MaterialIcons
            name={item.liked ? "favorite" : "favorite-border"}
            size={16}
            color={item.liked ? "#E11D48" : COLORS.textSecondary}
          />
          <Text style={[pc.actionCount, item.liked && pc.actionCountLiked]}>
            {item.likesCount}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={pc.actionBtn} onPress={() => onComment(item)}>
          <MaterialIcons name="chat-bubble-outline" size={16} color={COLORS.textSecondary} />
          <Text style={pc.actionCount}>{item.commentsCount}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

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
        keyExtractor={(item) => String(item.id)}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={7}
        removeClippedSubviews
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
            <MaterialIcons name="emoji-events" size={36} color={COLORS.textTertiary} style={s.emptyIcon} />
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

