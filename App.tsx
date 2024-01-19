import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Loading, Passcode, Home } from './src/screen';
import { RealmProvider, WalletProvider, AuthProvider } from './src/context';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <RealmProvider>
      <WalletProvider>
        <AuthProvider>
          <SafeAreaView style={styles.screen}>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="Loading" component={Loading} />
                <Stack.Screen name="Passcode" component={Passcode} />
                <Stack.Screen name="Home" component={Home} />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </AuthProvider>
      </WalletProvider>
    </RealmProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default App;
