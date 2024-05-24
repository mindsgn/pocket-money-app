import { StyleSheet } from 'react-native';
import { colors, fontSize, text } from '../../../constants'

export const style = StyleSheet.create({
  default: {
    position: 'absolute',
    top: -120,
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: "center",
    zIndex: 100,
    marginTop: 10,
    backgroundColor: "green"
  },
  title:{
    fontFamily: text.heavy,
    fontSize: fontSize.small,
    color: colors.white,
  }
});