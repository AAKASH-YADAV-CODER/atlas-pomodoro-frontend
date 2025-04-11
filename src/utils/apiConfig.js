// API URL configuration
const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL ||
  "https://atlas-pomodoro-backend.onrender.com";

// Helper function to get the full API URL
export const getApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

export default API_BASE_URL;
