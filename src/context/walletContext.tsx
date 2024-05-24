import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';
import { APP_API, APP_NETWORK, APP_SOCKET_SERVER } from '@env';
import { useRealm } from './realmContext';
import {BSON} from 'realm';
import {socket} from "../util"

interface WalletContext { 
}

const WalletContext = createContext<any>({
  totalBalance: 0,
  setTotalBalance: () => {}, 
  deleteWallet: () => {}, 
  exchangeRate: 1,
  walletList: [],
  settings: {},
  createNewBitcoinWallet: () => {},
  walletHasError: false,
  walletHasSuccess: false,
  toast: {type: "", message: ""},
  socket: null,
  connected: false,
});

const useWallet: any = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within an WalletProvider');
  }
  return context;
}

const WalletProvider = (props: { children: ReactNode }): ReactElement => {
  const realm = useRealm();
  const [exchangeRate] = useState(1);
  const [settings, setSettings] = useState<any>(null);
  const [totalBalance, setTotalBalance] = useState(0);
  const [toast, setToast] = useState({
    type: "",
    message: ""
  });
  const [walletHasError, setWalletHasError] = useState(false);
  const [walletHasSuccess, setWalletHasSuccess] = useState(false);
  const [walletList, setWalletList] = useState<any []>([]);
  const [connected, setConnected] = useState(false);
  const [walletSettings, setWalletSettings] = useState<any>(null);

  const saveWallet = async (data: any) => {
    try {
      realm.write(() => {
        realm.create('Wallet', {
          _id: new BSON.ObjectId(),
          createdAt: new Date(),
          ...data
        });
      });
      // setToast({type: "Success", message: `new bitcoin created`})
      // setWalletHasSuccess(true);
      // setTimeout(()=> {
      //   setWalletHasSuccess(false)
      // }, 2000);
    } catch (error) {
      // setToast({type: "Error", message: "Failed to create wallet. please try again"})
      // setWalletHasError(true);
      // setTimeout(()=> {
      //  setWalletHasError(false)
      // }, 2000);
    }
  };

  const deleteWallet = async (address: string) => {
    try{
      realm.write(() => {
        const walletsToDelete = realm.objects('Wallet').filtered(`address = "${address}"`);
        realm.delete(walletsToDelete);
      });
    }catch(error){
    }
  }

  const createNewBitcoinWallet = async (network: string) => {
    try{
      const {_id} = walletSettings[0]
      socket.emit("create-bitcoin", { 
        socketID: socket.id,
        network,
        type: "bitcoin",
        walletID: _id,
      });

      socket.once("bitcoin-created", (data, error) => {
        if(!error){
          saveWallet(data);
        }
      });

      // return true
    }catch(error: any){
      // return false
    }
  };

  const initialiseWallet = async() => {
    try {
      realm.write(() => {
        realm.create('Settings', {
          _id: new BSON.ObjectId(),
          currency: "zar",
          currencySymbol: "R",
          network: "testnet",
          createdAt: new Date(),
        });
      });
      
    } catch (error) {
    }
  }

  const getSettings = () => {
    const settingsObject: any = realm.objects('Settings')
    
    if(settingsObject.length === 0){
      realm.write(() => {
        realm.create('Settings', {
          _id: new BSON.ObjectId(),
          currency: "ZAR",
          currencySymbol: "R",
          createdAt: new Date(),
        });
      });

      getSettings();
    }else{
      setSettings(settingsObject[0])
    }
  }

  const getWallet = () => {
    const walletObject: any = realm.objects('Wallet');
    let wallets: any = []
    let sum = 0

    walletObject.map(async(wallet: any, index: number) => {
      let balance = {
        zar: 0,
        btc: 0
      }

      socket.emit('get-wallet-data', {
        address: wallet.address,
        socketID: socket.id
      });

      socket.once('wallet-data', async(data: any) => {
        const { ZAR, BTC } = data;

        if(ZAR.length > 0){
          let balanceHistory:any = []
          sum += ZAR[ZAR.length - 1].balance

          balance = {
            zar: ZAR[ZAR.length - 1].balance,
            btc: BTC[BTC.length - 1].balance
          }

          ZAR.map((item: any)=> {
            balanceHistory.push(item.balance)
          })
  
          setTotalBalance(sum)
  
          wallet = {
            ...wallet,
            balance,
            balanceHistory,
            ZAR,
            BTC
          }
  
          wallets.push(wallet);
          setWalletList([...walletList, ...wallets] );
        }

        setWalletList(wallets);
      });
    });
  }

  useEffect(()=>{
    const settingsObject: any = realm.objects('Settings');
  
    setWalletSettings(settingsObject);

    if(settingsObject.length == 0){
      initialiseWallet()
    }

    const listener = () => {
    };

    settingsObject?.addListener(listener);

    return () => {
      settingsObject?.removeListener(listener);
    };
  },[realm]);

  useEffect(()=> {
    if(!settings){
      getSettings()
    } 
  },[])

  useEffect(() => { 
    if(walletSettings){
      getWallet();
      socket.on("connect", () => {
        setConnected(true);
        const { currency, _id, } = walletSettings[0];
        
        socket.emit("update-user", { 
          _id,
          socketID: socket.id,
        });
      });
    }
    
    return () => {
    };
  }, [walletSettings, connected]);

  /*
  useEffect(()=>{
    socket.on("connect", () => {
      // socket.emit("get-exchange-rate")
    });
    
    socket.on("connect_error", (error) => {
      // Alert.alert(error.message)
    });

    socket.on("exchange-rate", (data) => {
      console.log(data)
    });

    if(socket){
      socket.emit("get-exchange-rate", {
        id: "gone",
        currency: "ZAR"
      });

      socket.emit("get-exchange-", {
        id: "gone",
        currency: "ZAR"
      });
    }
  },[socket])
  */

  return (
    <WalletContext.Provider
      {...props}
      value={{
        totalBalance, 
        setTotalBalance,
        exchangeRate,
        createNewBitcoinWallet,
        deleteWallet,
        walletHasError,
        walletHasSuccess,
        walletList,
        settings,
        toast,
        connected,
        socket
      }}
    />
  );
};

export { WalletProvider, useWallet };
