import axios from "axios";
import { API_URL } from "./APIUtils";
import { getAccessToken } from "../features/User/UserDetails";

const getAuthConfig = () => {
  const token = getAccessToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      accesstoken: token,
      "Content-Type": "application/json",
    },
  };
};

/**
 * Schedule an AI Technical Interview
 */
export const scheduleAIInterviewApi = async (payload) => {
  const url = `${API_URL}api/v1/ai-interview/schedule`;
  const response = await axios.post(url, payload, getAuthConfig());
  return response.data;
};

/**
 * Fetch AI Interview Session metadata by inviteToken
 */
export const fetchAIInterviewSessionApi = async (inviteToken) => {
  const url = `${API_URL}api/v1/ai-interview/session/${inviteToken}`;
  const response = await axios.get(url);
  return response.data;
};

/**
 * Fetch AI Interview Transcript turns by inviteToken
 */
export const fetchAIInterviewTranscriptApi = async (inviteToken) => {
  const url = `${API_URL}api/v1/ai-interview/transcript/${inviteToken}`;
  const response = await axios.get(url);
  return response.data;
};

/**
 * Fetch AI Interview Evaluation Report by inviteToken
 */
export const fetchAIInterviewReportApi = async (inviteToken) => {
  const url = `${API_URL}api/v1/ai-interview/report/${inviteToken}`;
  const response = await axios.get(url);
  return response.data;
};

/**
 * Fetch AI Interview Conversation Q&A Timeline by inviteToken
 */
export const fetchAIInterviewConversationApi = async (inviteToken) => {
  const url = `${API_URL}api/v1/ai-interview/conversation/${inviteToken}`;
  const response = await axios.get(url);
  return response.data;
};

/**
 * Fetch AI Interview Proctoring Timeline by inviteToken
 */
export const fetchAIInterviewProctoringApi = async (inviteToken) => {
  const url = `${API_URL}api/v1/ai-interview/proctoring/${inviteToken}`;
  const response = await axios.get(url);
  return response.data;
};

/**
 * Manually end AI Interview Session
 */
export const endAIInterviewSessionApi = async (inviteToken) => {
  const url = `${API_URL}api/v1/ai-interview/end/${inviteToken}`;
  const response = await axios.post(url, {}, getAuthConfig());
  return response.data;
};

/**
 * Cancel AI Interview Session
 */
export const cancelAIInterviewSessionApi = async (inviteToken, reason = "") => {
  const url = `${API_URL}api/v1/ai-interview/cancel/${inviteToken}`;
  const response = await axios.post(url, { reason }, getAuthConfig());
  return response.data;
};
