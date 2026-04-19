require('dotenv').config();

module.exports = {
  expo: {
    scheme: "unimate",
    name: "uniMate",
    slug: "unimate",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      url: "https://u.expo.dev/29a82f6e-bf38-4d3a-8352-219df914953d"
    },
    ios: {
      supportsTablet: true,
      runtimeVersion: {
        policy: "appVersion"
      }
    },
    android: {
      package: "com.saif.unimate",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true,
      runtimeVersion: "1.0.0"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      eas: {
        projectId: "29a82f6e-bf38-4d3a-8352-219df914953d"
      }
    }
  }
};
