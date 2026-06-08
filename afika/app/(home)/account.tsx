import { StyleSheet, View } from 'react-native';
import { usePrivy } from '@privy-io/expo';
import { Button } from '@/components/shared/button';
import { useRouter } from 'expo-router';

export default function Settings() {
  const { user, logout } = usePrivy();
  const router = useRouter();

  async function logoutWallet(){
    try {
      await logout()
      await router.replace("/")
    } catch (error){}
    finally {
    }
  }

  return (
    <View style={styles.container}>
      <View style={{flex:1}}/>
      <Button
        onPress={logoutWallet}
        label='SIGN OUT'
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
