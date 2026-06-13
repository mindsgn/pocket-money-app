import { NATIVE_TOKEN_PLACEHOLDER, type TokenMetadata } from "@/constants/tokens";

const API_BASE_URL = "https://api.0x.org";
const BASE_CHAIN_ID = 8453;

export type ZeroExQuote = {
  allowanceTarget?: string;
  buyAmount: string;
  buyToken: string;
  sellAmount: string;
  sellToken: string;
  liquidityAvailable?: boolean;
  minBuyAmount?: string;
  issues?: {
    allowance?: {
      actual: string;
      spender: string;
    } | null;
    balance?: {
      actual: string;
      expected: string;
      token: string;
    } | null;
    simulationIncomplete?: boolean;
    invalidSourcesPassed?: string[];
  };
  transaction?: {
    to: `0x${string}`;
    data: `0x${string}`;
    value?: string;
  };
};

function getApiKey() {
  const apiKey = process.env.EXPO_PUBLIC_0X_API_KEY;
  if (!apiKey) {
    throw new Error("Missing EXPO_PUBLIC_0X_API_KEY");
  }
  return apiKey;
}

function toZeroExToken(token: TokenMetadata) {
  return token.isNative ? NATIVE_TOKEN_PLACEHOLDER : token.address;
}

export async function fetchSwapQuote(params: {
  sellToken: TokenMetadata;
  buyToken: TokenMetadata;
  sellAmount: string;
  taker: string;
}) {
  const { sellToken, buyToken, sellAmount, taker } = params;
  const endpoint = sellToken.isNative
    ? "/swap/permit2/quote"
    : "/swap/allowance-holder/quote";

  const search = new URLSearchParams({
    chainId: String(BASE_CHAIN_ID),
    sellToken: toZeroExToken(sellToken),
    buyToken: toZeroExToken(buyToken),
    sellAmount,
    taker,
  });

  const response = await fetch(`${API_BASE_URL}${endpoint}?${search.toString()}`, {
    method: "GET",
    headers: {
      "0x-api-key": getApiKey(),
      "0x-version": "v2",
    },
  });

  const data = (await response.json()) as ZeroExQuote & { reason?: string; validationErrors?: any[] };
  if (!response.ok) {
    throw new Error(data.reason || "Failed to fetch swap quote");
  }
  if (!data.transaction?.to || !data.transaction.data) {
    throw new Error("Quote did not include executable transaction data");
  }
  if (data.liquidityAvailable === false) {
    throw new Error("No liquidity available for this token pair right now");
  }

  return data;
}
