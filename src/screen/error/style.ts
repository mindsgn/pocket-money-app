import { StyleSheet, Dimensions } from 'react-native';

const height = Dimensions.get("screen").height
const width = Dimensions.get("screen").width

export const style = StyleSheet.create({
  default: {
    padding: 10,
    display: 'flex',
    width: "100%",
    height: "100%",
    alignItems: 'center',
    backgroundColor: 'black',
    justifyContent: "space-evenly"
  },
  message:{
    fontFamily: 'SF-Pro-Rounded-Heavy', 
    fontSize: 42, 
    color: 'white',
    textAlign: 'center'
  },
  button:{
    minWidth: 300,
    backgroundColor: "green"
  },
  buttonText:{
    minWidth: 300,
    textAlign: 'center'
  }
});
