import Constants from "expo-constants";
import { Stack } from "expo-router";
import { PrivyProvider } from "@privy-io/expo";
import { PrivyElements } from "@privy-io/expo/ui";

export default function RootLayout() {
    return (
        <PrivyProvider
        appId={Constants.expoConfig?.extra?.privyAppId}
        clientId={Constants.expoConfig?.extra?.privyClientId}
        >
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }}/>
                <Stack.Screen name="sign-in" options={{ headerShown: false }}/>
                <Stack.Screen name="(home)" options={{ headerShown: false }}/>
            </Stack>
            <PrivyElements />
        </PrivyProvider>
    );
}