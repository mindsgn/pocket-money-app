import { colors, fontSize, text } from '../../constants';
import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  default: {
    flex: 1,
    display: 'flex',
    backgroundColor: 'black',
  },
  tokenDetails:{
    padding: 10,
    width: "100%",
    display:"flex",
    flexDirection: 'row',
    alignContent: "center",
    justifyContent: "flex-start"
  },
  tokenImage:{
    width: 40,
    height: 40,
    margin: 10,
  },
  tokenName: {
    color: "white",
    marginTop: -10,
    fontSize: fontSize.small,
    fontFamily: text.Bold
  },
  tokenPrice: {
    color: "white",
    marginTop: -30,
    fontSize: fontSize.medium,
    fontFamily: text.heavy
  },
  tokenButtons:{
    display: "flex",
    flexDirection: "column"
  },
  row:{
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between"
  },
  tokenButton:{
    backgroundColor: "green",
    alignItems: "center",
    margin: 10,
    borderRadius: 5,
    minWidth: 150,
  },
  buttonText: {
    color: "white",
    fontSize: fontSize.small,
    fontFamily: text.heavy
  },
});