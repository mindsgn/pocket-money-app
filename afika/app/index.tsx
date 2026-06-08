import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { usePrivy } from "@privy-io/expo";
import { useRouter } from "expo-router";
import {useEffect} from "react";


export default function Loading() {
  const router = useRouter();
  const {isReady, user} = usePrivy();

  useEffect(() => {
    if (isReady && !user) {
      router.replace("/sign-in");
    } else if(isReady && user){
      router.replace("/(home)");
    }
  }, [isReady, user]);

  return (
    <View style={styles.container}>
      <ActivityIndicator color={"#000"}/>
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
