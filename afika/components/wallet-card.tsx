import { Dimensions, StyleSheet, View, Text } from "react-native";
import { Title } from "@/components/shared/title";
import { useEmbeddedEthereumWallet } from "@privy-io/expo";
import {
  UpsertData,
  getTransaction,
  getWallet,
  upsertWallet,
} from "@/lib/firebase";
import { useEffect, useState } from "react";
import {
  QuerySnapshot,
  serverTimestamp,
} from "@react-native-firebase/firestore";
import { useWallet } from "@/store/wallet";
import firestore from "@react-native-firebase/firestore";

const DEFAULT_NETWORK: string = "base-mainnet";

export default function WalletCard() {
  const { address, smartAdress } = useWallet();
  const [balance, setBalance] = useState<number>(0);
  const { wallets } = useEmbeddedEthereumWallet();
  console.log(smartAdress);

  const onResult = (data: QuerySnapshot) => {
    data?.forEach((wallet) => {
      if (wallet.data().tokenSymbol === "USDC") {
        setBalance(parseFloat(wallet.data().usdAmount));
      }
    });
  };

  const onError = (error: any) => {
    console.log(error);
  };

  const upsertAndListen = async () => {
    if (address === null) {
      return;
    }

    try {
      const data: UpsertData = {
        address: smartAdress
          ? smartAdress.toLowerCase()
          : address.toLowerCase(),
        network: DEFAULT_NETWORK,
        createdAt: serverTimestamp(),
        PhoneNumber: null,
        IsVerified: false,
        UserLevel: 0,
        PhoneLinkedAt: null,
      };
      await upsertWallet(
        smartAdress ? smartAdress.toLowerCase() : address.toLowerCase(),
        data,
      );

      //const walletData = await getWallet(smartAdress?  smartAdress.toLowerCase() : address.toLowerCase())

      //walletData?.forEach((wallet)=>{
      //  if(wallet.data().tokenSymbol === "USDC"){
      //    setBalance(parseFloat(wallet.data().usdAmount))
      //  }
      // })
    } catch (error) {
    } finally {
      //@ts-expect-error unkown error
      firestore()
        .collection("wallets")
        .doc(smartAdress ? smartAdress.toLowerCase() : address.toLowerCase())
        .collection("balances")
        .onSnapshot(onResult, onError);
    }
  };

  useEffect(() => {
    if (wallets.length >= 1) {
      upsertAndListen();
    }
  }, [wallets]);

  return (
    <View style={styles.container}>
      <Title>{"Your Balance"}</Title>
      <Text style={{ fontSize: 80, fontWeight: "bold" }}>
        ${balance.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    width: Dimensions.get("screen").width - 40,
    backgroundColor: "#fff",
    alignSelf: "center",
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
  },
});
