import { Dimensions, StyleSheet, View, Text } from 'react-native';
import {  } from "@privy-io/expo"

export default function WalletCard() {
    return (
        <View style={styles.container}>
           
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    width: Dimensions.get("screen").width - 40,
    backgroundColor: "#000",
    alignSelf: "center",
    borderRadius: 10,
  },
});
