import { FirebaseApp } from 'firebase/app';
import { create } from 'zustand'
import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions';
import { CloudStorage } from 'react-native-cloud-storage';
import { formatCompactNumber } from '../hook';

interface Toast{
  show: boolean,
  messsage: string | null,
  title: string | null,
}

interface Error {
  error: false,
  title: string | null,
  message: string | null,
}

interface Wallet{
  totalBalance: string,
  error: Error,
  balance: any[], 
  address: string,
  privateKey: string,
  encrypted: boolean,
  mnemonic: string,
  lastUpdatedAt: string,
}

interface useWallet{
  balance: any[], 
  error: {
    error: false,
    title: "",
    message: "",
  }
  loading: boolean,
  transactions: any[], 
  wallet: Wallet | null,
  toast: Toast,
  init: (firebase: FirebaseApp) => void,
  updateWallet: (wallet: Wallet) => void,
  getWalletBalance: (firebase: FirebaseApp) => void,
}

const useWallet = create((set, get) => ({
  balance: [],
  loading: false,
  transactions: [],
  wallet: {
    totalBalance: "0.00",
    balance: [], 
    address: "",
    privateKey: "",
    encrypted: false,
    mnemonic: "",
    lastUpdatedAt: new Date(),
  },
  toast: {
    show: false,
    messsage: null,
    title: null
  },
  init: (firebase: FirebaseApp) => {
    const functions = getFunctions(firebase);
    // connectFunctionsEmulator(functions, "localhost", 5001);
    const createNewWallet = httpsCallable(functions, 'newWallet');

    createNewWallet({
      network: "testnet",
      type: "ethereum",
      encrypted: false,
      password: null
    })
    .then(async (result) => {
      const { data } = result;

      await CloudStorage.writeFile('/ethereum.json', JSON.stringify(data));
      
      const { address, encrypted, mnemonic, privateKey } = data as Wallet;
      set({
        wallet: {
          address,
          privateKey,
          encrypted,
          mnemonic
        },
        loading: true
      })
    })
    .catch(error => {
      console.log(error)
      set({
        toast: {
          show: true,
          messsage: "Error",
          title: "failed to create wallet. Please try again later"
        }
      })
      setTimeout(() => {
        set({
          toast: {
            show: false,
            messsage: null,
            title: null
          }
        });
      }, 2500);
    });
  },
  updateWallet: (wallet: Wallet) => {
    set({
      wallet
    })
  },
  getWalletBalance: (firebase: FirebaseApp) => {
    const functions = getFunctions(firebase);
    connectFunctionsEmulator(functions, "localhost", 5001);
    const getBalance = httpsCallable(functions, 'getBalance');

    //@ts-expect-error  
    const wallet = get().wallet;
    const { wallet: walletData } = wallet
    const { privateKey, encrypted, network, address } = walletData;
    
    getBalance({
      address: "0x019D0706D65c4768ec8081eD7CE41F59Eef9b86c",
      privateKey,
      encrypted,
      network,
      type: "ethereum"
    })
    .then((response) => {
      const { data } = response;
      //@ts-expect-error
      const { totalBalance, tokens, transactions  } = data;
      const { lastUpdatedAt } = tokens[0];
      const wallet = get().wallet;
      
      set({
        wallet: {
          ...wallet,
          totalBalance,
          lastUpdatedAt
        },
        transactions,
        loading: true
      })
      
    })
    .catch((error) => {
      console.log(error)
    });
  },
  sendMoney: () => {
  },
}));

export { useWallet }