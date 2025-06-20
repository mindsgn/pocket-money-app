import { create } from 'zustand'

interface ToastInterface {
  show: boolean,
  messsage: string | null,
  title: string | null,
}

interface TransactionInterface {
  fiatValue: number
  formatedFiatValue: string,
  transactionType: string
  timeStamp: string
  blockNumber?: string,
  hash?: string,
  nonce?: string
  blockHash?: string,
  transactionIndex?: string,
  to?: string, 
  gas?: string, 
  gasPrice?: string, 
  txreceipt_status?: string
}

interface ErrorInterface {
  error: false,
  title: string | null,
  message: string | null,
}

interface WalletInterface {
  show?: boolean,
  totalBalance?: string,
  error?: Error | null,
  balance?: any[], 
  address?: string | null,
  privateKey?: string,
  encrypted?: boolean,
  mnemonic?: string,
  lastUpdatedAt?: string,
  today?: number,
  week?: number,
  month?: number,
}

interface Details {
  show: boolean,
  fiatValue?: number
  formatedFiatValue?: string,
  transactionType?: string
  timeStamp?: string
  blockNumber?: string,
  hash?: string,
  nonce?: string
  blockHash?: string,
  transactionIndex?: string,
  to?: string, 
  gas?: string, 
  gasPrice?: string, 
  transactionFee?: number
}

interface UseWalletInterface{
  balance: any[], 
  error: ErrorInterface | null,
  details: Details,
  loading: boolean,
  transactions: any[], 
  wallet: Wallet,
  toast: ToastInterface,
  init: (firebase: FirebaseApp) => void,
  updateWallet: (wallet: Wallet) => void,
  getWalletBalance: (firebase: FirebaseApp, address: string) => void,
  triggerTransaction: () => void,
  triggerWallet: () => void,
}

export interface Wallet {
  address: string | null,
  totalBalance?: number,
  currencyCode?: string, 
  currencySymbol?: string, 
  languageTag?: string
}

const useWallet = create<UseWalletInterface>((set, get) => ({
  balance: [],
  loading: false,
  transactions: [],
  error: null,
  details: {
    show: false
  },
  wallet: {
    address: null,
    totalBalance: 0,
  },
  toast: {
    show: false,
    messsage: null,
    title: null
  },
  init: () => {
  },
  updateWallet: (wallet: Wallet) => {
    const { address,  currencyCode,  currencySymbol, languageTag } = wallet
    const { wallet: oldWallet } = get();
    
    set({
      wallet : {
        ...oldWallet,
        address,
        currencyCode,  
        currencySymbol, 
        languageTag
      }
    })
  },
  getWalletBalance: (address: string) => {
    set({loading: true});
  },
  sendMoney: () => {
  },
  triggerTransaction: (data?: TransactionInterface) => {
    const { show } = get().details;
    set({
      details: {
        show: !show,
        ...data
      }
    });
  },
  triggerWallet: () => {
    const { wallet } = get();
    const { show } = wallet;

    set({
      wallet: {
        ...wallet,
        show: !show,
      }
    });
  }
}));

export { useWallet }