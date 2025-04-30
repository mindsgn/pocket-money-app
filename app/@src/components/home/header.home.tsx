import React from "react";
import { COLOR } from "@/@src/constants/color";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { TEXT } from "@/@src/constants/text";
import { WIDTH } from "@/@src/constants/dimension";

export default function Header() {
  return(
    <View style={style.container}>
      <Text style={style.title}>{"Transactions"}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: WIDTH - 20,
  },
  title: {
    color: COLOR.dark.balanceColor,
    ...TEXT.transactionHead
  }
})
