import React from 'react';
import { View, Text, ActivityIndicator, LogBox } from 'react-native';
import { APP_NAME } from '@env';
import { style } from './style';
import { useEffect } from 'react';
import { useAuth, useWallet } from 'context';

const Loading = (props: any) => {
  const { navigation } = props;
  const { connected } = useWallet
  const { ready, isNew } = useAuth();

  useEffect(() => {
    if (ready && isNew) {
      navigation.replace('Passcode', {
        passcodeState: 'new',
      });
    } else if (ready && !isNew) {
      navigation.replace('Passcode', {
        passcodeState: 'unlock',
      });
    }
  }, [ready, isNew]);

  return (
    <View style={style.default}>
      <Text style={style.logo}>{APP_NAME}</Text>
      <ActivityIndicator size={'large'} />
    </View>
  );
};

export { Loading };
