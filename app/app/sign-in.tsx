import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useCreateGuestAccount } from "@privy-io/expo";
import { Button } from '@/components/button';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function App() {
  const router = useRouter();
  const [progress, setProgress] = useState(false)
  const { create } = useCreateGuestAccount();

  async function createWallet (){
    setProgress(true)

    try{
      // const user = await create();
      // router.replace("/(home)")
    } catch(error){
      console.log(error)
    } finally {
      setProgress(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={{flex:1}} />
      <Button
        width={Dimensions.get("screen").width - 30}
        label="LOGIN"
        progress={progress}
        onPress={() =>
          createWallet()
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#FFF"
  },
});
