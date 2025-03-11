import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { colors } from "@/src/theme/colors";
import { useWalletDetails } from "@/src/hooks/useWalletDetails";
import { useWalletTransactions } from "@/src/hooks/useWalletTransactions";
import { TransactionCard } from "@/src/components/specific/TransactionCard";
import { FlatList } from "react-native";

export default function WalletDetailsScreen() {
  const { address } = useLocalSearchParams();
  const { walletInfo, loading, error } = useWalletDetails(address as string);
  const { walletTransaction } = useWalletTransactions(address as string);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.text.accent} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.value}>$ {walletInfo?.balance.toFixed(4)}</Text>
      </View>


      <View style={styles.transactionContainer}>
        <FlatList
          data={walletTransaction }
          renderItem={({ item }) => (
            <TransactionCard 
              transaction={item} 
              walletAddress={address as string}
            />
          )}
          keyExtractor={(item) => item.hash}
        />
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    marginTop: 50,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background.primary,
  },
  card: {
    margin: 16,
    padding: 16,
    backgroundColor: colors.background.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  transactionContainer:{
    margin: 16,
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: colors.text.primary,
    marginBottom: 16,
  },
  address: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    color: colors.text.secondary,
    fontSize: 16,
  },
  value: {
    color: colors.text.primary,
    fontSize: 75,
    fontWeight: "bold",
  },
  tokenCard: {
    backgroundColor: colors.background.secondary,
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  tokenName: {
    color: colors.text.primary,
    fontSize: 16,
    marginBottom: 4,
  },
  tokenBalance: {
    color: colors.text.secondary,
    fontSize: 14,
  },
  error: {
    color: colors.error,
    fontSize: 16,
  },
});
