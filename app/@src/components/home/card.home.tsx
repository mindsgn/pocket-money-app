import React, { useEffect, useState } from "react";
import { COLOR } from "@/@src/constants/color";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { TEXT } from "@/@src/constants/text";
import { WIDTH } from "@/@src/constants/dimension";
import { useWallet } from "@/@src/store/wallet";

export default function Card() {
  const { wallet, loading, triggerWallet } = useWallet();
  const { totalBalance, lastUpdatedAt } = wallet;
  const date = new Date(parseInt(lastUpdatedAt)) * 1000


  if(loading){
    return(
      <View style={[style.container, style.placeHolder]}>
        <ActivityIndicator />
      </View>
    );
  }
  
  return(
    <TouchableOpacity style={style.container} onPress={() => triggerWallet()}>
      <Text style={style.balance}>{"R"}{totalBalance}</Text>
      <Text style={style.title}>{"balance"}</Text>
    </TouchableOpacity>
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
    marginBottom: 20,
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
  },
  date: {
    display: "flex",
    flex:1,
    alignItems: "flex-end",
    justifyContent: "flex-end"
  }
})
