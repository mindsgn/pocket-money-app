import { useState, useEffect } from "react";
import { fetchWalletInfo } from "@/src/api/services/walletService";

export interface WalletInfo {
  balance: number;
  tokenCount: number;
  tokens: Array<{
    name: string;
    balance: string;
  }>;
}

export const useWalletDetails = (address: string) => {
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWalletInfo = async () => {
      try {
        const data = await fetchWalletInfo(address);
        setWalletInfo(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch wallet information");
      } finally {
        setLoading(false);
      }
    };

    getWalletInfo();
  }, [address]);

  return { walletInfo, loading, error };
};
