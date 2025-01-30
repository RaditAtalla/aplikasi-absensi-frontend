import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "../lib/context/AuthContext";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Alegreya: require("../assets/fonts/AlegreyaSansSC-Regular.ttf"),
    AlegreyaLight: require("../assets/fonts/AlegreyaSansSC-Light.ttf"),
    AlegreyaMedium: require("../assets/fonts/AlegreyaSansSC-Medium.ttf"),
    AlegreyaBold: require("../assets/fonts/AlegreyaSansSC-Bold.ttf"),
    AlegreyaBlack: require("../assets/fonts/AlegreyaSansSC-Black.ttf"),
    Inter: require("../assets/fonts/Inter-VariableFont_opsz,wght.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="main" />
      </Stack>
    </AuthProvider>
  );
}
