import api from './axios';

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  cuisine: string | null;
  opening_hours: string | null;
  phone: string | null;
  rating_avg: number | null;
  cover_image: string | null;
  lat: number;
  lng: number;
  distance_m?: number;
  priceRange?: string;
  openingTime?: string;
}

export interface GetRestaurantsParams {
  search?: string;
  cuisine?: string;
  lat?: number;
  lng?: number;
  radius?: number; // in meters
}

export const restaurantApi = {
  getRestaurants: async (params?: GetRestaurantsParams): Promise<any> => {
    // Gọi tới /restaurants thay vì /explore, dùng phân trang và query
    const res = await api.get('/restaurants', { 
      params: { 
        search: params?.search,
        page: 1, 
        limit: 32, 
        sortBy: "diemTrungBinh", 
        order: "desc" 
      } 
    });
    return res.data?.data || res.data;
  },

  getRestaurantById: async (id: string): Promise<any> => {
    const res = await api.get(`/restaurants/${id}`);
    return res.data;
  },

  getRecommendations: async (params?: { lat?: number, lng?: number, page?: number, limit?: number }): Promise<any> => {
    // Chuyển hướng sang top rated vì backend chưa có route /recommendations riêng
    const res = await api.get('/restaurants', { params: { limit: 10, sortBy: 'diemTrungBinh', order: 'desc' } });
    return { data: res.data?.data || [], pagination: { total: 10, page: 1, limit: 10, totalPages: 1 } };
  },

  getRestaurantMenu: async (id: string): Promise<any[]> => {
    try {
      const res = await api.get(`/restaurants/${id}/menu`);
      return res.data;
    } catch {
      return []; // Return empty if menu endpoint not ready
    }
  },

  searchByImage: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await api.post("/restaurants/search-by-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  chat: async (message: string, userLat: string = "", userLon: string = "") => {
    const res = await api.post("/restaurants/chat", { message, userLat, userLon });
    return res.data;
  }
};
