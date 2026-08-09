import { axiosClient } from './axiosClient';

export interface GenerateItineraryPayload {
  title?: string;
  start_time: string; // ISO String
  end_time: string;   // ISO String
  budget: number;
  lat: number;
  lng: number;
}

export interface ItineraryStop {
  stop_id: string;
  restaurant_id: string;
  order_index: number;
  restaurant_name: string;
  restaurant_lat: number;
  restaurant_lng: number;
}

export interface Itinerary {
  id: string;
  user_id: string;
  title: string;
  start_time: string;
  end_time: string;
  budget: number;
  start_location: any; // PostGIS Point
  status: string;
  created_at: string;
  stops?: ItineraryStop[];
}

export const itineraryApi = {
  generate: async (payload: GenerateItineraryPayload): Promise<Itinerary> => {
    return await axiosClient.post<any, Itinerary>('/itineraries/generate', payload);
  },
  
  getItineraries: async (): Promise<Itinerary[]> => {
    return await axiosClient.get<any, Itinerary[]>('/itineraries');
  },

  getItineraryById: async (id: string): Promise<Itinerary> => {
    return await axiosClient.get<any, Itinerary>(`/itineraries/${id}`);
  }
};
