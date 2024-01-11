import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { HomeTabs } from './src/components';
import { AuthProvider, WalletProvider } from './src/context/index';
import { Loading, Token, SignIn, Send, Recieve, Error } from './src/screens';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider style={styles.screen}>
      <AuthProvider>
        <WalletProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Loading" component={Loading} />
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="HomeTabs" component={HomeTabs} />
              <Stack.Screen name="Send" component={Send} />
              <Stack.Screen name="Recieve" component={Recieve} />
              <Stack.Screen name="Token" component={Token} />
              <Stack.Screen name="Error" component={Error} />
            </Stack.Navigator>
          </NavigationContainer>
        </WalletProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default App;
