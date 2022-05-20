import React from 'react';
import { container } from '../style/container';
import { text } from '../style/text';
import { TouchableOpacity, Text } from 'react-native'


const Button = ({text, onPress}: {text:string, onPress: any}) => {
  return (
    <TouchableOpacity
        onPress={onPress}
        style={{
            minWidth: 100,
            backgroundColor:'white',
            borderRadius: 20,
            padding:10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text
                style={{
                    color:'black',
                    fontSize: 28
                }}>
                {text}
            </Text>
    </TouchableOpacity>
  );
};

export default Button;
