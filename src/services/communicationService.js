import API_ENDPOINTS from "../config/api";
import { apiRequest } from "./apiClient";

const buildQuery = (params) => {
  if (!params) return "";
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, String(value));
    }
  });
  const str = query.toString();
  return str ? `?${str}` : "";
};

// ── Announcements ─────────────────────────────────────────────────────────────
export const listAnnouncements = async (params = { page: 1, limit: 20 }) => {
  const res = await apiRequest(API_ENDPOINTS.ANNOUNCEMENTS.ROOT + buildQuery(params));
  return Array.isArray(res?.data) ? res.data : [];
};

export const markAnnouncementRead = (id) =>
  apiRequest(API_ENDPOINTS.ANNOUNCEMENTS.READ(id), { method: "PATCH" });

// ── Events ────────────────────────────────────────────────────────────────────
export const listEvents = async (params = { page: 1, limit: 50 }) => {
  const res = await apiRequest(API_ENDPOINTS.EVENTS.ROOT + buildQuery(params));
  return Array.isArray(res?.data) ? res.data : [];
};

export const listUpcomingEvents = async (params = { limit: 5 }) => {
  const res = await apiRequest(API_ENDPOINTS.EVENTS.UPCOMING + buildQuery(params));
  return Array.isArray(res?.data) ? res.data : [];
};
