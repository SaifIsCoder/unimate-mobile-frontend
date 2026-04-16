import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import API_ENDPOINTS from "../config/api";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const USER_PROFILE_KEY = "user_profile";
const SESSION_LAST_ACTIVITY_KEY = "session_last_activity";

const MAX_AUTH_RETRIES = 1;
const SESSION_IDLE_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

let authFailureHandler = null;
let refreshInFlight = null;

const safeParseJson = async (response) => {
  try {
    return await response.json();
  } catch (error) {
    return {};
  }
};

const isSecureStoreAvailable = async () => {
  try {
    return await SecureStore.isAvailableAsync();
  } catch (error) {
    return false;
  }
};

const setSensitiveValue = async (key, value) => {
  if (!value) return;

  if (await isSecureStoreAvailable()) {
    await SecureStore.setItemAsync(key, value);
    await AsyncStorage.removeItem(key);
    return;
  }

  await AsyncStorage.setItem(key, value);
};

const getSensitiveValue = async (key) => {
  if (await isSecureStoreAvailable()) {
    const secureValue = await SecureStore.getItemAsync(key);
    if (secureValue) return secureValue;
  }

  return AsyncStorage.getItem(key);
};

const removeSensitiveValue = async (key) => {
  if (await isSecureStoreAvailable()) {
    await SecureStore.deleteItemAsync(key);
  }

  await AsyncStorage.removeItem(key);
};

const buildHeaders = (token, headers = {}) => ({
  "Content-Type": "application/json",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
  ...headers,
});

const markSessionActivity = async () => {
  try {
    await AsyncStorage.setItem(SESSION_LAST_ACTIVITY_KEY, String(Date.now()));
  } catch (error) {
    console.error("Error storing session activity:", error);
  }
};

const isSessionTimedOut = async () => {
  try {
    const lastActivity = await AsyncStorage.getItem(SESSION_LAST_ACTIVITY_KEY);
    if (!lastActivity) return false;

    const elapsed = Date.now() - Number(lastActivity);
    return elapsed > SESSION_IDLE_TIMEOUT_MS;
  } catch (error) {
    console.error("Error checking session timeout:", error);
    return false;
  }
};

export class ApiError extends Error {
  constructor(message, status, payload) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

export const setAuthFailureHandler = (handler) => {
  authFailureHandler = typeof handler === "function" ? handler : null;
};

const handleAuthFailure = async (message = "Session expired. Please log in again.") => {
  await clearTokens();

  if (authFailureHandler) {
    try {
      await authFailureHandler(message);
    } catch (error) {
      console.error("Auth failure handler error:", error);
    }
  }
};

export const getAccessToken = async () => {
  try {
    return await getSensitiveValue(ACCESS_TOKEN_KEY);
  } catch (error) {
    console.error("Error getting access token:", error);
    return null;
  }
};

export const getRefreshToken = async () => {
  try {
    return await getSensitiveValue(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error("Error getting refresh token:", error);
    return null;
  }
};

export const setTokens = async ({ accessToken, refreshToken }) => {
  try {
    if (accessToken) {
      await setSensitiveValue(ACCESS_TOKEN_KEY, accessToken);
    }

    if (refreshToken) {
      await setSensitiveValue(REFRESH_TOKEN_KEY, refreshToken);
    }

    await markSessionActivity();
  } catch (error) {
    console.error("Error setting tokens:", error);
    throw error;
  }
};

export const clearTokens = async () => {
  try {
    await removeSensitiveValue(ACCESS_TOKEN_KEY);
    await removeSensitiveValue(REFRESH_TOKEN_KEY);
    await AsyncStorage.removeItem(USER_PROFILE_KEY);
    await AsyncStorage.removeItem(SESSION_LAST_ACTIVITY_KEY);
  } catch (error) {
    console.error("Error clearing tokens:", error);
  }
};

export const setUserProfile = async (user) => {
  try {
    if (user) {
      await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(user));
    } else {
      await AsyncStorage.removeItem(USER_PROFILE_KEY);
    }
  } catch (error) {
    console.error("Error storing user profile:", error);
  }
};

export const getUserProfile = async () => {
  try {
    const stored = await AsyncStorage.getItem(USER_PROFILE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Error reading user profile:", error);
    return null;
  }
};

const refreshAccessToken = async () => {
  if (refreshInFlight) {
    return refreshInFlight;
  }

  refreshInFlight = (async () => {
    const currentRefreshToken = await getRefreshToken();

    if (!currentRefreshToken) {
      await handleAuthFailure();
      return null;
    }

    const refreshResponse = await fetch(API_ENDPOINTS.AUTH.REFRESH, {
      method: "POST",
      headers: buildHeaders(null),
      body: JSON.stringify({ refreshToken: currentRefreshToken }),
    });

    const refreshPayload = await safeParseJson(refreshResponse);

    if (!refreshResponse.ok) {
      const message =
        refreshPayload?.message ||
        refreshPayload?.error ||
        "Unable to refresh session";
      await handleAuthFailure(message);
      return null;
    }

    const tokenData = refreshPayload?.data || {};
    const nextAccessToken = tokenData.accessToken;
    const nextRefreshToken = tokenData.refreshToken || currentRefreshToken;

    if (!nextAccessToken) {
      await handleAuthFailure("Invalid refresh response from server");
      return null;
    }

    await setTokens({
      accessToken: nextAccessToken,
      refreshToken: nextRefreshToken,
    });

    return nextAccessToken;
  })();

  try {
    return await refreshInFlight;
  } finally {
    refreshInFlight = null;
  }
};

const handleResponse = async (response) => {
  const payload = await safeParseJson(response);

  if (!response.ok) {
    const message = payload?.message || payload?.error || "Request failed";
    throw new ApiError(message, response.status, payload);
  }

  return payload;
};

export const apiRequest = async (url, options = {}, retryCount = 0) => {
const isAuthEndpoint =
  url === API_ENDPOINTS.AUTH.LOGIN ||
  url === API_ENDPOINTS.AUTH.REGISTER ||
  url === API_ENDPOINTS.AUTH.REFRESH ||
  url === API_ENDPOINTS.AUTH.LOGOUT;

  if (!isAuthEndpoint && (await isSessionTimedOut())) {
    await handleAuthFailure("Session timed out due to inactivity. Please log in again.");
    throw new ApiError("Session timed out due to inactivity.", 401, {
      error: "session_timeout",
    });
  }

  const accessToken = await getAccessToken();
  const response = await fetch(url, {
    ...options,
    headers: buildHeaders(accessToken, options.headers),
  });

  if (
  response.status === 401 &&
  retryCount < MAX_AUTH_RETRIES &&
  url !== API_ENDPOINTS.AUTH.REFRESH &&
  url !== API_ENDPOINTS.AUTH.LOGOUT
) {
    const refreshedAccessToken = await refreshAccessToken();

    if (!refreshedAccessToken) {
      throw new ApiError("Session expired. Please log in again.", 401, {
        error: "session_expired",
      });
    }

    const retryResponse = await fetch(url, {
      ...options,
      headers: buildHeaders(refreshedAccessToken, options.headers),
    });

    if (retryResponse.status === 401) {
      await handleAuthFailure();
    }

    const retryPayload = await handleResponse(retryResponse);
    await markSessionActivity();
    return retryPayload;
  }

  const payload = await handleResponse(response);

  if (!isAuthEndpoint) {
    await markSessionActivity();
  }

  return payload;
};
