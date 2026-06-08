import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { usePrivy } from '@privy-io/expo';
import { Button } from '@/components/shared/button';
import { useRouter } from 'expo-router';
import { useState } from 'react';

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
