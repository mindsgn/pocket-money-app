import { useWalletConnect } from '@walletconnect/react-native-dapp';
import React from 'react';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import { container } from '../style/container';
import { text } from '../style/text';
import { button } from '../style/button';
import Button from '../components/button';

const Onboarding = ({ navigation } : { navigation: any }) => {
  const connector = useWalletConnect();
  //animations
  const progress = React.useRef(new Animated.Value(0)).current;
  const scale = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    isConnected();
    Animated.timing(progress, { toValue: 1, useNativeDriver: true}).start();
    Animated.timing(scale, { toValue: 0.5, useNativeDriver: true}).start();
  },[]);

  const isConnected = async () => {
    const result = await connector.connected;
    console.log(result)
    if(result){
      navigation.navigate("Home")
    }else{
      navigation.navigate("Onboarding")
    }
  }

  const connect = () => {
    try{
      connector.connect(
      ).then((succeess) => {
        console.log(succeess);
      }).catch((error) => {
        console.log(error);
      })
    }catch(error){
      console.error("Error adding a Wallet with WalletConnect",error);
    }
  }

  return (
    <View
      style={container.onboarding}>
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
        <View
          style={{
            width:'180%',
            flex:1,
          }}>
          <Animated.Text
            style={
                [
                    text.default,
                        {
                            opacity: progress, 
                            transform:[{scale}]
                        }
                ]
            }>
            Welcome to orbyt. Are you are looking to get started with decentralized finance? you have come to the right place.
          </Animated.Text>
        </View>
        <View>
          <Button
            onPress={() => connect()}
            text={'Connect Wallet'}
          />
        </View>
    </View>
  );
};

export default Onboarding;
