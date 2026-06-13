import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/shared/button";
import { shortenAddress } from "@/lib/wallet";

export default function TransactionCompleteScreen() {
  const { title, message, txHash, amount, token, secondaryAmount, secondaryToken, target } =
    useLocalSearchParams<{
      title?: string;
      message?: string;
      txHash?: string;
      amount?: string;
      token?: string;
      secondaryAmount?: string;
      secondaryToken?: string;
      target?: string;
    }>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>Complete</Text>
        <Text style={styles.title}>{title || "Transaction complete"}</Text>
        <Text style={styles.message}>{message || "Your transaction was submitted successfully."}</Text>

        {(amount || secondaryAmount || target) && (
          <View style={styles.summary}>
            {amount ? <SummaryRow label="Sent" value={`${amount} ${token || ""}`.trim()} /> : null}
            {secondaryAmount ? (
              <SummaryRow
                label="Received"
                value={`${secondaryAmount} ${secondaryToken || ""}`.trim()}
              />
            ) : null}
            {target ? <SummaryRow label="Recipient" value={shortenAddress(target)} /> : null}
          </View>
        )}

        {txHash ? <Text style={styles.hash}>Tx: {shortenAddress(txHash, 10, 8)}</Text> : null}

        <Button label="Back Home" onPress={() => router.replace("/")} width={220} />
      </View>
    </SafeAreaView>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
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
    color: "#15803D",
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
  summary: {
    backgroundColor: "#F7FAFC",
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  rowLabel: {
    fontSize: 14,
    color: "#777777",
  },
  rowValue: {
    flex: 1,
    textAlign: "right",
    fontSize: 14,
    fontWeight: "700",
    color: "#111111",
  },
  hash: {
    fontSize: 13,
    color: "#475569",
  },
});
