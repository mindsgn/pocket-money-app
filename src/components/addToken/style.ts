import { StyleSheet } from 'react-native';
import { colors, fontSize } from '../../constants'

export const style = StyleSheet.create({
  default: {
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 80,
    backgroundColor: colors.green,
    position: "absolute",
    zIndex: 1,
    bottom: 20,
    right: 20,
    borderRadius: 50,
 },
 buttonText: {
    color: colors.white,
    fontFamily: 'SF-Pro-Rounded-Heavy',
    fontSize: fontSize.medium,
 }
});
