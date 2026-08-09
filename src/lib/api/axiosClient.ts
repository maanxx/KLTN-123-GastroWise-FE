import axios from "axios";

// 1. Tạo một instance của Axios
export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_GATEWAY_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. Interceptor cho Request
axiosClient.interceptors.request.use(
  (config) => {
    // Đính kèm token vào header nếu có
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

// 3. Interceptor cho Response
axiosClient.interceptors.response.use(
  (response) => {
    // BE trả về trực tiếp response.data
    return response.data;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // Token hết hạn hoặc không hợp lệ -> đăng xuất
      if (typeof window !== "undefined") {
        localStorage.removeItem('token');
        window.location.href = "/login";
      }
    }
    return Promise.reject(error.response?.data || error);
  }
);
