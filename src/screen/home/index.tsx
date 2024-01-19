import React from 'react';
import { View } from 'react-native';
import { style } from './style';
import {
  WalletCard,
  WalletButtons,
  TransactionContainer,
} from '../../components';

const Home = (props: any) => {
  return (
    <View style={style.default}>
      <WalletCard />
      <WalletButtons />
    </View>
  );
};

export { Home };
