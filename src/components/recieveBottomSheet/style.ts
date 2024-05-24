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
    height: 300,
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
    color: "black",
    fontFamily: text.heavy,
    fontSize: fontSize.small
  },
  title:{
    color: "black",
    fontFamily: text.heavy,
    fontSize: fontSize.small,
    textAlign: "center"
  },
  buttonText:{
    color: "white",
    fontFamily: text.heavy,
    fontSize: fontSize.extraSmall
  },
  qrCodeContainer: {
    flex:1,
    alignItems: "center",
    justifyContent: "center"
  }
});
