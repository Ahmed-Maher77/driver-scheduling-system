import axios from "axios";

// Create axios instance with base configuration
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 60000, // 60 seconds timeout for large payloads
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Add any request modifications here
        // console.log(`🚀 Making request to: ${config.baseURL}${config.url}`);
        // console.log(`📤 Request method: ${config.method?.toUpperCase()}`);
        // console.log(`📤 Request data:`, config.data);
        return config;
    },
    (error) => {
        console.error("❌ Request error:", error);
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Handle successful responses
        // console.log(`✅ Response received from: ${response.config.url}`, response.status);
        return response;
    },
    (error) => {
        // Handle response errors
        if (error.response) {
            // Server responded with error status
            // console.error(`❌ Server error ${error.response.status}:`, error.response.data);
        } else if (error.request) {
            // Request was made but no response received
            // console.error("❌ Network error - No response received:", error.message);
            // console.error("❌ Request details:", error.config);
        } else {
            // Something else happened
            // console.error("❌ Request setup error:", error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
