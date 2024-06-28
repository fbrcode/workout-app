export function secToMin(seconds: number) {
  return (seconds / 60).toFixed(1);
}

export function formatSec(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (remainingSeconds === 0) {
    return `${minutes} min`;
  }
  if (minutes === 0) {
    return `${remainingSeconds} sec`;
  }
  return `${minutes} min ${remainingSeconds.toString().padStart(2, "0")} sec`;
}
