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

export const getMyGrades = async (params = { page: 1, limit: 50 }) => {
  const res = await apiRequest(API_ENDPOINTS.GRADES.MY + buildQuery(params));
  return Array.isArray(res?.data) ? res.data : [];
};

export const getMyGradesSummary = async () => {
  const res = await apiRequest(API_ENDPOINTS.GRADES.MY_SUMMARY);
  return res?.data || { cgpa: null, sgpa: null, courses: [] };
};

export const getMyAllSemesters = async () => {
  const res = await apiRequest(API_ENDPOINTS.GRADES.MY_ALL_SEMESTERS);
  return res?.data || {};
};

export const getMyCourseGradeDetails = async (courseId) => {
  const res = await apiRequest(API_ENDPOINTS.GRADES.MY + `/course/${courseId}`);
  return res?.data || null;
};

export const updateGpaGoals = (data) =>
  apiRequest(API_ENDPOINTS.GRADES.MY + "/gpa-goals", {
    method: "POST",
    body: JSON.stringify(data),
  });
