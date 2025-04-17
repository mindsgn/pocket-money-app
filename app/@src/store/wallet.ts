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
  updateWallet: (wallet: Wallet, address: string) => void,
  getWalletBalance: (firebase: FirebaseApp) => void,
}

const useWallet = create((set, get) => ({
  balance: [],
  loading: false,
  transactions: [],
  wallet: {
    totalBalance: "0.00",
    balance: [], 
    address: null,
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
  getWalletBalance: (firebase: FirebaseApp, address: string) => {
    set({loading: true});
    if(!firebase) set({loading: false});
    const functions = getFunctions(firebase);
    // connectFunctionsEmulator(functions, "localhost", 5001);
    const getBalance = httpsCallable(functions, 'getBalance');

    //@ts-expect-error  
    const wallet = get().wallet;
    const { wallet: walletData } = wallet
    // const { network = "tes"} = walletData;
    
    getBalance({
      address,
      type: "ethereum"
    })
    .then((response) => {
      const { data } = response;
      //@ts-expect-error
      const { totalBalance, tokens, transactions  } = data;
      // console.log(data)
      const { lastUpdatedAt } = tokens[0];
     
      //@ts-expect-error
      const wallet = get().wallet;

      set({
        wallet: {
          ...wallet,
          address,
          totalBalance, 
          lastUpdatedAt
        },
        transactions,
      });
      
    })
    .catch((error) => {
      console.log(error)
    }).finally(()=> {
      set({loading: false});
    });
  },
  sendMoney: () => {
  },
}));

export { useWallet }