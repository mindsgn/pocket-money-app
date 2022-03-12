/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Load from './apps/components/load';
import Onboarding from './apps/components/onboarding';
import Import from './apps/components/import';
import Create from './apps/components/create';

const Stack = createNativeStackNavigator();

const App = () => {
  return (  
    <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                headerShown: false
              }}>
            <Stack.Screen name="Home" component={Load} />
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="Import" component={Import} />
            <Stack.Screen name="Create" component={Create} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
