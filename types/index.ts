export interface Exercise {
  id: string;
  image: string;
  name: string;
  sets: number;
}

export interface FitnessData {
  id: string;
  image: string;
  name: string;
  description: string;
  exercises: Exercise[];
}

export interface FitnessContextType {
  completed: string[];
  setCompleted: React.Dispatch<React.SetStateAction<string[]>>;
  workout: number;
  setWorkout: React.Dispatch<React.SetStateAction<number>>;
  calories: number;
  setCalories: React.Dispatch<React.SetStateAction<number>>;
  minutes: number;
  setMinutes: React.Dispatch<React.SetStateAction<number>>;
}
