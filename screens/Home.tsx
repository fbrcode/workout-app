import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
// import { MontserratText } from "../components/styled/MontserratText";
import WorkoutItem from "../components/WorkoutItem";
import { useWorkouts } from "../hooks/useWorkouts";
import { ThemeText } from "../components/styled/TextStyled";

/*
const PressableItem = ({ item }: { item: Workout }) => {
  return (
    <Pressable onPress={() => alert(`Pressed "${item.name}"`)}>
      <WorkoutItem item={item} />
    </Pressable>
  );
};
*/

export function HomeScreen({
  navigation,
}: NativeStackHeaderProps): JSX.Element {
  const workouts = useWorkouts();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Workouts</Text>
      {/* <ThemeText style={styles.header}>Workouts</ThemeText> */}
      {/* <MontserratText style={styles.header}>Workouts</MontserratText> */}
      <FlatList
        data={workouts}
        // renderItem={WorkoutItem}
        // renderItem={({ item }) => <WorkoutItem item={item} />}
        // renderItem={({ item }) => { return (<Pressable onPress={() => alert(`Pressed "${item.name}"`)}><WorkoutItem item={item} /></Pressable>);}}
        // renderItem={PressableItem}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() =>
                navigation.navigate("WorkoutDetail", {
                  slug: item.slug,
                })
              }
            >
              <WorkoutItem item={item} />
            </Pressable>
          );
        }}
        keyExtractor={(item) => item.slug}
      />
      {/* <Button title={`Go to ${ScreenName.Planner}`} onPress={() => navigation.navigate(ScreenName.Planner)} /> */}
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
    // fontFamily: "montserrat-bold",
  },
});
