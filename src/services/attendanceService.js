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

export const getMyAttendance = async (params = { page: 1, limit: 50 }) => {
  const res = await apiRequest(API_ENDPOINTS.ATTENDANCE.MY + buildQuery(params));
  return res?.data || { courses: [] };
};

export const getMyAttendanceHistory = async (offeringId) => {
  const res = await apiRequest(API_ENDPOINTS.ATTENDANCE.MY + `/${offeringId}`);
  return Array.isArray(res?.data) ? res.data : [];
};
