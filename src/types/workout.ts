export interface Workout {
  id: string | number;
  name: string;
  description?: string;
  categories: string[];
  equipment: string;
  difficulty?: string;
  sets?: number | string;
  reps?: string;
  duration: number; // minutes
  calories: number; // kcal
  rating: number;
  image: string;
  instructions?: string[];
}

export interface PlanItem extends Workout {
  isDone?: boolean;
}

export type SortOption = 'Duration' | 'Calories' | 'Rating';