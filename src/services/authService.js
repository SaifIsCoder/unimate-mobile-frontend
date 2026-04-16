import AsyncStorage from "@react-native-async-storage/async-storage";
import API_ENDPOINTS from "../config/api";
import {
  ApiError,
  apiRequest,
  setTokens,
  clearTokens,
  setUserProfile,
  getUserProfile,
} from "./apiClient";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STRONG_PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

const LOGIN_ATTEMPT_KEY = "login_attempt_meta";
const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_LOCK_WINDOW_MS = 15 * 60 * 1000;

const isPlainObject = (value) =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

const normalizeEmail = (email) => String(email || "").trim().toLowerCase();
const normalizeTenantCode = (tenantCode) => String(tenantCode || "").trim().toUpperCase();

const assertEmail = (email) => {
  if (!EMAIL_REGEX.test(email)) {
    throw new Error("Please enter a valid email address.");
  }
};

const assertPasswordStrength = (password) => {
  if (!password || password.length < 8) {
    throw new Error("Password must be at least 8 characters long.");
  }

  if (!STRONG_PASSWORD_REGEX.test(password)) {
    throw new Error(
      "Password must include uppercase, lowercase, number, and special character."
    );
  }
};

const assertTenantCode = (tenantCode) => {
  if (!tenantCode) {
    throw new Error("University code is required.");
  }
};

const readLoginAttemptMeta = async () => {
  try {
    const raw = await AsyncStorage.getItem(LOGIN_ATTEMPT_KEY);
    if (!raw) {
      return { count: 0, windowStart: 0, lockedUntil: 0 };
    }

    const parsed = JSON.parse(raw);
    return {
      count: Number(parsed?.count || 0),
      windowStart: Number(parsed?.windowStart || 0),
      lockedUntil: Number(parsed?.lockedUntil || 0),
    };
  } catch (error) {
    return { count: 0, windowStart: 0, lockedUntil: 0 };
  }
};

const writeLoginAttemptMeta = async (meta) => {
  try {
    await AsyncStorage.setItem(LOGIN_ATTEMPT_KEY, JSON.stringify(meta));
  } catch (error) {
    console.error("Error storing login attempt metadata:", error);
  }
};

const enforceLoginRateLimit = async () => {
  const meta = await readLoginAttemptMeta();
  const now = Date.now();

  if (meta.lockedUntil > now) {
    const waitMinutes = Math.ceil((meta.lockedUntil - now) / 60000);
    throw new Error(`Too many login attempts. Try again in ${waitMinutes} minute(s).`);
  }

  if (meta.windowStart && now - meta.windowStart > LOGIN_LOCK_WINDOW_MS) {
    await writeLoginAttemptMeta({ count: 0, windowStart: 0, lockedUntil: 0 });
  }
};

const markFailedLoginAttempt = async () => {
  const meta = await readLoginAttemptMeta();
  const now = Date.now();

  let nextCount = 1;
  let windowStart = now;

  if (meta.windowStart && now - meta.windowStart <= LOGIN_LOCK_WINDOW_MS) {
    nextCount = meta.count + 1;
    windowStart = meta.windowStart;
  }

  const lockedUntil =
    nextCount >= MAX_LOGIN_ATTEMPTS ? now + LOGIN_LOCK_WINDOW_MS : 0;

  await writeLoginAttemptMeta({
    count: nextCount,
    windowStart,
    lockedUntil,
  });
};

const resetLoginAttempts = async () => {
  try {
    await AsyncStorage.removeItem(LOGIN_ATTEMPT_KEY);
  } catch (error) {
    console.error("Error clearing login attempt metadata:", error);
  }
};

const parseAuthPayload = (payload, actionLabel) => {
  if (!isPlainObject(payload)) {
    throw new Error(`${actionLabel} failed: server returned an invalid response.`);
  }

  const data = payload.data;
  if (!isPlainObject(data)) {
    throw new Error(`${actionLabel} failed: missing response data.`);
  }

  return data;
};

const isCredentialError = (error) =>
  error instanceof ApiError && error.status === 401;

const isPendingActivationError = (error) =>
  error instanceof ApiError &&
  error.status === 403 &&
  /pending|inactive|administrator/i.test(error.message);

/**
 * Authenticate user against UniMate API
 */
export const loginUser = async (email, password, tenantCode) => {
  const normalizedEmail = normalizeEmail(email);
  const normalizedTenantCode = normalizeTenantCode(tenantCode);

  if (!normalizedEmail || !password || !normalizedTenantCode) {
    throw new Error("Email, password, and university code are required.");
  }

  assertEmail(normalizedEmail);
  assertTenantCode(normalizedTenantCode);

  await enforceLoginRateLimit();

  try {
    const payload = await apiRequest(API_ENDPOINTS.AUTH.LOGIN, {
      method: "POST",
      body: JSON.stringify({
        email: normalizedEmail,
        password,
        tenantCode: normalizedTenantCode,
      }),
    });

    const data = parseAuthPayload(payload, "Login");

    if (!data.accessToken || !data.refreshToken || !isPlainObject(data.user)) {
      throw new Error("Login failed: incomplete token or user data.");
    }

    await setTokens({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
    await setUserProfile(data.user);
    await resetLoginAttempts();

    return data.user;
  } catch (error) {
    if (isCredentialError(error)) {
      await markFailedLoginAttempt();
    }

    throw error;
  }
};



/**
 * Fetch current user profile
 */
export const getCurrentUser = async () => {
  const payload = await apiRequest(API_ENDPOINTS.USERS.ME, {
    method: "GET",
  });

  if (!isPlainObject(payload)) {
    throw new Error("Failed to load user profile: invalid server response.");
  }

  const user = payload.data;
  if (!isPlainObject(user)) {
    throw new Error("Failed to load user profile: missing data.");
  }

  await setUserProfile(user);
  return user;
};

/**
 * Logout
 */
export const logoutUser = async () => {
  try {
    await apiRequest(API_ENDPOINTS.AUTH.LOGOUT, { method: "POST" });
  } catch (error) {
    // ignore logout API errors so local cleanup always happens
  } finally {
    await clearTokens();
  }
};

/**
 * Load cached user profile
 */
export const loadCachedUser = async () => {
  return getUserProfile();
};
