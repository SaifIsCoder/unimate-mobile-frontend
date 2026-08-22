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

export const listCommunityPosts = async (params = { page: 1, limit: 20 }) => {
  const res = await apiRequest(API_ENDPOINTS.COMMUNITY.ROOT + buildQuery(params));
  return Array.isArray(res?.data) ? res.data : [];
};

export const createCommunityPost = (payload) =>
  apiRequest(API_ENDPOINTS.COMMUNITY.ROOT, {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const toggleLike = (id) =>
  apiRequest(API_ENDPOINTS.COMMUNITY.LIKE(id), { method: "POST" });

export const getComments = async (id, params = { page: 1, limit: 20 }) => {
  const res = await apiRequest(API_ENDPOINTS.COMMUNITY.COMMENTS(id) + buildQuery(params));
  return Array.isArray(res?.data) ? res.data : [];
};

export const createComment = (id, payload) =>
  apiRequest(API_ENDPOINTS.COMMUNITY.COMMENTS(id), {
    method: "POST",
    body: JSON.stringify(payload),
  });
