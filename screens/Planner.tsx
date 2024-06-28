import { useState } from "react";
import slugify from "slugify";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import ExerciseForm, { ExerciseFormData } from "../components/ExerciseForm";
import ExerciseItem from "../components/ExerciseItem";
import { Difficulty, SequenceItem, SequenceType, Workout } from "../types/data";
import { PressableText } from "../components/styled/PressableText";
import { ModalDetail } from "../components/styled/ModalDetail";
import WorkoutForm, { WorkoutFormData } from "../components/WorkoutForm";
import { storeWorkout } from "../storage/workouts";

export function PlannerScreen({
  navigation,
}: NativeStackHeaderProps): JSX.Element {
  const [seqItems, setSeqItems] = useState<SequenceItem[]>([]);

  const handleExerciseSubmit = (form: ExerciseFormData) => {
    // alert(`${form.name} - ${form.duration} - ${form.reps} - ${form.type}`);
    const sequenceItem: SequenceItem = {
      slug: slugify(form.name + "-" + Date.now(), { lower: true }),
      name: form.name,
      duration: Number(form.duration),
      type: form.type as SequenceType,
      reps: form.reps ? Number(form.reps) : undefined,
    };
    // console.log(sequenceItem);

    setSeqItems([...seqItems, sequenceItem]);
  };

  const computeWorkoutDifficulty = (
    exercisesCount: number,
    workoutDuration: number
  ): Difficulty => {
    const difficultyDifference = workoutDuration / exercisesCount;
    if (difficultyDifference <= 60) {
      return "hard";
    } else if (difficultyDifference <= 100) {
      return "normal";
    } else {
      return "easy";
    }
  };

  const handleWorkoutSubmit = async (form: WorkoutFormData) => {
    // alert(`${form.name}`);
    if (seqItems.length === 0) {
      alert("Please add some exercises first.");
      return;
    }

    const duration = seqItems.reduce((acc, item) => acc + item.duration, 0);

    const workout: Workout = {
      name: form.name,
      slug: slugify(form.name + "-" + Date.now(), { lower: true }),
      difficulty: computeWorkoutDifficulty(seqItems.length, duration),
      sequence: [...seqItems],
      duration,
    };

    // console.log(workout);
    await storeWorkout(workout);
  };

  return (
    <View style={styles.container}>
      <ExerciseForm onSubmit={handleExerciseSubmit} />
      <View>
        <ModalDetail
          activator={({ handleOpen }) => (
            <PressableText
              style={{ marginTop: 15, marginBottom: 15 }}
              text="Create Workout"
              onPress={handleOpen}
            />
          )}
        >
          {({ handleClose }) => (
            <View>
              {/* <WorkoutForm onSubmit={handleWorkoutSubmit} /> */}
              <WorkoutForm
                onSubmit={async (data) => {
                  await handleWorkoutSubmit(data);
                  handleClose();
                  navigation.navigate("Home");
                }}
              />
            </View>
          )}
        </ModalDetail>
      </View>
      <FlatList
        data={seqItems}
        keyExtractor={(item) => item.slug}
        // renderItem={ExerciseItem}
        renderItem={({ item, index }) => (
          <ExerciseItem item={item}>
            <PressableText
              text="Remove"
              onPress={() => {
                const itemsCopy = [...seqItems];
                itemsCopy.splice(index, 1);
                setSeqItems(itemsCopy);
                // alert(`Remove ${item.slug} at index ${index}`);
              }}
            />
          </ExerciseItem>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
