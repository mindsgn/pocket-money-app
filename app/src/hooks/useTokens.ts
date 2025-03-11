import { useState, useEffect, useCallback } from "react";
import { TokenPair } from "@/src/types/api.types";
import { fetchTokenPairs } from "@/src/api/services/tokenService";

export const useTokens = () => {
  const [tokens, setTokens] = useState<TokenPair[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTokens = async () => {
    try {
      const data = await fetchTokenPairs();
      setTokens(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch token data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTokens();
  }, []);

  return { tokens, loading, error, refreshing, fetchTokens, onRefresh };
};
