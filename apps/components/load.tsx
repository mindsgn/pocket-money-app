import React from 'react';
import { Text, View, } from 'react-native';
import { container } from '../style/container';
import { text } from '../style/text';

const Load = ({ navigation } : { navigation: any }) => {
  React.useEffect(() => {
    navigation.navigate('Onboarding')
  });

  return (
    <View 
        style={container.default}>
        <Text
            style={text.default}>
            ORBYT
        </Text>
    </View>
  );
};

export default Load;
