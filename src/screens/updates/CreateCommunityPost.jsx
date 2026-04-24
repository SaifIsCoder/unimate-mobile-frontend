import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AchievementSelector from "../../components/community/AchievementSelector";
import PostPreview from "../../components/community/PostPreview";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
});
