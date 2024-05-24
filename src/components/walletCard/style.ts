import { StyleSheet } from 'react-native';
import { colors, fontSize } from '../../constants';

export const style = StyleSheet.create({
  default: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: colors.black,
    width: '100%',
    height: 200,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: colors.white,
    padding: 10,
  },
  amount: {
    fontFamily: 'SF-Pro-Rounded-Heavy',
    fontSize: fontSize.medium,
    color: colors.white,
    marginBottom: -80,
    zIndex: 0,
    backgroundColor: "rgba(0,0,0,0)",
  },
  text: {
    fontFamily: 'SF-Pro-Rounded-Heavy',
    fontSize: fontSize.small,
    color: colors.white,
    backgroundColor: "rgba(0,0,0,0)",
    zIndex: 1,
  },
  networkButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: '2%',
    bottom: '4%',
    borderRadius: 100,
    minWidth: 100,
    minHeight: 40,
    backgroundColor: colors.white,
  },
  networkButtonText: {
    fontFamily: 'SF-Pro-Rounded-Regular',
    fontSize: fontSize.small,
    color: colors.black,
    marginLeft: 5,
  },
});
