/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
 import { withWalletConnect } from '@walletconnect/react-native-dapp';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider }  from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Load from './apps/screen/load';
import Onboarding from './apps/screen/onboarding';
import Home from './apps/screen/home';
import { store, persistor } from './apps/redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate 
        loading={null}
        persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
              screenOptions={{
                  headerShown: false
                }}>
              <Stack.Screen name="Load" component={Load} />
              <Stack.Screen name="Onboarding" component={Onboarding} />
              <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};


export default withWalletConnect(App, {
  clientMeta: {
    url: 'https://orbyt.org',
    icons: ['https://ex.junho.io/android-chrome-512x512.png'],
    name: 'orbyt',
    description: 'connect to web3',
  },
  redirectUrl: 'orbyt://Home',
  storageOptions: {
    asyncStorage: AsyncStorage as any,
  },
});




