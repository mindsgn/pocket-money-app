import React, { useEffect } from "react";
import { COLOR } from "@/@src/constants/color";
import { View, StyleSheet, Text  } from "react-native";
import { HEIGHT } from "@/@src/constants/dimension";
import { useWallet } from "@/@src/store/wallet";

export default function Error() {
  const { error } = useWallet();
  const {title, message} = error

  return(
    <View style={style.container}>
      <Text>{title}</Text>
      <Text>{message}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    height: HEIGHT,
    backgroundColor: COLOR.dark.backgroundColor,
    alignItems: "center",
  }
})
