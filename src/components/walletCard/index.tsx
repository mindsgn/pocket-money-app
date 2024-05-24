import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { style } from './style';
import { useWallet } from 'context';
import { numberFormatter } from 'hooks';

const WalletCard = () => {
  const { totalBalance, exchangeRate, settings } = useWallet();
  const {currencySymbol} = settings
  const [formatedBalance, setFormatedBalance] = useState(totalBalance.toFixed(2));

  useEffect(() => {
    setFormatedBalance(numberFormatter(totalBalance * exchangeRate, 1));
  }, [totalBalance]);
  
  return (
    <View style={style.default}>
      <View>
        <Text style={style.text}>{`Total Balance`}</Text>
        <Text style={style.amount}>{`${currencySymbol} ${formatedBalance}`}</Text>
      </View>
    </View>
  );
};

export { WalletCard };
