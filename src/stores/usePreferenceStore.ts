import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { UserPreferences } from '@/types';

interface PreferenceState {
  // Current step (1-4)
  currentStep: number;
  
  // Data collected so far
  data: Partial<UserPreferences>;
  
  // Actions
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  updateData: (partialData: Partial<UserPreferences>) => void;
  reset: () => void;
}

const initialState = {
  currentStep: 1,
  data: {
    cuisineTypes: [],
    date: new Date().toISOString().split('T')[0], // Mặc định hôm nay
    timeSlots: [],
    minBudget: 50000,
    maxBudget: 500000, // Mặc định 500k
    numberOfPeople: 2, // Mặc định 2 người
    dietaryOptions: [],
    notes: '',
    preferOutdoor: false,
    maxDistance: 10, // Mặc định 10km
  },
};

export const usePreferenceStore = create<PreferenceState>()(
  persist(
    (set) => ({
      ...initialState,

      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, 4),
        })),

      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 1),
        })),

      setStep: (step: number) =>
        set(() => ({
          currentStep: Math.max(1, Math.min(step, 4)),
        })),

      updateData: (partialData) =>
        set((state) => ({
          data: { ...state.data, ...partialData },
        })),

      reset: () =>
        set({
          ...initialState,
          // Giữ lại date là hôm nay khi reset
          data: { ...initialState.data, date: new Date().toISOString().split('T')[0] },
        }),
    }),
    {
      name: 'gastrowise_preferences', // Tên key lưu trong localStorage
      // Tuỳ chọn: chỉ lưu 'data' và 'currentStep', không lưu hàm actions
      partialize: (state) => ({ 
        currentStep: state.currentStep, 
        data: state.data 
      }),
    },
  ),
);
