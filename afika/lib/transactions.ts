import firestore from "@react-native-firebase/firestore";

export type TransactionKind = "send" | "swap";
export type TransactionState = "pending" | "submitted" | "confirmed" | "failed";

export type AppTransactionRecord = {
  kind: TransactionKind;
  state: TransactionState;
  source: "app";
  walletAddress: string;
  network: string;
  direction: "credit" | "debit";
  tokenSymbol: string;
  tokenAddress: string;
  amount: string;
  usdAmount?: string;
  zarAmount?: string;
  fromAddress: string;
  toAddress: string;
  description?: string;
  txHash?: string;
  userOperationHash?: string;
  timestampMs: number;
  timestamp: number;
  fetchedAtMs: number;
  fetchedAt: number;
  buyTokenSymbol?: string;
  buyTokenAddress?: string;
  buyAmountExpected?: string;
  errorMessage?: string;
};

function walletTransactions(walletAddress: string) {
  return firestore()
    .collection("wallets")
    .doc(walletAddress.toLowerCase())
    .collection("transactions");
}

export function buildPendingTransactionId(kind: TransactionKind) {
  return `pending_${kind}_${Date.now()}`;
}

export function buildConfirmedTransactionId(txHash: string, direction: "credit" | "debit") {
  return `${txHash.toLowerCase()}_${direction}`;
}

export async function createPendingTransaction(
  walletAddress: string,
  docId: string,
  payload: AppTransactionRecord
) {
  await walletTransactions(walletAddress).doc(docId).set(payload, { merge: true });
  return docId;
}

export async function updateTransaction(
  walletAddress: string,
  docId: string,
  payload: Partial<AppTransactionRecord>
) {
  await walletTransactions(walletAddress).doc(docId).set(payload, { merge: true });
}

export async function finalizeTransaction(
  walletAddress: string,
  currentDocId: string,
  txHash: string,
  direction: "credit" | "debit",
  payload: Partial<AppTransactionRecord>
) {
  const finalDocId = buildConfirmedTransactionId(txHash, direction);
  const collection = walletTransactions(walletAddress);
  const currentRef = collection.doc(currentDocId);
  const snapshot = await currentRef.get();
  const currentData = snapshot.exists() ? snapshot.data() : {};

  await collection.doc(finalDocId).set(
    {
      ...currentData,
      ...payload,
      txHash: txHash.toLowerCase(),
    },
    { merge: true }
  );

  if (currentDocId !== finalDocId) {
    await currentRef.delete();
  }

  return finalDocId;
}
