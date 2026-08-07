import type { CuisineTypeId, TimeSlotId } from '@/lib/constants';

/**
 * Sở thích người dùng (gửi lên API để tạo lộ trình)
 */
export interface UserPreferences {
  cuisineTypes: CuisineTypeId[];
  date: string;
  timeSlots: TimeSlotId[];
  minBudget: number;
  maxBudget: number;
  numberOfPeople: number;
  dietaryOptions?: string[];
  notes?: string;
  preferOutdoor?: boolean;
  maxDistance?: number; // km
}
