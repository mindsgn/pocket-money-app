import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { useRealm } from './realmContext';

const WalletContext = createContext<any>({
  balance: 0,
  exchangeRate: 1,
  createNewBitcoinWallet: () => {},
});

function useWallet(): any {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within an WalletProvider');
  }
  return context;
}

const WalletProvider = (props: { children: ReactNode }): ReactElement => {
  const realm = useRealm();
  const [exchangeRate] = useState(1);
  const [balance] = useState(0);
  const createNewBitcoinWallet = async () => {};

  return (
    <WalletContext.Provider
      {...props}
      value={{
        balance,
        exchangeRate,
        createNewBitcoinWallet,
      }}
    />
  );
};

export { WalletProvider, useWallet };
