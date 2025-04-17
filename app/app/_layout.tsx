import React from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useFirebase } from "@/@src/store/firebase";
import "react-native-reanimated";
import { useWallet } from "@/@src/store/wallet";
import { CloudStorage } from 'react-native-cloud-storage';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  //@ts-expect-error
  const { init: initWallet, updateWallet, getWalletBalance } = useWallet();
  const { init, firebase } = useFirebase();

  const [loaded] = useFonts({
    regular: require("../@src/assets/fonts/regular.ttf"),
    bold: require("../@src/assets/fonts/bold.ttf"),
  });

  const getBackupOrInit = async() => {
    try{
      const value = await CloudStorage.readFile('/ethereum.json');
      const data = JSON.parse(value);
      updateWallet({wallet: data});
      getWalletBalance(firebase);
    } catch(error) {
      await initWallet(firebase);
      console.log(error)
    }
  };

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
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
