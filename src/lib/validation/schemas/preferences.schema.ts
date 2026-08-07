import { z } from 'zod';

import { APP_CONFIG } from '@/lib/constants';

/**
 * Schema cho bước 1: Chọn loại ẩm thực
 */
export const cuisineStepSchema = z.object({
  cuisineTypes: z
    .array(z.string())
    .min(1, 'Vui lòng chọn ít nhất 1 loại ẩm thực')
    .max(5, 'Chọn tối đa 5 loại'),
});

/**
 * Schema cho bước 2: Chọn thời gian
 */
export const timeStepSchema = z.object({
  date: z.string().min(1, 'Vui lòng chọn ngày'),
  timeSlots: z
    .array(z.string())
    .min(1, 'Vui lòng chọn ít nhất 1 khung giờ'),
});

/**
 * Schema cho bước 3: Thiết lập ngân sách
 */
export const budgetStepSchema = z.object({
  minBudget: z
    .number()
    .min(APP_CONFIG.MIN_BUDGET, `Ngân sách tối thiểu ${APP_CONFIG.MIN_BUDGET.toLocaleString('vi-VN')}đ`),
  maxBudget: z
    .number()
    .max(APP_CONFIG.MAX_BUDGET, `Ngân sách tối đa ${APP_CONFIG.MAX_BUDGET.toLocaleString('vi-VN')}đ`),
  numberOfPeople: z
    .number()
    .min(1, 'Tối thiểu 1 người')
    .max(20, 'Tối đa 20 người'),
});

/**
 * Schema cho bước 4: Tuỳ chọn bổ sung
 */
export const optionsStepSchema = z.object({
  dietaryOptions: z.array(z.string()).optional(),
  notes: z.string().max(500, 'Ghi chú tối đa 500 ký tự').optional(),
  preferOutdoor: z.boolean().optional(),
  maxDistance: z.number().min(1).max(50).optional(), // km
});

/**
 * Schema tổng hợp — toàn bộ preferences
 */
export const preferencesSchema = cuisineStepSchema
  .merge(timeStepSchema)
  .merge(budgetStepSchema)
  .merge(optionsStepSchema);

// Infer types
export type CuisineStepInput = z.infer<typeof cuisineStepSchema>;
export type TimeStepInput = z.infer<typeof timeStepSchema>;
export type BudgetStepInput = z.infer<typeof budgetStepSchema>;
export type OptionsStepInput = z.infer<typeof optionsStepSchema>;
export type PreferencesInput = z.infer<typeof preferencesSchema>;
