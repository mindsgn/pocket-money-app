import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { usePrivy } from "@privy-io/expo";
import { useRouter } from "expo-router";
import {useEffect} from "react";


export default function Send() {
  return (
    <View style={styles.container}>
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
