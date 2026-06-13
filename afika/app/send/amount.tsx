import { useMemo, useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { encodeFunctionData, erc20Abi } from "viem";
import { useEmbeddedEthereumWallet } from "@privy-io/expo";
import { SEND_TOKEN } from "@/constants/tokens";
import { useWalletBalances } from "@/hooks/use-wallet-balances";
import { useKernelClient } from "@/hooks/use-Kernal";
import { parseTokenAmount, sanitizeDecimalInput } from "@/lib/amount";
import {
  buildPendingTransactionId,
  createPendingTransaction,
  finalizeTransaction,
  updateTransaction,
} from "@/lib/transactions";
import { shortenAddress, getActiveWalletAddress } from "@/lib/wallet";
import { useWallet } from "@/store/wallet";
import { KeyboardAvoidingView } from 'react-native';

export default function SendAmountScreen() {
  const { address } = useLocalSearchParams<{ address: string }>();
  const { wallets } = useEmbeddedEthereumWallet();
  const wallet = wallets?.[0];
  const { kernelClient, loading: kernelLoading } = useKernelClient(wallet);
  const walletStore = useWallet();
  const activeWalletAddress = getActiveWalletAddress(walletStore);
  const { balanceMap, loading: balancesLoading } = useWalletBalances(activeWalletAddress);
  const usdcBalance = balanceMap.USDC;

  const [amount, setAmount] = useState("");
  const [sending, setSending] = useState(false);

  const shortAddress = useMemo(() => shortenAddress(address), [address]);
  const availableAmount = usdcBalance?.amount || "0";

  const validateAmount = () => {
    try {
      const parsedAmount = parseTokenAmount(amount, SEND_TOKEN.decimals);
      const parsedBalance = parseTokenAmount(availableAmount, SEND_TOKEN.decimals);

      if (parsedAmount <= 0n) {
        return "Please enter a valid USDC amount.";
      }
      if (parsedAmount > parsedBalance) {
        return "Send amount cannot exceed your available USDC balance.";
      }
      return null;
    } catch (error) {
      return "Please enter a valid USDC amount.";
    }
  };

  const handleSend = async () => {
    const validationError = validateAmount();
    if (validationError) {
      Alert.alert("Invalid amount", validationError);
      return;
    }

    if (!address?.trim() || !activeWalletAddress || !kernelClient) {
      Alert.alert("Wallet not ready", "Your smart wallet is still loading. Please try again.");
      return;
    }

    const normalizedAmount = sanitizeDecimalInput(amount);
    const timestampMs = Date.now();
    const pendingDocId = buildPendingTransactionId("send");

    try {
      setSending(true);

      await createPendingTransaction(activeWalletAddress, pendingDocId, {
        kind: "send",
        state: "pending",
        source: "app",
        walletAddress: activeWalletAddress,
        network: "base-mainnet",
        direction: "debit",
        tokenSymbol: SEND_TOKEN.symbol,
        tokenAddress: SEND_TOKEN.address,
        amount: normalizedAmount,
        usdAmount: normalizedAmount,
        fromAddress: activeWalletAddress,
        toAddress: address.toLowerCase(),
        description: `Sending ${normalizedAmount} USDC`,
        timestampMs,
        timestamp: timestampMs,
        fetchedAtMs: timestampMs,
        fetchedAt: timestampMs,
      });

      router.push({
        pathname: "/transaction/process",
        params: {
          title: "Sending USDC",
          message: `Sending ${normalizedAmount} USDC to ${shortAddress}.`,
        },
      });

      const callData = encodeFunctionData({
        abi: erc20Abi,
        functionName: "transfer",
        args: [address as `0x${string}`, parseTokenAmount(normalizedAmount, SEND_TOKEN.decimals)],
      });

      const userOperationHash = await kernelClient.sendUserOperation({
        calls: [
          {
            to: SEND_TOKEN.address,
            data: callData,
            value: 0n,
          },
        ],
      });

      await updateTransaction(activeWalletAddress, pendingDocId, {
        state: "submitted",
        userOperationHash,
      });

      const receipt = await kernelClient.waitForUserOperationReceipt({
        hash: userOperationHash,
      });

      const txHash = receipt?.receipt?.transactionHash;
      const finalDocId = txHash
        ? await finalizeTransaction(activeWalletAddress, pendingDocId, txHash, "debit", {
            state: "confirmed",
            txHash,
            userOperationHash,
          })
        : pendingDocId;

      if (!txHash) {
        await updateTransaction(activeWalletAddress, finalDocId, {
          state: "confirmed",
          userOperationHash,
        });
      }

      router.replace({
        pathname: "/transaction/complete",
        params: {
          title: "USDC sent",
          message: `You sent ${normalizedAmount} USDC successfully.`,
          amount: normalizedAmount,
          token: "USDC",
          target: address,
          txHash: txHash || userOperationHash,
        },
      });
    } catch (error) {
      console.log(error);
      await updateTransaction(activeWalletAddress, pendingDocId, {
        state: "failed",
        errorMessage: error instanceof Error ? error.message : "Unknown error",
      }).catch(() => null);

      router.replace({
        pathname: "/transaction/error",
        params: {
          title: "Send failed",
          message:
            error instanceof Error
              ? error.message
              : "Something went wrong while sending USDC.",
          retryPath: `/send/amount?address=${address}`,
        },
      });
    } finally {
      setSending(false);
    }
  };

  const amountError = amount ? validateAmount() : null;

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>Send USDC</Text>
      <Text style={styles.subtitle}>Enter the amount you want to send.</Text>

      <View style={styles.recipientCard}>
        <Text style={styles.label}>Sending to</Text>
        <Text style={styles.address}>{shortAddress}</Text>
      </View>

      <View style={styles.amountCard}>
        <Text style={styles.label}>Amount</Text>

        <View style={styles.amountRow}>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            keyboardType="decimal-pad"
            style={styles.input}
          />
          <Text style={styles.token}>USDC</Text>
        </View>

        <Text style={styles.balanceText}>Available: {availableAmount} USDC</Text>
        {amountError ? <Text style={styles.errorText}>{amountError}</Text> : null}
      </View>

      <View style={styles.infoCard}>
        <InfoRow label="Network" value="Base" />
        <InfoRow label="Token" value="USDC" />
        <InfoRow label="Gas" value="Sponsored" />
        <InfoRow label="Recipient" value={shortAddress} />
      </View>

      <TouchableOpacity
        style={[styles.button, (sending || kernelLoading || balancesLoading) && styles.buttonDisabled]}
        onPress={handleSend}
        disabled={sending || kernelLoading || balancesLoading}
      >
        {sending ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Send USDC</Text>}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
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
  recipientCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
  },
  amountCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    color: "#777",
    marginBottom: 10,
  },
  address: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111",
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 42,
    fontWeight: "800",
    color: "#111",
  },
  token: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1D4878",
  },
  balanceText: {
    marginTop: 12,
    fontSize: 14,
    color: "#475569",
  },
  errorText: {
    marginTop: 8,
    fontSize: 14,
    color: "#B91C1C",
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  infoLabel: {
    color: "#777",
    fontSize: 14,
  },
  infoValue: {
    color: "#111",
    fontSize: 14,
    fontWeight: "700",
  },
  button: {
    marginTop: "auto",
    backgroundColor: "#1D4878",
    paddingVertical: 18,
    borderRadius: 24,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },
});
