import React from "react";
import { COLOR } from "@/@src/constants/color";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { TEXT } from "@/@src/constants/text";
import { WIDTH } from "@/@src/constants/dimension";

interface TransactionCard{
  fiatValue: number
  formatedFiatValue: string,
  transactionType: string
  timeStamp: string
}

export default function TransactionCard({ formatedFiatValue, transactionType, timeStamp, fiatValue } : TransactionCard) {
  const date = new Date(parseInt(timeStamp) * 1000)

  return(
    <View style={[style.container]}>
      <Text style={[style.balance, transactionType === "deposit" ? style.deposit:  style.withdraw]}>{`$${formatedFiatValue}`}</Text>
      <Text style={[style.timestamp]}>{`${date.getDate()}-${date.getUTCMonth()+ 1}-${date.getFullYear()}`}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    marginTop: 10,
    width: WIDTH - 20,
    backgroundColor: COLOR.dark.cardBackgroundColor,
    padding: 20,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  balance: {
    color: COLOR.dark.balanceColor,
    ...TEXT.balance,
    fontSize: 12,
  },
  timestamp: {
    color: COLOR.dark.balanceColor,
    ...TEXT.balance,
    fontSize: 12,
  },
  deposit: {
    color: "green",
  },
  withdraw: {
    color: "red",
  },
  title: {
    color: COLOR.dark.backgroundColor,
    ...TEXT.title
  }
})
