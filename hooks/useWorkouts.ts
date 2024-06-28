import { useEffect, useState } from "react";
import { Workout } from "../types/data";
import { getWorkouts } from "../storage/workouts";
import { useIsFocused } from "@react-navigation/native";

export const useWorkouts = (): Workout[] => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const isFocused = useIsFocused(); // identify when the page is getting focus

  useEffect(() => {
    async function getData() {
      // console.log("Getting workouts data...");
      const _workouts = await getWorkouts();
      setWorkouts(_workouts);
    }
    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  return workouts;
};
