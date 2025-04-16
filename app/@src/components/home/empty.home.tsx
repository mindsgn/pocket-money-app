import React from "react";
import { COLOR } from "@/@src/constants/color";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { TEXT } from "@/@src/constants/text";
import { WIDTH } from "@/@src/constants/dimension";

export default function Empty() {
  return(
    <View style={style.container}>
      <Text style={style.title}>{"No Transactions Yet"}</Text>
      <Text style={style.body}>{`Looks like you haven’t made any transactions. Once you do, they’ll show up here.
Start by making a payment or receiving funds to see your activity.`
      }</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: WIDTH - 20,
    backgroundColor: COLOR.dark.cardBackgroundColor,
    padding: 10,
    borderRadius: 10,
  },
  title: {
    color: COLOR.dark.balanceColor,
    marginBottom: 20,
    ...TEXT.emptyTitle
  }, 
  body: {
    color: COLOR.dark.balanceColor,
    ...TEXT.emptyBody
  }
})
