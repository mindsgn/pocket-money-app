import React from 'react';
import { TouchableOpacity, Text } from 'react-native'

const Button = (
  {
    text, 
    onPress, 
    color, 
    fontColor,
    flex,
    minHeight,
    disabled
  } 
  : 
  {
    text:string, 
    onPress: any,
    color?: string,
    fontColor?: string,
    flex?: number,
    minHeight?: number,
    disabled?: boolean
  }
) => {
  return (
    <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={{
            backgroundColor: `${color? color : 'white'}`,
            borderRadius: 10,
            padding: 10,
            minHeight: minHeight,
            margin: 10,
            flex: flex,
            maxHeight: '10%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
        }}>
            <Text
                style={{
                    color: `${fontColor? fontColor : 'black'}`,
                    fontWeight:'bold',
                    fontSize: 15
                }}>
                {text}
            </Text>
    </TouchableOpacity>
  );
};

export default Button;
