import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/shared/button";

export default function TransactionErrorScreen() {
  const { title, message, retryPath } = useLocalSearchParams<{
    title?: string;
    message?: string;
    retryPath?: string;
  }>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>Error</Text>
        <Text style={styles.title}>{title || "Transaction failed"}</Text>
        <Text style={styles.message}>
          {message || "Something went wrong while processing your transaction."}
        </Text>
        <Button
          label="Try Again"
          onPress={() => {
            if (retryPath) {
              router.replace(retryPath as any);
              return;
            }
            router.back();
          }}
          width={220}
        />
        <Button label="Back Home" onPress={() => router.replace("/")} width={220} backgroundColor="#EEF4FF" color="#1D4878" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 24,
    gap: 18,
  },
  eyebrow: {
    fontSize: 14,
    fontWeight: "700",
    color: "#B91C1C",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111111",
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666666",
  },
});
