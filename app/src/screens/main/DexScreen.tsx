import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { TokenCard } from "@/src/components/specific/TokenCard";
import { useTokens } from "@/src/hooks/useTokens";
import { colors } from "@/src/theme/colors";
import { StatusBar } from "expo-status-bar";

export default function DexScreen() {
  const { tokens, loading, error, refreshing, fetchTokens, onRefresh } =
    useTokens();

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
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
    <View style={styles.container}>
      <StatusBar style="light" />
      <FlatList
        data={tokens}
        renderItem={({ item }) => <TokenCard token={item} />}
        keyExtractor={(item) => item.pairAddress}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    paddingTop: 50,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background.primary,
  },
  list: {
    padding: 16,
  },
  error: {
    color: colors.error,
    fontSize: 16,
  },
});
