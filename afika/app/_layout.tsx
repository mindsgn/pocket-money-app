import Constants from "expo-constants";
import { Stack } from "expo-router";
import { PrivyProvider } from "@privy-io/expo";
import { PrivyElements } from "@privy-io/expo/ui";
import { AnalyticsTracker } from "@/components/analytics";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
    return (
        <PrivyProvider
            appId={Constants.expoConfig?.extra?.privyAppId}
            clientId={Constants.expoConfig?.extra?.privyClientId}
        >
             <AnalyticsTracker />
             <GestureHandlerRootView>
                <Stack>
                    <Stack.Screen name="index" options={{ headerShown: false }}/>
                    <Stack.Screen name="sign-in" options={{ headerShown: false }}/>
                    <Stack.Screen name="(home)" options={{ headerShown: false }}/>
                    <Stack.Screen name="send" options={{ headerShown: false }}/>
                    <Stack.Screen name="recieve" options={{ headerShown: false }}/>
                    <Stack.Screen name="market/[symbol]/index" options={{ headerShown: false }}/>
                    <Stack.Screen name="swap" options={{ headerShown: false }}/>
                </Stack>
             </GestureHandlerRootView>
            <PrivyElements />
        </PrivyProvider>
    );
}