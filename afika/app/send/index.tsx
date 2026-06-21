import { router } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SendScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Send Money</Text>
      <Text style={styles.subtitle}>Send USDC to another wallet on Base.</Text>

      <Pressable
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        onPress={() => router.push("/send/address")}
      >
        <Text style={styles.cardTitle}>Wallet Address</Text>
        <Text style={styles.cardText}>Enter or scan a wallet address</Text>
      </Pressable>

      <Pressable style={styles.disabledCard} disabled>
        <Text style={styles.cardTitle}>Contacts</Text>
        <Text style={styles.cardText}>Coming soon</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F7FA",
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#111",
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 24,
    fontSize: 16,
    color: "#666",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    marginBottom: 14,
  },
  cardPressed: {
    opacity: 0.85,
  },
  disabledCard: {
    backgroundColor: "#FFFFFF",
    opacity: 0.5,
    borderRadius: 24,
    padding: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111",
  },
  cardText: {
    marginTop: 6,
    fontSize: 14,
    color: "#777",
  },
});
