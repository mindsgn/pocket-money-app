import { StyleSheet, View, Text } from 'react-native';
import { usePrivy, useEmbeddedEthereumWallet } from '@privy-io/expo';
import {useEffect, useState} from "react"
import { Button } from '@/components/shared/button';
import { createZeroDevSmartAccount } from "@/lib/zero-dev";

type chainTypes = "ethereum"

export default function Home() {
  const { user } = usePrivy();
  const { wallets, create } = useEmbeddedEthereumWallet();
  const [smartAddress, setSmartAddress] = useState<string | null>(null);
  
  const createWallet = (chainType: chainTypes) => {
    switch (chainType) {
      case "ethereum":
        return create({  });
      }
  };

  const createSmartAccount = async() => {
    try {

    const provider = await wallets[0].getProvider();

     const owner = {
        address: wallets[0].address as `0x${string}`,
        
        async signMessage({ message }: any) {
          return provider.request({
            method: "personal_sign",
            params: [
              typeof message === "string" ? message : message.raw,
              wallets[0].address,
            ],
          });
        },

        async signTypedData(typedData: any) {
          return provider.request({
            method: "eth_signTypedData_v4",
            params: [wallets[0].address, JSON.stringify(typedData)],
          });
        },
      };

      const { smartAccountAddress } = await createZeroDevSmartAccount(owner);
      setSmartAddress(smartAccountAddress);

    } catch(error){

    }finally{

    }
  }


  useEffect(() => {
    if(user && wallets.length === 0){
      createWallet("ethereum")
    }
  },[wallets, smartAddress])

  return (
    <View style={styles.container}>
      <Text>User: {user?.id}</Text>
      <Text>EOA: {wallets[0]?.address}</Text>
      <Text>Smart Wallet: {smartAddress ?? "Not created yet"}</Text>

      <Button 
        testID='test-create'
        label="create wallet"
        onPress={() => {
          createSmartAccount()
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
