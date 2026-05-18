import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AchievementSelector from "../../components/community/AchievementSelector";
import PostPreview from "../../components/community/PostPreview";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Background from "../../components/Background";

const MAX_TITLE = 100;
const MAX_BODY = 500;

const USER = {
  name: "Saif",
  role: "BSIT",
  semester: "Semester 6",
};

export default function CreateCommunityPost({ navigation }) {
  const [type, setType] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const insets = useSafeAreaInsets();

  const isValid = useMemo(() => {
    return title.trim().length > 0 && body.trim().length > 0;
  }, [title, body]);

  const handleSubmit = async () => {
    if (!isValid) return;

    try {
      setLoading(true);

      // simulate API
      await new Promise((res) => setTimeout(res, 1500));

      // success
      navigation.goBack();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + 16, paddingBottom: 40 },
      ]}
    >
      <Background />

      {/* HEADER */}
      <Text style={styles.header}>Share Achievement</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* TYPE SELECTOR */}
        <Text style={styles.label}>Select Type</Text>
        <AchievementSelector selected={type} onSelect={setType} />

        {/* TITLE */}
        <Text style={styles.label}>Title</Text>
        <TextInput
          placeholder="What's your achievement?"
          value={title}
          onChangeText={(text) => {
            if (text.length <= MAX_TITLE) setTitle(text);
          }}
          style={styles.input}
        />
        <Text style={styles.counter}>
          {title.length}/{MAX_TITLE}
        </Text>

        {/* BODY */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          placeholder="Tell us more about it..."
          value={body}
          multiline
          onChangeText={(text) => {
            if (text.length <= MAX_BODY) setBody(text);
          }}
          style={[styles.input, styles.textarea]}
        />
        <Text style={styles.counter}>
          {body.length}/{MAX_BODY}
        </Text>

        {/* IMAGE */}
        <Text style={styles.label}>Attachment</Text>
        <Pressable
          style={styles.imageBtn}
          onPress={() => {
            // Placeholder: In a real app, use expo-image-picker
            setImage("https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop");
          }}
        >
          {image ? (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: image }} style={styles.imagePreview} />
              <Pressable
                style={styles.removeImage}
                onPress={() => setImage(null)}
              >
                <Ionicons name="close-circle" size={24} color="#EF4444" />
              </Pressable>
            </View>
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="camera-outline" size={32} color="#9CA3AF" />
              <Text style={styles.imagePlaceholderText}>Add Photo</Text>
            </View>
          )}
        </Pressable>

        {/* PREVIEW */}
        <Text style={styles.label}>Preview</Text>
        <PostPreview type={type} title={title} body={body} user={USER} />

        {/* ACTIONS */}
        <View style={styles.actions}>
          <Pressable style={styles.cancel} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>

          <Pressable
            style={[styles.post, !isValid && { opacity: 0.5 }]}
            disabled={!isValid || loading}
            onPress={handleSubmit}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.postText}>Post</Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F6FA",
  },
  header: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 12,
  },
  label: {
    marginTop: 16,
    marginBottom: 6,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  textarea: {
    height: 120,
    textAlignVertical: "top",
  },
  counter: {
    textAlign: "right",
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  cancel: {
    padding: 14,
  },
  cancelText: {
    color: "#6B7280",
  },
  post: {
    backgroundColor: "#1A56DB",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 10,
  },
  postText: {
    color: "#fff",
    fontWeight: "600",
  },
  imageBtn: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
    overflow: "hidden",
    marginTop: 4,
  },
  imagePlaceholder: {
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  imagePlaceholderText: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "500",
  },
  imagePreviewContainer: {
    height: 200,
    width: "100%",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
  },
  removeImage: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
});
