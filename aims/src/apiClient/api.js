import axios from "axios";
import * as CONSTANT from "./api.constant";

const api = axios.create({
  baseURL: CONSTANT.API_URL, // Replace with your API base URL
  timeout: 10000, // Set a reasonable timeout
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": 69420,
    // Add any common headers here
  },
});

api.interceptors.request.use(
  (config) => {
    // You can modify the request config here, e.g., adding authentication headers
    const authToken = JSON.parse(localStorage.getItem("authToken"));
    config.headers.Authorization = `Bearer ${authToken}`;
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // You can modify the response data here
    return response;
  },
  (error) => {
    // Handle response error
    return Promise.reject(error);
  }
);

export default api;
