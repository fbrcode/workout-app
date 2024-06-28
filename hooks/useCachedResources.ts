import { useEffect, useState } from "react";
import * as Font from "expo-font";
import { clearWorkouts, getWorkouts, initWorkouts } from "../storage/workouts";

export default function useCachedResources(): boolean {
  // new state: isLoadingComplete (value) [by default = false]
  // setLoadingComplete is the function (mutator) that changes the state of isLoadingComplete
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  // useEffect is a hook that runs a function when the component is mounted
  // First argument: the function to run
  // Second argument: array for the dependencies of the function
  // useEffect will be executed many times as isLoadingComplete
  // It works like a state change listener
  // If the dependency array is empty, the function will be executed only once
  useEffect(() => {
    // console.log("useEffect executed");
    async function loadDataAndResourcesAsync() {
      /* Example: function to be executed after a delay of 3 seconds
      setTimeout(() => {
        // console.log("Setting isLoadingComplete to true");
        setLoadingComplete(true);
      }, 3000);
      */

      try {
        // await clearWorkouts();
        await initWorkouts();
        await Font.loadAsync({
          "montserrat-regular": require("../assets/fonts/Montserrat-Regular.ttf"),
          "montserrat-bold": require("../assets/fonts/Montserrat-Bold.ttf"),
        });
      } catch (e) {
        console.error(e);
      } finally {
        // const workouts = await getWorkouts();
        // console.log("Workouts:", workouts);
        setLoadingComplete(true);
      }
    }
    loadDataAndResourcesAsync();
  }, []);
  // console.log("Returning:", isLoadingComplete);
  return isLoadingComplete;
}
