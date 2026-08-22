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



// ── COMMENT SHEET ────────────────────────────────────────────
const CommentSheet = ({ onClose, onSubmit }) => {
  const [text, setText] = useState("");
  return (
    <View style={cs.sheet}>
      <View style={cs.handle} />
      <Text style={cs.title}>Comments</Text>
      {/* MOCK_COMMENTS removed, should fetch from API in future */}
      <View style={cs.row}>
        <Text style={cs.author}>Comments feature coming soon!</Text>
      </View>
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
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedPost, setSelectedPost] = useState(null);

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { listCommunityPosts } = require("../../services/communityService");
        const res = await listCommunityPosts();
        
        // Map backend to UI schema
        const mapped = res.map(p => ({
          id: String(p.id),
          authorName: p.author_email?.split('@')[0] || "Unknown",
          authorInitial: (p.author_email?.charAt(0) || "U").toUpperCase(),
          authorRole: p.author_role || "student",
          semester: "", // Not available in basic post query
          type: "custom", // Type isn't in backend yet, defaulting to custom
          title: p.title,
          body: p.content,
          likesCount: parseInt(p.like_count) || 0,
          liked: false, // We'd need to know if current user liked it
          commentsCount: parseInt(p.comment_count) || 0,
          timeAgo: new Date(p.created_at).toLocaleDateString(),
          image: null,
        }));
        
        setPosts(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filtered = useMemo(
    () =>
      activeFilter === "All"
        ? posts
        : posts.filter((p) => p.type === activeFilter),
    [activeFilter, posts],
  );

  const handleLike = async (id) => {
    // Optimistic update
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
    try {
      const { toggleLike } = require("../../services/communityService");
      await toggleLike(id);
    } catch (err) {
      console.error(err);
      // Revert if it fails
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
    }
  };

  const handleCommentSubmit = async (text) => {
    if (!selectedPost) return;
    try {
      const { createComment } = require("../../services/communityService");
      await createComment(selectedPost.id, { content: text });
      setPosts((prev) =>
        prev.map((p) =>
          p.id === selectedPost.id
            ? { ...p, commentsCount: p.commentsCount + 1 }
            : p,
        ),
      );
      setSelectedPost(null);
    } catch (err) {
      console.error("Failed to post comment", err);
    }
  };

  if (loading) {
    return (
      <View style={[s.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: COLORS.textSecondary }}>Loading community posts...</Text>
      </View>
    );
  }

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

