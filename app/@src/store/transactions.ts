import { initializeApp } from "firebase/app";
import { create } from 'zustand'

interface Transaction {
}

interface UseTransactions {
  transactions: Transaction [],
}

const useTransactions = create<UseTransactions>((set, get) => ({
  transactions: [],
}));

export { useTransactions }