import { StyleSheet, Dimensions } from 'react-native';

const height = Dimensions.get("screen").height
const width = Dimensions.get("screen").width

export const style = StyleSheet.create({
  default: {
    padding: 10,
    display: 'flex',
    width: "100%",
    height: "100%",
    backgroundColor: 'black',
    paddingBottom: 100,
  },
});
