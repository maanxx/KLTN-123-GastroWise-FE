import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  note?: string;
  restaurantId: string;
  restaurantName: string;
}

interface CartStore {
  items: CartItem[];
  voucherCode: string;
  discountAmount: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateNote: (id: string, note: string) => void;
  applyVoucher: (code: string) => boolean;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      voucherCode: '',
      discountAmount: 0,

      addItem: (newItem) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.id === newItem.id && i.restaurantId === newItem.restaurantId
          );

          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex].quantity += 1;
            return { items: updatedItems };
          } else {
            return {
              items: [...state.items, { ...newItem, quantity: 1 }],
            };
          }
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      updateNote: (id, note) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, note } : item
          ),
        }));
      },

      applyVoucher: (code) => {
        const cleanCode = code.trim().toUpperCase();
        if (cleanCode === 'GASTRO20' || cleanCode === 'CHAO2026' || cleanCode === 'FREESHIP') {
          const subtotal = get().getSubtotal();
          const discount = Math.round(subtotal * 0.2); // 20% off
          set({ voucherCode: cleanCode, discountAmount: discount });
          return true;
        }
        return false;
      },

      clearCart: () => {
        set({ items: [], voucherCode: '', discountAmount: 0 });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().discountAmount;
        return Math.max(0, subtotal - discount);
      },
    }),
    {
      name: 'gastrowise-cart-storage',
    }
  )
);
