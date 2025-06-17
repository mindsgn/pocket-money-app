import React from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useFirebase } from "@/@src/store/firebase";
import "react-native-reanimated";
import { useWallet } from "@/@src/store/wallet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { init: initWallet, updateWallet, getWalletBalance } = useWallet();
  const { init, firebase } = useFirebase();

  const [loaded] = useFonts({
    regular: require("../@src/assets/fonts/regular.ttf"),
    bold: require("../@src/assets/fonts/bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      init();
    }
  }, [loaded]);

  useEffect(() => {
    if(firebase){
      // getBackupOrInit(); 
    }
  }, [firebase]);
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
