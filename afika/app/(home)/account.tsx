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
    useCallback(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
  
      return () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
      };
    },[])
  )

  return (
    <ScrollView>
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
