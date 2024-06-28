import { useEffect, useRef, useState } from "react";

export function useCountDown(idx: number, duration: number = -1) {
  const intervalRef = useRef<number>(); // create reference to the interval id as a global function variable
  const [countDown, setCountDown] = useState<number>(duration); // time for the sequence item count down in seconds
  const [isRunning, setRunning] = useState<boolean>(false);

  useEffect(() => {
    // debugger;
    if (idx === -1) return;

    if (isRunning && !intervalRef.current) {
      // call this function every second
      intervalRef.current = window.setInterval(() => {
        setCountDown((count) => {
          // debugger;
          // console.log(count);
          return count - 1;
        });
        // }, 1000);
      }, 1000);
    }

    // reset when we go back on previous screen
    // return () => window.clearInterval(intervalRef.current);
    return cleanup;
  }, [idx, isRunning]);

  useEffect(() => {
    // console.log("Duration changed to:", duration);
    setCountDown(duration);
  }, [duration]);

  // identify when count down is over
  useEffect(() => {
    if (countDown === 0) {
      // debugger;
      // console.log("Countdown is over");
      cleanup();
    }
  }, [countDown]);

  // clear the interval when the component is unmounted or reach 0
  const cleanup = () => {
    // debugger;
    if (intervalRef.current) {
      setRunning(false);
      window.clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  };

  return {
    countDown,
    isRunning,
    stop: cleanup,
    start: (count?: number) => {
      setCountDown(count ?? duration);
      setRunning(true);
    },
  };
}
