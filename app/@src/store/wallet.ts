import { FirebaseApp } from 'firebase/app';
import { create } from 'zustand'
import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions';
import { CloudStorage } from 'react-native-cloud-storage';

interface ToastInterface{
  show: boolean,
  messsage: string | null,
  title: string | null,
}

interface TransactionInterface{
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

interface WalletInterface{
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
  wallet: WalletInterface | null,
  toast: ToastInterface,
  init: (firebase: FirebaseApp) => void,
  updateWallet: (wallet: WalletInterface, address: string) => void,
  getWalletBalance: (firebase: FirebaseApp, address: string) => void,
  triggerTransaction: () => void,
  triggerWallet: () => void,
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
    show: false,
    totalBalance: "0.00",
    balance: [],
    address: null,
    privateKey: "",
    encrypted: false,
    mnemonic: "",
    lastUpdatedAt: `${new Date()}`,
    error: null,
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
  updateWallet: (wallet: WalletInterface) => {
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
    
    getBalance({
      address,
      type: "ethereum"
    })
    .then((response) => {
      const { data } = response;
      //@ts-expect-error
      const { totalBalance, tokens, transactions, today, week, month } = data;
      

      // console.log(data)
      const { lastUpdatedAt } = tokens[0];
      const wallet = get().wallet;

      set({
        wallet: {
          ...wallet,
          address,
          totalBalance,
          lastUpdatedAt,
          today, 
          week, 
          month
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