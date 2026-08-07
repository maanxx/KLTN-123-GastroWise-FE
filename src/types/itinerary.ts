import type { Restaurant } from './restaurant';

/**
 * Lộ trình ẩm thực
 */
export interface Itinerary {
  id: string;
  name: string;
  description: string;
  totalDistance: number;     // mét
  totalDuration: number;    // phút
  totalEstimatedCost: number; // VND
  numberOfStops: number;
  stops: ItineraryStop[];
  rating?: number;
  createdAt: string;
}

/**
 * Một điểm dừng trong lộ trình
 */
export interface ItineraryStop {
  order: number;
  restaurant: Restaurant;
  arrivalTime: string;
  departureTime: string;
  estimatedCost: number;    // VND
  distanceFromPrevious: number; // mét
  durationFromPrevious: number; // phút
  recommendedDishes: string[];
  notes?: string;
}

/**
 * Toạ độ GPS
 */
export interface Coordinate {
  latitude: number;
  longitude: number;
}
