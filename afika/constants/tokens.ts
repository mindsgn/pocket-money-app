export type TokenMetadata = {
  symbol: string;
  name: string;
  address: `0x${string}` | "";
  decimals: number;
  isNative?: boolean;
  swapSupported?: boolean;
};

export const NATIVE_TOKEN_PLACEHOLDER =
  "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

export const BASE_TOKEN_METADATA: Record<string, TokenMetadata> = {
  ETH: {
    symbol: "ETH",
    name: "Ethereum",
    address: "",
    decimals: 18,
    isNative: true,
    swapSupported: true,
  },
  USDC: {
    symbol: "USDC",
    name: "USD Coin",
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    decimals: 6,
    swapSupported: true,
  },
  DAI: {
    symbol: "DAI",
    name: "Dai Stablecoin",
    address: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
    decimals: 18,
    swapSupported: true,
  },
  ZARP: {
    symbol: "ZARP",
    name: "ZARP Stablecoin",
    address: "0xb755506531786C8aC63B756BaB1ac387bACB0C04",
    decimals: 18,
    swapSupported: false,
  },
};

export const SEND_TOKEN = BASE_TOKEN_METADATA.USDC;
