import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { style } from './style';
import { useWallet } from '../../context';
import { numberFormatter } from '../../hooks';

const TokenContainer = ({ navigation }: { navigation: any }) => {
  const { walletList } = useWallet();

  return (
    <View style={style.default}>
      <Text style={style.title}>My Crypto</Text>
      <View>
        <FlatList
          data={walletList}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
                <TouchableOpacity
                  style={style.token}
                  onPress={() => {
                    navigation.navigate('Token', {
                      ...item
                    });
                  }}
                >
                  <View style={style.tokenDetails}>
                    <Image
                      style={style.tokenDetailsImage}
                      source={require('../../assets/bitcoin.png')}
                    />
                    <View>
                      <Text style={style.tokenTitle}>{item.type.toUpperCase()}</Text>
                    </View>
                  </View>

                  <View>
                    <Text style={style.tokenBalanceFiat}>{`R ${numberFormatter(item.balance.zar, 1)}`}</Text>
                    <Text style={style.tokenBalanceCrypto}>{`${item.balance.btc} BTC`}</Text>
                  </View>
                </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export { TokenContainer };
