import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { colors } from "@/src/theme/colors";
import { useWalletDetails } from "@/src/hooks/useWalletDetails";

export default function WalletInputScreen() {
  const [walletAddress, setWalletAddress] = useState("");

  const handleSubmit = () => {
    if (!walletAddress.trim()) {
      Alert.alert("Error", "Please enter a wallet address");
      return;
    }

    // Basic Solana address validation (checks if it's 44 characters long)
    if (!/^(0x)?[0-9a-fA-F]{40}$/.test(walletAddress)) {
      Alert.alert(
        "Error",
        "Please enter a valid Ethereum/Polygon wallet address",
      );
      return;
    }

    router.push({
      pathname: "/details",
      params: { address: walletAddress },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Polygon Wallet Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter wallet address"
        placeholderTextColor={colors.text.secondary}
        value={walletAddress}
        onChangeText={setWalletAddress}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>View Wallet</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    color: colors.text.primary,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: colors.background.card,
    borderRadius: 8,
    padding: 15,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.text.accent,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: colors.background.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
});
