// src/types/workout.ts

export interface Workout {
  id: string | number; 
  name: string;
  image?: string;
  description?: string;
  equipment?: string;
  difficulty?: string;
  sets?: number;
  reps?: string;
  duration?: number;
  calories?: number;
  rating?: number;
  category?: string;
  categories?: string[];
  instructions?: string[];
  isDone?: boolean;
}

export type SortOption = 'Duration' | 'Calories' | 'Rating';

// এই লাইনটি যুক্ত করা হলো PlanContext এর error দূর করার জন্য
export type PlanItem = Workout;