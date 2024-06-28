import { containsKey, storeData, getData, removeItem } from ".";
import data from "../data.json";
import { Workout } from "../types/data";

const workoutKey = "workout-data";

export const initWorkouts = async (): Promise<boolean> => {
  const hasWorkouts = await containsKey(workoutKey);
  if (!hasWorkouts) {
    // console.log("Storing data...");
    await storeData(workoutKey, data);
    return true;
  }
  return false;
};

export const getWorkouts = async (): Promise<Workout[]> => {
  const workouts = await getData(workoutKey);
  return workouts;
};

export const getWorkoutBySlug = async (slug: string): Promise<Workout> => {
  const workouts = await getWorkouts();
  const workout = workouts.filter((w) => w.slug === slug)[0];
  return workout;
};

export const storeWorkout = async (newWorkout: Workout): Promise<boolean> => {
  const workouts = await getWorkouts();
  const updatedWorkouts = [...workouts, newWorkout];
  await storeData(workoutKey, updatedWorkouts);
  return true;
};

export const clearWorkouts = async (): Promise<void> => {
  await removeItem(workoutKey);
};
