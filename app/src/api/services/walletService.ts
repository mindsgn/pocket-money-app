import axios from "axios";
import { API_ENDPOINTS } from "@/src/api/endpoints";
const chains = [137];
// import { WalletInfo } from '@/src/hooks/useWalletDetails';

export const fetchWalletInfo = async (address: string) => {
  try {
    const response = await axios.get(
      `${API_ENDPOINTS.ethereum}chainid=${chains}&module=account&action=balance&address=0xb5d85cbf7cb3ee0d56b3bb207d5fc4b82f43f511&tag=latest&apikey=${process.env.EXPO_PUBLIC_ETHERSCAN_API_KEY}`,
    );

    const balance = parseFloat(response.data.result) / 1000000000000000000;

    return {
      balance: balance,
      tokenCount: 0,
      tokens: [],
    };
  } catch (error) {
    console.error("Error fetching wallet info:");
    return {
      balance: 0,
      tokenCount: 0,
      tokens: [],
    };
  }
};

export const fetchWalletTransactions = async (address: string) => {
  try {
    const response = await axios.get(
      `${API_ENDPOINTS.ethereum}chainid=${chains}&module=account&action=txlist&address=0xb5d85cbf7cb3ee0d56b3bb207d5fc4b82f43f511&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.EXPO_PUBLIC_ETHERSCAN_API_KEY}`,
    );
    const transaction = response.data.result

    return (
        transaction
    )
  } catch (error) {

    console.error("Error fetching wallet info: ", error);

    return {
        transaction: []
    };
  }
};
