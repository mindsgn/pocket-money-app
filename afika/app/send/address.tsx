import { useState } from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function isValidWalletAddress(address: string) {
  return /^0x[a-fA-F0-9]{40}$/.test(address.trim());
}

export default function SendAddressScreen() {
  const [walletAddress, setWalletAddress] = useState("");

  const handleContinue = () => {
    const cleanAddress = walletAddress.trim();

    if (!isValidWalletAddress(cleanAddress)) {
      Alert.alert("Invalid address", "Please enter a valid wallet address.");
      return;
    }

    router.push({
      pathname: "/send/amount",
      params: {
        address: cleanAddress,
      },
    });
  };

  const handleScanAddress = () => {
    // Later connect this to expo-camera / QR scanner screen.
    Alert.alert("Scan wallet", "QR scanner screen coming soon.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Recipient</Text>
      <Text style={styles.subtitle}>Enter the wallet address you want to send USDC to.</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Wallet Address</Text>

        <TextInput
          value={walletAddress}
          onChangeText={setWalletAddress}
          placeholder="0x..."
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />

        <TouchableOpacity style={styles.scanButton} onPress={handleScanAddress}>
          <Text style={styles.scanButtonText}>Scan Wallet Address</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
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
  },
  label: {
    fontSize: 14,
    color: "#777",
    marginBottom: 12,
  },
  input: {
    fontSize: 16,
    color: "#111",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    paddingVertical: 12,
  },
  scanButton: {
    marginTop: 18,
    paddingVertical: 14,
    borderRadius: 18,
    backgroundColor: "#EEF4FF",
    alignItems: "center",
  },
  scanButtonText: {
    color: "#1D4878",
    fontWeight: "800",
  },
  button: {
    marginTop: "auto",
    backgroundColor: "#1D4878",
    paddingVertical: 18,
    borderRadius: 24,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },
});