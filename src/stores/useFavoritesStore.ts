import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FavoriteRestaurant {
  id: string;
  name: string;
  address: string;
  image?: string;
  rating?: number;
  priceRange?: string;
  tags?: string[];
  district?: string;
}

interface FavoritesStore {
  favorites: FavoriteRestaurant[];
  addFavorite: (restaurant: FavoriteRestaurant) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (restaurant: FavoriteRestaurant) => boolean; // returns true if now favorite
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [
        {
          id: '6a7d8da3c8148b897824b164',
          name: 'Phở Thìn Bờ Hồ - Chi Nhánh Đặc Biệt',
          address: '13 Lò Đúc, Phạm Đình Hổ, Hai Bà Trưng, Hà Nội',
          image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80',
          rating: 4.8,
          priceRange: '50.000đ - 120.000đ',
          tags: ['MÓN NƯỚC', 'phở', 'hà nội'],
          district: 'Hai Bà Trưng',
        },
        {
          id: '6a7d8da3c8148b897824b11b',
          name: 'Cơm Tấm Ba Gái - Sài Gòn Chuẩn Vị',
          address: '236 Đinh Tiên Hoàng, Đa Kao, Quận 1, TPHCM',
          image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
          rating: 4.9,
          priceRange: '45.000đ - 85.000đ',
          tags: ['CƠM', 'cơm tấm', 'sài gòn'],
          district: 'Quận 1',
        },
      ],

      addFavorite: (restaurant) => {
        set((state) => {
          if (state.favorites.some((f) => f.id === restaurant.id)) return state;
          return { favorites: [...state.favorites, restaurant] };
        });
      },

      removeFavorite: (id) => {
        set((state) => ({
          favorites: state.favorites.filter((f) => f.id !== id),
        }));
      },

      toggleFavorite: (restaurant) => {
        const exists = get().isFavorite(restaurant.id);
        if (exists) {
          get().removeFavorite(restaurant.id);
          return false;
        } else {
          get().addFavorite(restaurant);
          return true;
        }
      },

      isFavorite: (id) => {
        return get().favorites.some((f) => f.id === id);
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: 'gastrowise-favorites-storage',
    }
  )
);
