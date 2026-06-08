import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { usePrivy } from "@privy-io/expo";
import { useRouter } from "expo-router";
import {useEffect} from "react";
import { useFocusEffect } from 'expo-router';
import * as Haptics from "expo-haptics"
import { useCallback } from 'react';

export default function Receive() {
   useFocusEffect(
      useCallback(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
  
        return () => {
         Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
        };
    },[])
  );
  
  return (
    <View style={styles.container}>
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
