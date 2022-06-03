import React from 'react';
import { Text, View, } from 'react-native';
import { container } from '../style/container';
import { text } from '../style/text';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';

const Load = ({ navigation } : { navigation: any }) => {
  return (
    <View
        style={container.default}>
        <Text
            style={text.logo}>
            ORBYT
        </Text>
    </View>
  );
};

export default Load;
