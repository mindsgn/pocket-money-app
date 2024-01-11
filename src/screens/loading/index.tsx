import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, NativeModules } from 'react-native';
const { Wallet } = NativeModules;

import { style } from './style';

const Loading = (props: any) => {
  const { navigation, route } = props;

  const isauth = async () => {
    try {
      // const isLoggedIn = await MagicKey.user.isLoggedIn();
      //if (isLoggedIn) {
      // navigation.replace('HomeTabs');
      //} else {
      // navigation.replace('SignIn');
      //}
    } catch (error) {
      //log error
      // navigation.replace('HomeTabs');
    }
  };

  const getMetadata = async () => {
    await Wallet.getMetadata('', async (err: any, metadata: any) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(metadata);
    });
  };

  useEffect(() => {
    getMetadata();
  }, []);

  return (
    <View style={style.default}>
      <View>
        <Text
          style={[
            {
              fontFamily: 'SF-Pro-Rounded-Heavy',
              fontSize: 100,
              color: 'white',
            },
          ]}
        >
          ORBYT
        </Text>
        <ActivityIndicator size={'large'} />
      </View>
    </View>
  );
};

export { Loading };
