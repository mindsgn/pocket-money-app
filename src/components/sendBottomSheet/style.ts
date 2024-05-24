import { StyleSheet } from 'react-native';
import { colors, fontSize, text } from '../../constants'

export const style = StyleSheet.create({
  default: {
    position: "absolute",
    display: "flex",
    width: '100%',
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 2,
    bottom: -1000,
  },
  bottomSheet:{
    display: "flex",
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    width: "100%",
    height: 600,
    bottom: -200,
    zIndex: 3,
    padding: 5,
    justifyContent: "space-between",
  },
  closeButton:{
    display: "flex",
    padding: 10,
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems:"center",
    borderRadius: 5,
    margin: 2,
  },
  tokenButton:{
    display: "flex",
    padding: 10,
    borderRadius: 5,
    margin: 2,
  },
  tokenText:{
    color: "white",
    fontFamily: text.heavy,
    fontSize: fontSize.small
  },
  title:{
    color: "black",
    fontFamily: text.heavy,
    fontSize: fontSize.small,
    textAlign: "center"
  },
  amount:{
    color: "black",
    fontFamily: text.heavy,
    fontSize: fontSize.medium,
    textAlign: "center"
  },
  buttonText:{
    color: "black",
    fontFamily: text.heavy,
    fontSize: fontSize.medium
  },
  buttonTextSend:{
    color: "white",
    fontFamily: text.Meduim,
    fontSize: fontSize.small
  },
  buttonTextClose:{
    color: "white",
    fontFamily: text.Meduim,
    fontSize: fontSize.small
  },
  qrCodeContainer: {
    flex:1,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeButton: {
    width: 80,
    height: 80,
    margin: 5,
    borderRadius: 100,
    backgroundColor: "white",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeButtonNull: {
    width: 80,
    height: 80,
    margin: 10,
    borderRadius: 100,
    backgroundColor: "black",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeButtonDelete: {
    width: 80,
    height: 80,
    margin: 10,
    borderRadius: 100,
    backgroundColor: "white",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextDelete: {
    fontFamily: text.Bold,
    fontSize: 40,
    color: "black",
  },
});
