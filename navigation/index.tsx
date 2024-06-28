import { ColorSchemeName } from "react-native";
import {
  DefaultTheme,
  DarkTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome5 } from "@expo/vector-icons"; // expo icons: https://icons.expo.fyi/Index
import { HomeScreen } from "../screens/Home";
import { WorkoutDetailScreen } from "../screens/Detail";
import { PlannerScreen } from "../screens/Planner";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      theme={colorScheme === "light" ? DefaultTheme : DarkTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();
function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Root">
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WorkoutDetail"
        component={WorkoutDetailScreen as React.ComponentType<any>}
        options={{ title: "Workout Info" }}
      />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();
function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="Home">
      <BottomTab.Screen
        name="Home"
        component={HomeScreen as React.ComponentType<any>}
        // options={{ unmountOnBlur: true }} // Unmount the screen when it is not visible
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Planner"
        component={PlannerScreen as React.ComponentType<any>}
        options={{
          unmountOnBlur: true, // Unmount the screen when it is not visible
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="buffer" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
