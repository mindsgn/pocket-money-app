import { StyleSheet } from 'react-native';
import { colors, fontSize } from '../../constants'

export const style = StyleSheet.create({
  default: {
    flex: 1,
    backgroundColor: colors.black,
    width: '100%',
    borderWidth: 4,
  },
  title: {
    fontFamily: 'SF-Pro-Rounded-Heavy',
    fontSize: fontSize.small,
    color: colors.white,
    marginTop: 40,
  },
  transactionCardList: {
    flex: 1,
  },
  token: {
    flex: 1,
    width: '100%',
    height: 60,
    color: colors.white,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    marginVertical: 5,
  },
  tokenDetails:{
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  tokenDetailsImage:{
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 50,
    margin: 5,
  },
  tokenTitle: {
    color: 'white',
    fontFamily: 'SF-Pro-Rounded-Heavy',
    fontSize: fontSize.small,
  },
  tokenBalanceFiat: {
    color: 'white',
    fontFamily: 'SF-Pro-Rounded-Heavy',
    fontSize: fontSize.small,
  },
  tokenBalanceCrypto: {
    color: 'gray',
    fontFamily: 'SF-Pro-Rounded-Heavy',
    fontSize: fontSize.extraSmall,
    marginTop: -10,
  },
});
