import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from './settings';
import Wallet from './wallet';
import Markets from './markets';
import { Marker } from 'react-native-svg';

const Tab = createBottomTabNavigator();

const Main = ({ navigation } : { navigation: any }) => {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Wallet" component={Wallet} />
            <Tab.Screen name="Markets" component={Markets} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
};

export default Main;