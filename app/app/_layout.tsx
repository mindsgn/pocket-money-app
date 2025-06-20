import "react-native-get-random-values";
import React from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useWallet } from "@/@src/store/wallet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider, useCreateStore, useCreatePersister } from "tinybase/ui-react";
import { createStore } from "tinybase/store";
import { createExpoSqlitePersister } from "tinybase/persisters/persister-expo-sqlite";
import * as SQLite from 'expo-sqlite';
import { useBackup } from "@/@src/store/backup";

SplashScreen.preventAutoHideAsync();

const useAndStartPersister = (store: any) =>
    useCreatePersister(
    store,
    (store) => createExpoSqlitePersister(store, SQLite.openDatabaseSync('todos.db')),
    [],
    (persister) => persister.load().then(persister.startAutoSave)
);


export default function RootLayout() {
  const { init } = useBackup();
  const { updateWallet } = useWallet();
  const store = useCreateStore(createStore);
  useAndStartPersister(store);
  
  const initiatlizeWallet = async() => {
    const response =  await init() as Wallet
    await updateWallet(response);
  }

  const [loaded] = useFonts({
    regular: require("../@src/assets/fonts/regular.ttf"),
    bold: require("../@src/assets/fonts/bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      initiatlizeWallet();
    }
  }, [loaded]);
  
  return (
    <Provider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </GestureHandlerRootView>
    </Provider>
  );
}
