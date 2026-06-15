import Constants from "expo-constants";
import { Stack } from "expo-router";
import { PrivyProvider } from "@privy-io/expo";
import { PrivyElements } from "@privy-io/expo/ui";
import { AnalyticsTracker } from "@/components/analytics";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { db, DATABASE_NAME } from "@/db/client";
import { SQLiteProvider } from "expo-sqlite";
import { Suspense, useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";

export default function RootLayout() {
  const [dataMigrationComplete, setDataMigrationComplete] = useState(false);
  const { success: migrationsReady, error: migrationError } = useMigrations(
    db,
    migrations,
  );

  useEffect(() => {
    if (migrationsReady) {
    }
  }, [migrationsReady]);

  if (!migrationsReady) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Suspense
      fallback={
        <View style={{ flex: 1 }}>
          <ActivityIndicator />
        </View>
      }
    >
      <PrivyProvider
        appId={Constants.expoConfig?.extra?.privyAppId}
        clientId={Constants.expoConfig?.extra?.privyClientId}
      >
        <SQLiteProvider
          databaseName={DATABASE_NAME}
          options={{ enableChangeListener: true }}
          useSuspense
        >
          <AnalyticsTracker />
          <GestureHandlerRootView>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="sign-in" options={{ headerShown: false }} />
              <Stack.Screen name="(home)" options={{ headerShown: false }} />
              <Stack.Screen
                name="send/index"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="send/amount"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="send/address"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="recieve" options={{ headerShown: false }} />
              <Stack.Screen
                name="market/[symbol]/index"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="transaction-details/index"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="swap" options={{ headerShown: false }} />
              <Stack.Screen
                name="transaction/process"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="transaction/complete"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="transaction/error"
                options={{ headerShown: false }}
              />
            </Stack>
          </GestureHandlerRootView>
        </SQLiteProvider>
        <PrivyElements />
      </PrivyProvider>
    </Suspense>
  );
}
