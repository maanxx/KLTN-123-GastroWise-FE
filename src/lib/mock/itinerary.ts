export interface Stop {
  id: string;
  time: string;
  restaurantName: string;
  cuisine: string;
  estimatedCost: number;
  distanceFromPrevious: number; // in km
  address: string;
}

export interface Itinerary {
  id: string;
  title: string;
  date: string;
  totalBudget: number;
  totalDistance: number;
  stops: Stop[];
}

export const MOCK_ITINERARIES: Itinerary[] = [
  {
    id: '1',
    title: 'Food Tour Quận 1 Cuối Tuần',
    date: '2023-11-20',
    totalBudget: 450000,
    totalDistance: 5.2,
    stops: [
      {
        id: 's1',
        time: '08:00',
        restaurantName: 'Phở Hoà Pasteur',
        cuisine: 'Món Việt',
        estimatedCost: 90000,
        distanceFromPrevious: 0,
        address: '260C Pasteur, Quận 3',
      },
      {
        id: 's2',
        time: '12:00',
        restaurantName: 'The Workshop Coffee',
        cuisine: 'Cafe & Đồ uống',
        estimatedCost: 120000,
        distanceFromPrevious: 1.5,
        address: '27 Ngô Đức Kế, Quận 1',
      },
      {
        id: 's3',
        time: '18:30',
        restaurantName: 'Pizza 4P\'s',
        cuisine: 'Món Ý',
        estimatedCost: 240000,
        distanceFromPrevious: 3.7,
        address: '8 Thủ Khoa Huân, Quận 1',
      },
    ],
  },
  {
    id: '2',
    title: 'Hành trình Món Ăn Chay Thanh Đạm',
    date: '2023-11-22',
    totalBudget: 280000,
    totalDistance: 3.8,
    stops: [
      {
        id: 's4',
        time: '11:30',
        restaurantName: 'Hum Vegetarian',
        cuisine: 'Chay',
        estimatedCost: 150000,
        distanceFromPrevious: 0,
        address: '32 Võ Văn Tần, Quận 3',
      },
      {
        id: 's5',
        time: '15:00',
        restaurantName: 'Kashew Cheese Deli',
        cuisine: 'Tráng miệng',
        estimatedCost: 130000,
        distanceFromPrevious: 3.8,
        address: '14 Trần Ngọc Diện, Quận 2',
      },
    ],
  },
];
