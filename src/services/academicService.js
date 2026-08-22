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

// ── Courses ───────────────────────────────────────────────────────────────────
export const listCourses = async (params = { page: 1, limit: 20 }) => {
  const res = await apiRequest(API_ENDPOINTS.COURSES.ROOT + buildQuery(params));
  return Array.isArray(res?.data) ? res.data : [];
};

// ── Offerings ─────────────────────────────────────────────────────────────────
export const listOfferings = async (params = { page: 1, limit: 20 }) => {
  const res = await apiRequest(API_ENDPOINTS.OFFERINGS.ROOT + buildQuery(params));
  return Array.isArray(res?.data) ? res.data : [];
};

// ── Enrollments ───────────────────────────────────────────────────────────────
export const listMyEnrollments = async (params = { page: 1, limit: 20 }) => {
  const res = await apiRequest(API_ENDPOINTS.ENROLLMENTS.MY + buildQuery(params));
  return Array.isArray(res?.data) ? res.data : [];
};

export const listAllEnrollments = async (params = { page: 1, limit: 20 }) => {
  const res = await apiRequest(API_ENDPOINTS.ENROLLMENTS.ROOT + buildQuery(params));
  return Array.isArray(res?.data) ? res.data : [];
};

// ── Schedules ─────────────────────────────────────────────────────────────────
export const getMySchedule = async (params = { page: 1, limit: 100 }) => {
  const res = await apiRequest(API_ENDPOINTS.SCHEDULES.MY + buildQuery(params));
  return Array.isArray(res?.data) ? res.data : [];
};

export const getTodaySchedule = async () => {
  const res = await apiRequest(API_ENDPOINTS.SCHEDULES.MY_TODAY);
  return Array.isArray(res?.data) ? res.data : [];
};
