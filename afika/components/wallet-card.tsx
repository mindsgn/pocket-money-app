import { Dimensions, StyleSheet, View } from 'react-native';
import { Title } from '@/components/shared/title';
import { useEmbeddedEthereumWallet } from '@privy-io/expo';
import {UpsertData, getTransaction, getWallet, upsertWallet } from '@/lib/firebase';
import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useWallet } from '@/store/wallet';

const DEFAULT_NETWORK: string = 'base-mainnet'

export default function WalletCard() {
  const {address, smartAdress} = useWallet()
  const [balance, setBalance] = useState<number>(0)
  const { wallets } = useEmbeddedEthereumWallet()

  const upsertAndListen = async() => {
    if(address === null){
      return
    }

    try {
      const data: UpsertData = {
        address:  smartAdress?  smartAdress.toLowerCase() : address.toLowerCase(),
        network: DEFAULT_NETWORK,
        createdAt:  firestore.FieldValue.serverTimestamp(),
        PhoneNumber:  null,
        IsVerified: false,
        UserLevel:  0,
        PhoneLinkedAt:  null,
      }
      await upsertWallet(smartAdress?  smartAdress.toLowerCase() : address.toLowerCase(), data);

      const walletData = await getWallet(smartAdress?  smartAdress.toLowerCase() : address.toLowerCase())

      walletData?.forEach((wallet)=>{
        if(wallet.data().tokenSymbol === "USDC"){
          setBalance(parseFloat(wallet.data().usdAmount))
        }
      })
    } catch(error){
    } finally {
    }
  }
  
  useEffect(()=>{
    if(wallets.length >= 1){
      upsertAndListen()
    }
  },[wallets])

  return (
    <View style={styles.container}>
      <Title>{'Your Balance'}</Title>
      <Title>${balance.toFixed(2)}</Title>
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
