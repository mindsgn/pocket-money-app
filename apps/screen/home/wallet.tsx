import React from 'react';
import { View, Text, } from 'react-native';
import { container } from '../../style/container';
import Card from '../../components/card';

const Wallet = ({ navigation } : { navigation: any }) => {
    return (
      <View
          style={container.home}> 
          <Card />
          <View
            style={{
              padding: 20
            }}>
            <Text
              style={{
                fontSize: 25,
                color: 'white'
              }}>
                TOKENS
            </Text>
          </View>
          <View>
            
          </View>
      </View>
  );
};

export default Wallet;
