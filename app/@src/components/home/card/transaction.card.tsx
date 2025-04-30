import React from "react";
import { COLOR } from "@/@src/constants/color";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { TEXT } from "@/@src/constants/text";
import { WIDTH } from "@/@src/constants/dimension";
import { useWallet } from "@/@src/store/wallet";

interface TransactionCard{
  fiatValue: number
  formatedFiatValue: string,
  transactionType: string
  timeStamp: string
  blockNumber?: string,
  hash?: string,
  nonce?: string
  blockHash?: string,
  transactionIndex?: string,
  to?: string, 
  gas?: string, 
  gasPrice?: string,
  transactionFee: number
}

export default function TransactionCard({ 
  formatedFiatValue, 
  transactionType, 
  timeStamp, 
  fiatValue, 
  blockNumber,
  hash,
  nonce,
  blockHash,
  transactionIndex,
  to,
  gas,
  gasPrice,
  transactionFee
} : TransactionCard) {
  const { triggerTransaction } = useWallet();
  const date = new Date(parseInt(timeStamp) * 1000)

  return(
    <TouchableOpacity
      style={[style.container]}
      onPress={() => {
        triggerTransaction({
          formatedFiatValue,
          transactionType,
          timeStamp,
          fiatValue,
          blockNumber,
          hash,
          nonce,
          blockHash,
          transactionIndex,
          to,
          gas,
          gasPrice,
          transactionFee
        })
      }}>
      <Text style={[style.balance, transactionType === "deposit" ? style.deposit:  style.withdraw]}>{`R${formatedFiatValue}`}</Text>
      <Text style={[style.timestamp]}>{`${date.getDate()}-${date.getUTCMonth()+ 1}-${date.getFullYear()}`}</Text>
    </TouchableOpacity>
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
