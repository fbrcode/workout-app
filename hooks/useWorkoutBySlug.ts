import { useEffect, useState } from "react";
import { Workout } from "../types/data";
import { getWorkoutBySlug, getWorkouts } from "../storage/workouts";
import { useIsFocused } from "@react-navigation/native";

export const useWorkoutBySlug = (slug: string): Workout | undefined => {
  const [workout, setWorkout] = useState<Workout>();

  useEffect(() => {
    async function getData() {
      const _workout = await getWorkoutBySlug(slug);
      setWorkout(_workout);
    }
    getData();
  }, []);

  return workout;
};
