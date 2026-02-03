import React, { createContext, useState, ReactNode } from "react";
import { FitnessContextType } from "./types";

const FitnessItems = createContext<FitnessContextType | undefined>(undefined);

interface FitnessContextProps {
  children: ReactNode;
}

const FitnessContext: React.FC<FitnessContextProps> = ({ children }) => {
  const [completed, setCompleted] = useState<string[]>([]);
  const [workout, setWorkout] = useState<number>(0);
  const [calories, setCalories] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);

  return (
    <FitnessItems.Provider
      value={{
        completed,
        setCompleted,
        workout,
        setWorkout,
        calories,
        setCalories,
        minutes,
        setMinutes,
      }}
    >
      {children}
    </FitnessItems.Provider>
  );
};

export { FitnessContext, FitnessItems };
