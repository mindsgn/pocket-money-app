import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

export const Button: React.FC<{ 
  label: string; 
  onPress: () => void; 
  width?: number
  testID?: string;
  progress?: boolean;
  backgroundColor?: string;
  color?: string;
}> = ({
  label,
  onPress,
  width = 150,
  testID,
  progress = false,
}) => (
  <Pressable testID={testID} style={[styles.button, {
    width,
  }]} onPress={onPress}>
    {
      progress?
      <ActivityIndicator />
      :
      <Text 
        style={[
          styles.buttonText
        ]}>
          {label}
      </Text>
    }
  </Pressable>
);


const styles = StyleSheet.create({
  button: {
    marginTop: 8,
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: 'center',
    alignSelf: "center"
  },
  buttonText: {
    fontWeight: '700',
  },
});

  
