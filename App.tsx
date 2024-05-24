import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Loading, Passcode, Home, Token, Error } from './src/screen';
import { RealmProvider, WalletProvider, AuthProvider } from './src/context';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ErrorToast, SuccessToast } from "./src/components"
const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
    <GestureHandlerRootView style={{flex: 1}}>
    <RealmProvider>
      <WalletProvider>
        <AuthProvider>
          <SafeAreaView style={styles.screen}>
            <ErrorToast  />
            <SuccessToast  />
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="Loading" component={Loading} />
                <Stack.Screen name="Passcode" component={Passcode} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Token" component={Token} />
                <Stack.Screen name="Error" component={Error} />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </AuthProvider>
      </WalletProvider>
    </RealmProvider>
    </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default App;
