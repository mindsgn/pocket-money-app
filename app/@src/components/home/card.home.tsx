import React, { useEffect, useState } from "react";
import { COLOR } from "@/@src/constants/color";
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { TEXT } from "@/@src/constants/text";
import { WIDTH } from "@/@src/constants/dimension";
import { useUser } from "@/@src/store/user";
import { useWallet } from "@/@src/store/wallet";
import { formatCompactNumber } from "@/@src/hook";

export default function Card() {
  //@ts-expect-error
  const { wallet, loading } = useWallet();
  const { totalBalance } = wallet;

  if(!loading){
    return(
      <View style={[style.container, style.placeHolder]}>
        <ActivityIndicator />
      </View>
    );
  }
  
  return(
    <View style={style.container}>
      <Text style={style.balance}>{"$"}{totalBalance}</Text>
      <Text style={style.title}>{"balance"}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    height: 200,
    marginTop: 80,
    width: WIDTH - 20,
    backgroundColor: COLOR.dark.cardBackgroundColor,
    padding: 20,
    borderRadius: 20,
  },
  placeHolder: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  balance: {
    color: COLOR.dark.balanceColor,
    ...TEXT.balance,
    fontSize: 45
  },
  title: {
    color: COLOR.dark.balanceColor,
    ...TEXT.title
  }
})
