import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

export default function TransactionProcessScreen() {
  const { title, message } = useLocalSearchParams<{
    title?: string;
    message?: string;
  }>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <ActivityIndicator size="large" color="#1D4878" />
        <Text style={styles.title}>{title || "Processing transaction"}</Text>
        <Text style={styles.message}>
          {message || "Please keep this screen open while we submit your transaction."}
        </Text>
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
    alignItems: "center",
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111111",
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666666",
    textAlign: "center",
  },
});
