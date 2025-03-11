import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TokenPair } from "@/src/types/api.types";
import { colors } from "@/src/theme/colors";

interface TokenCardProps {
  token: TokenPair;
}

export const TokenCard = ({ token }: TokenCardProps) => (
  <View style={styles.card}>
    <Text style={styles.pairTitle}>
      {token.baseToken.symbol}/{token.quoteToken.symbol}
    </Text>
    <Text style={styles.text}>
      Price: ${parseFloat(token.priceUsd).toFixed(6)}
    </Text>
    <Text style={styles.text}>
      24h Volume: ${token.volume.h24.toLocaleString()}
    </Text>
    <Text style={styles.text}>
      Liquidity: ${token.liquidity.usd.toLocaleString()}
    </Text>
    <Text style={styles.text}>DEX: {token.dexId}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.45,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pairTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: colors.text.primary,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
    color: colors.text.secondary,
  },
});
