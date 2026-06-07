import { StyleSheet, View, Text } from 'react-native';
import { usePrivy, useEmbeddedEthereumWallet } from '@privy-io/expo';
import {} from ""

export default function Home() {
  const { user } = usePrivy();
  const { wallets } = useEmbeddedEthereumWallet();
  const [smartAddress, setSmartAddress] = useState<string | null>(null);
  
  return (
    <View style={styles.container}>
      <Text>User: {user?.id}</Text>
      <Text>EOA: {wallets[0]?.address}</Text>
      <Text>Smart Wallet: {smartAddress ?? "Not created yet"}</Text>


      <Button
        title={loading ? "Creating..." : "Create Smart Contract Wallet"}
        onPress={handleCreateSmartWallet}
        disabled={loading}
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
