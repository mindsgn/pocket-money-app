import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { style } from './style';
import { useWallet } from 'context';
import { numberFormatter } from 'hooks';

const WalletCard = () => {
  const { balance, exchangeRate } = useWallet();
  const [formatedBalance, setFormatedBalance] = useState(balance.toFixed(2));

  useEffect(() => {
    setFormatedBalance(numberFormatter(balance * exchangeRate, 1));
  }, [balance]);

  return (
    <TouchableOpacity style={style.default}>
      <TouchableOpacity>
        <Text style={style.amount}>{`R ${formatedBalance}`}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.networkButton} onPress={() => {}}>
        <ActivityIndicator />

        <Text style={style.networkButtonText}>{'BITCOIN'}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export { WalletCard };
