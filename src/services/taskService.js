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

export const listAssignments = async (params = { page: 1, limit: 20 }) => {
  const res = await apiRequest(API_ENDPOINTS.ASSIGNMENTS.ROOT + buildQuery(params));
  return Array.isArray(res?.data) ? res.data : [];
};

export const listMyAssignments = async (params = { page: 1, limit: 20 }) => {
  const res = await apiRequest(API_ENDPOINTS.ASSIGNMENTS.MY + buildQuery(params));
  return Array.isArray(res?.data) ? res.data : [];
};

export const listMySubmissions = async (params = { page: 1, limit: 20 }) => {
  const res = await apiRequest(API_ENDPOINTS.ASSIGNMENTS.MY_SUBMISSIONS + buildQuery(params));
  return Array.isArray(res?.data) ? res.data : [];
};

export const getAssignmentById = (id) =>
  apiRequest(API_ENDPOINTS.ASSIGNMENTS.BY_ID(id));

export const submitAssignment = (id, payload) =>
  apiRequest(API_ENDPOINTS.ASSIGNMENTS.SUBMIT(id), {
    method: "POST",
    body: JSON.stringify(payload),
  });
