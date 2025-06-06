import React, { useEffect } from "react";
import { COLOR } from "@/@src/constants/color";
import { View, StyleSheet } from "react-native";
import Card from "@/@src/components/home/card.home"
import Actions from "@/@src/components/home/actions.home";
import Transactions from "@/@src/components/home/transaction.home";
import Terms from "@/@src/components/home/terms.home";
import { HEIGHT } from "@/@src/constants/dimension";
import * as SplashScreen from "expo-splash-screen";
import Toast from "@/@src/components/home/toast.home";
import { useFirebase } from "@/@src/store/firebase";
import { useColorScheme } from "react-native";
import { useWallet } from "@/@src/store/wallet";
import Address from "@/@src/components/home/address.home";
import TransactionDetails from "@/@src/components/home/transactionDetails.home";
import QuickDetails from "@/@src/components/home/quick.home";

export default function Home() {
  const { wallet } = useWallet();
  const { address } = wallet;

  useEffect(() => {
    if(address === "" ){
    }
  },[address]);

  useEffect(() => {
      SplashScreen.hide();
  },[]);

  return(
    <View style={style.container}>
      <Toast />
      <Card />
      <Transactions />
      <Address />
      <TransactionDetails />
      <QuickDetails />
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
