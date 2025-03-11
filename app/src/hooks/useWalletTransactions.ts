import { useState, useEffect } from "react";
import { fetchWalletTransactions } from "@/src/api/services/walletService";

type HexString = `0x${string}`;

export interface WalletTransaction {
  blockHash: HexString;
  blockNumber: string;
  confirmations: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  from: HexString;
  functionName: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  hash: HexString;
  input: HexString;
  isError: '0' | '1';
  methodId: HexString;
  nonce: string;
  timeStamp: string;
  to: HexString;
  transactionIndex: string;
  txreceipt_status: '0' | '1';
  value: string;
}

export const useWalletTransactions = (address: string) => {
  const [walletTransaction, setWalletTransaction] = useState<WalletTransaction[] | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWalletTransactions = async () => {
      try {
        const data = await fetchWalletTransactions(address);
        setWalletTransaction(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch wallet information");
      } finally {
        setLoading(false);
      }
    };

    getWalletTransactions();
  }, [address]);

  return { walletTransaction, loading, error };
};
