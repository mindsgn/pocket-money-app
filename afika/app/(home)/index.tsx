import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
import { usePrivy, useEmbeddedEthereumWallet } from '@privy-io/expo';
import {useEffect, useState} from "react"
import WalletCard from '@/components/wallet-card';
import Action from '@/components/action';
import Transactions from '@/components/transactions';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import * as Haptics from "expo-haptics";
import { useKernelClient } from "@/hooks/use-Kernal";
import { createPublicClient, http } from "viem";
import { base } from "viem/chains";
import { useWallet } from "@/store/wallet"

const publicClient = createPublicClient({
  chain: base,
  transport: http(),
});

type chainTypes = "ethereum"

export default function Home() {
  const [isReady, setIsReady] = useState(false)
  const { setWallet } = useWallet();
  const { user } = usePrivy();
  const { wallets, create } = useEmbeddedEthereumWallet();
  const wallet = wallets?.[0];
  const { kernelAddress, kernelClient, loading } = useKernelClient(
    wallet
  );

  const createEmbeddedWallet = (chainType: chainTypes) => {
    switch (chainType) {
      case "ethereum":
        return create();
      }
  };

  useEffect(() => {
    if(user && wallets.length === 0){
      createEmbeddedWallet("ethereum")
    }
  },[wallets])

  useFocusEffect(
    useCallback(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    
      return () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
      };
    },[])
  )

  useEffect(() => {
    let mounted = true;
  
    const checkDeployed = async () => {
      if (!kernelAddress) {
        return;
      }
  
      try {
        const code = await publicClient.getCode({
          address: kernelAddress,
        });
  
        if (mounted) {
          
          console.log(code !== "0x")

          setWallet({
            smartContractDeployed: code !== "0x",
            address: wallet.address,
            smartAdress: kernelAddress
          })
          setIsReady(true)
        }
      } catch (error) {
        console.warn("Failed to check smart account deployment:", error);
        if (mounted) {
        }
      }
    };
  
    checkDeployed();
  
    return () => {
      mounted = false;
    };
  }, [kernelAddress]);
  
  if(!isReady){
    return(
      <View style={{
        flex:1,
        alignItems: "center",
        justifyContent: "center"
      }}>
        <ActivityIndicator/>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <WalletCard />
      <Action />
      <Transactions />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
});
