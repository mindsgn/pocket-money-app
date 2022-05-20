import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { transform } from '@babel/core';
import React from 'react';
import { Text, View, Animated } from 'react-native';
import { container } from '../style/container';
import { text } from '../style/text';
import Button from '../components/button';

const Load = ({ navigation } : { navigation?: any }) => {
    const connector = useWalletConnect();
    
    //animations
    const progress = React.useRef(new Animated.Value(0)).current;
    const scale = React.useRef(new Animated.Value(0)).current;
    
    //functions
    const exit = () => {
        Animated.timing(scale, { toValue: 0, useNativeDriver: true}).start();
    }

    const isConnected = async () => {
      const result = await connector.connected;
      console.log(result)
      if(result){
        navigation.navigate("Home")
      }else{
        navigation.navigate("Onboarding")
      }
    }

    React.useEffect(() => {
        isConnected();
        Animated.timing(progress, { toValue: 1, useNativeDriver: true}).start();
        Animated.timing(scale, { toValue: 0.5, useNativeDriver: true}).start();
    },[]);

    return (
    <View
        style={container.default}>
        <View>
          <Animated.Text
            style={
                [
                    text.logo, 
                        {
                            opacity: progress, 
                            transform:[{scale}]
                        }
                ]
            }>
              ORBYT
          </Animated.Text>
        </View>
    </View>
  );
};

export default Load;
