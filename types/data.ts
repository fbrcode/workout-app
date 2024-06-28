export type Difficulty = "easy" | "normal" | "hard";

export interface Workout {
  slug: string;
  name: string;
  duration: number;
  difficulty: Difficulty;
  sequence: SequenceItem[];
}

export type SequenceType = "exercise" | "stretch" | "break";

export interface SequenceItem {
  slug: string;
  name: string;
  type: SequenceType;
  reps?: number;
  duration: number;
}
