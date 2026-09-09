import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_GATEWAY_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    if (error.response?.status === 403) {
      const msg = error.response?.data?.message || '';
      if (msg.toLowerCase().includes('khóa') || msg.toLowerCase().includes('banned')) {
        if (typeof window !== "undefined") {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          alert(msg || 'Tài khoản của bạn đã bị khóa bởi Quản trị viên do vi phạm điều khoản.');
          window.location.href = "/login";
        }
      }
    }
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem('token');
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error.response?.data || error);
  }
);
