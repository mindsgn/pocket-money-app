import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";
import { Button } from '@/components/shared/button';
import { useRouter } from "expo-router";


export default function MarketDetailsScreen() {
  const router = useRouter();
  const { symbol } = useLocalSearchParams<{
    symbol: string;
  }>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>
            {symbol?.charAt(0)?.toUpperCase()}
          </Text>
        </View>

        <Text style={styles.symbol}>
          {symbol}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Current Price</Text>
        <Text style={styles.price}>$0.00</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>24h Change</Text>
        <Text style={styles.value}>0.00%</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Market Cap</Text>
        <Text style={styles.value}>$0</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Volume</Text>
        <Text style={styles.value}>$0</Text>
      </View>
      <Button
          label="SWAP"
          backgroundColor='none'
          color="#1f1f1f"
          onPress={() => {
            router.push("/swap")
          }}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginVertical: 30,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#1D4878",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "800",
  },
  symbol: {
    marginTop: 15,
    fontSize: 28,
    fontWeight: "800",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: "#777",
  },
  price: {
    marginTop: 8,
    fontSize: 32,
    fontWeight: "800",
  },
  value: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: "700",
  },
});
