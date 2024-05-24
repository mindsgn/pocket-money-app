import React from 'react';
import { View, Text } from 'react-native';
import { style } from './style';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Error = (props: any) => {
  const { route } = props;
  const { params } = route;
  const { message } = params;

  return(
    <View style={style.default}>
      <Text style={style.message}>{'Error'}</Text>
      <Text style={style.message}>{message}</Text>
      <TouchableOpacity style={style.button}>
        <Text style={style.message}>{'Restart'}</Text>
      </TouchableOpacity>
    </View>
  ) 
  ;
};

export { Error };
