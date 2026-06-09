import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { usePrivy,  } from "@privy-io/expo";
import { useRouter } from "expo-router";
import {useEffect} from "react";
import { useFocusEffect } from 'expo-router';
import * as Haptics from "expo-haptics"
import { useCallback } from 'react';
<<<<<<< HEAD
import QRCodeStyled from 'react-native-qrcode-styled';
import { Title } from '@/components/shared/title';
import { Button } from '@/components/shared/button';
import { useState } from 'react';
import { shortenAddress } from '@/hooks/shorten-address';
import { useEmbeddedEthereumWallet } from '@privy-io/expo';

export default function Receive() {
  const {wallets} = useEmbeddedEthereumWallet();
  const {user} = usePrivy()
  const [sharing, setSharing] = useState(false);

  const share = async() => {
    setSharing(true);
    try {
    } catch {
    } finally{
      setSharing(false)
    }
  } 


  useFocusEffect(
    useCallback(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
  
      return () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
      };
=======

export default function Receive() {
   useFocusEffect(
      useCallback(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
  
        return () => {
         Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
        };
>>>>>>> 10b80d3a07165788680cbc466cee93c0e4abe4fd
    },[])
  );
  
  return (
    <View style={styles.container}>
      <QRCodeStyled
        data={'Styling Pieces'}
        padding={25}
        pieceBorderRadius={'50%'}
        color={'#1F1F1F'}
      />
      <Title>{shortenAddress(wallets[0].address)}</Title>
      <Button 
        progress={sharing}
        label={"SHARE"} 
        onPress={share}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
