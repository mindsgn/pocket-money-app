import React from 'react';
import { style } from './style';
import { View, Text, TouchableOpacity } from 'react-native';

const AddToken = ({onPress}:{onPress: any}) => {
  return (
    <TouchableOpacity style={style.default}
    onPress={onPress}>
      <Text style={style.buttonText}>+</Text>
    </TouchableOpacity>
  );
};

export { AddToken };
