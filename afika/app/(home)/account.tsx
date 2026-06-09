import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { usePrivy } from '@privy-io/expo';
import { Button } from '@/components/shared/button';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import * as Haptics from "expo-haptics"

export default function Settings() {
  const [progress, setProgress] = useState<boolean>(false);
  const { user, logout } = usePrivy();
  const router = useRouter();

  async function logoutWallet(){
    setProgress(true)
    try {
      await logout()
      await router.replace("/sign-in")
    } catch (error){}
    finally {
      setProgress(false)
    }
  }

  useFocusEffect(
<<<<<<< HEAD
    useCallback(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
  
      return () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
      };
    },[])
  )
=======
      useCallback(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
  
        return () => {
         Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
        };
      },[])
    )
>>>>>>> 10b80d3a07165788680cbc466cee93c0e4abe4fd

  return (
    <ScrollView>
      <View style={{width: 150, height: 150, backgroundColor: "#000", alignSelf: "center", borderRadius: "50%" }} />
      <Button
        onPress={logoutWallet}
        label='SIGN OUT'
        width={Dimensions.get("screen").width -20}
        progress={progress}
        backgroundColor='red'
      />
    </ScrollView>
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
