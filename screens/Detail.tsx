import { View, Text, StyleSheet } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useWorkoutBySlug } from "../hooks/useWorkoutBySlug";
import { ModalDetail } from "../components/styled/ModalDetail";
import { PressableText } from "../components/styled/PressableText";
import { formatSec } from "../utils/time";
import { FontAwesome } from "@expo/vector-icons";
import WorkoutItem from "../components/WorkoutItem";
import { useEffect, useState } from "react";
import { SequenceItem } from "../types/data";
import { useCountDown } from "../hooks/useCountDown";

type DetailParams = {
  route: {
    params: {
      slug: string;
    };
  };
};

type Navigation = NativeStackHeaderProps & DetailParams;

export function WorkoutDetailScreen({ route }: Navigation) {
  const [sequence, setSequence] = useState<SequenceItem[]>([]);
  const [trackerIdx, setTrackerIdx] = useState<number>(-1); // current item from the sequence currently playing
  const workout = useWorkoutBySlug(route.params.slug);

  const startupSequence = ["3", "2", "1", "Go!"].reverse();
  const { countDown, isRunning, stop, start } = useCountDown(trackerIdx);

  useEffect(() => {
    // console.log(countDown);
    // console.log(`Count Down Hook, idx = ${trackerIdx} | duration = ${duration}`);
    // don't do anything if workout is not found
    if (!workout) return;

    // don't do anything if the sequence is the final one
    if (trackerIdx === workout.sequence.length - 1) return;

    // test count down stop
    // if (countDown === 10) stop();

    // console.log(`Count Down Detail Screen [${trackerIdx}] =`, countDown);
    if (countDown === 0) {
      addItemToSequence(trackerIdx + 1);
    }
  }, [countDown]);

  const addItemToSequence = (idx: number) => {
    // debugger;
    // add or restart the sequence depending on the index
    const newSequence =
      idx > 0
        ? [...sequence, workout!.sequence[idx]]
        : [workout!.sequence[idx]];
    setSequence(newSequence);
    setTrackerIdx(idx);
    start(newSequence[idx].duration + startupSequence.length);
  };

  // if no workout is found, show a loading message
  if (!workout) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const hasReachedEnd =
    sequence.length === workout.sequence.length && countDown === 0;

  // if workout is found, show the workout details
  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>{workout.name}</Text> */}
      <WorkoutItem item={workout} childStyles={{ marginTop: 10 }}>
        <ModalDetail
          activator={({ handleOpen }) => (
            <PressableText onPress={handleOpen} text="Check sequence" />
          )}
        >
          {() => (
            <View>
              {workout.sequence.map((s, idx) => (
                <View key={s.slug} style={styles.sequenceItem}>
                  <Text>
                    {s.name} | {s.type} | {formatSec(s.duration)}
                  </Text>
                  {idx !== workout.sequence.length - 1 && (
                    <FontAwesome name="arrow-down" size={20} color="black" />
                  )}
                </View>
              ))}
            </View>
          )}
        </ModalDetail>
      </WorkoutItem>
      <View style={styles.playerWrapper}>
        <View style={styles.counterUI}>
          <View style={styles.counterItem}>
            {sequence.length === 0 ? (
              <FontAwesome
                name="play-circle-o"
                size={100}
                onPress={() => addItemToSequence(0)}
              />
            ) : isRunning ? (
              <FontAwesome
                name="stop-circle-o"
                size={100}
                onPress={() => stop()}
              />
            ) : (
              <FontAwesome
                name="play-circle-o"
                size={100}
                onPress={() => {
                  if (hasReachedEnd) {
                    addItemToSequence(0);
                  } else {
                    start(countDown);
                  }
                }}
              />
            )}
          </View>
          {sequence.length > 0 && countDown >= 0 && (
            <View style={styles.counterItem}>
              <Text style={{ fontSize: 55 }}>
                {countDown > sequence[trackerIdx].duration
                  ? startupSequence[
                      countDown - sequence[trackerIdx].duration - 1
                    ]
                  : countDown}
              </Text>
            </View>
          )}
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 35, fontWeight: "bold" }}>
            {sequence.length === 0
              ? "Prepare!"
              : hasReachedEnd
              ? "Great Job!"
              : sequence[trackerIdx].name}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sequenceItem: {
    alignItems: "center",
  },
  counterUI: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
  counterItem: {
    flex: 1,
    alignItems: "center",
  },
  playerWrapper: {
    borderRadius: 10,
    borderColor: "rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    borderWidth: 1,
    padding: 10,
  },
});
