import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import Navigation from "./navigation";
import useCachedResources from "./hooks/useCachedResources";

export default function App() {
  const isLoaded = useCachedResources();
  const colorScheme = useColorScheme();

  if (isLoaded) {
    // console.log(colorScheme);
    return (
      <SafeAreaProvider>
        {/* if want to make light/dark theme app
        <Navigation colorScheme={colorScheme} />
        <StatusBar style="auto" /> */}
        {/* make it a fixed light theme */}
        <Navigation colorScheme={"light"} />
        <StatusBar style="dark" />
      </SafeAreaProvider>
    );
  } else {
    return null;
  }
}

// EAS Build is a hosted service for building app binaries with native code
