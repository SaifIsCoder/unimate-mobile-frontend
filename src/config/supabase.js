import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const supabaseUrl =
  process.env.EXPO_PUBLIC_SUPABASE_URL ||
  Constants.expoConfig?.extra?.supabaseUrl;
const supabaseAnonKey =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  Constants.expoConfig?.extra?.supabaseAnonKey;

const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

if (__DEV__ && !hasSupabaseConfig) {
  console.info("Supabase config not found. Supabase auth features are disabled.");
}

const buildFallbackClient = () => ({
  auth: {
    onAuthStateChange: () => ({
      data: {
        subscription: {
          unsubscribe: () => {},
        },
      },
    }),
    signInWithPassword: async () => ({
      data: null,
      error: new Error("Supabase is not configured for this environment."),
    }),
    signOut: async () => ({ error: null }),
  },
});

export const supabase = hasSupabaseConfig
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    })
  : buildFallbackClient();

export default supabase;
