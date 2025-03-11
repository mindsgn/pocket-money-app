import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/src/theme/colors";

interface TransactionCardProps {
  transaction: any;
  walletAddress: string;
}

export const TransactionCard = ({ transaction, walletAddress }: TransactionCardProps) => {
  const isIncoming = transaction.to.toLowerCase() === walletAddress.toLowerCase();
  const direction = isIncoming ? "IN" : "OUT";
  const amount = parseFloat(transaction.value) / 1e18;
  const timestamp = new Date(parseInt(transaction.timeStamp) * 1000);
  const status = transaction.txreceipt_status === "1" ? "Success" : "Failed";

  // Shorten address display
  const counterparty = isIncoming 
    ? transaction.from 
    : transaction.to;
  const shortenedAddress = `${counterparty.slice(0, 6)}...${counterparty.slice(-4)}`;

  return (
    <View style={[
      styles.container,
      {
        borderLeftColor: isIncoming ? colors.background.primary : colors.error,
        backgroundColor: isIncoming ? colors.background.secondary : colors.background.secondary
      }
    ]}>
      <View style={styles.row}>
        <Text style={styles.direction}>{direction}</Text>
        <Text style={styles.counterparty}>{shortenedAddress}</Text>
      </View>
      
      <View style={styles.row}>
        <Text style={styles.amount}>{amount.toFixed(4)} MATIC</Text>
        <Text style={styles.date}>{timestamp.toLocaleDateString()}</Text>
      </View>

      <View style={styles.row}>
        <Text style={[
          styles.status,
          { color: status === "Success" ? colors.background.card : colors.error }
        ]}>
          {status}
        </Text>
        <Text style={styles.gas}>Gas: {parseInt(transaction.gasUsed)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.card,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  direction: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  counterparty: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  amount: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text.primary,
  },
  date: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  status: {
    fontSize: 14,
    fontWeight: "500",
  },
  gas: {
    fontSize: 12,
    color: colors.text.secondary,
  },
}); 