import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';
import * as Keychain from 'react-native-keychain';
import { key } from './../constants';
import aesjs from 'aes-js';
import { useWallet } from './walletContext';
import { NativeModules } from 'react-native';
import { Alert } from 'react-native';

interface AuthContext {
  auth: boolean;
  ready: boolean;
  isNew: boolean;
  authHasError: boolean;
  unlock: (passcode: string) => void;
  setAuthenticationPasscode: (username: string, password: string) => void;
}

const AuthContext = createContext<AuthContext>({
  auth: false,
  ready: false,
  isNew: false,
  authHasError: false,
  unlock: (passcode: string) => false,
  setAuthenticationPasscode: (username: string, password: string) => {},
});

function useAuth(): any {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

const AuthProvider = (props: { children: ReactNode }): ReactElement => {
  const { WalletModule } = NativeModules;
  // const { createNewBitcoinWallet } = useWallet();
  const [auth, setAuth] = useState(false);
  const [ready, setReady] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [authHasError, setHasError] = useState(false);

  const getAuth = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        setReady(true);
      } else {
        setIsNew(true);
        setReady(true);
      }
    } catch (error) {
      setHasError(true);
    }
  };

  const unlock = async (passcode: string) => {
    try {
      const credentials: any = await Keychain.getGenericPassword();
      const { password } = credentials;

      const textBytes = aesjs.utils.utf8.toBytes(passcode);
      const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
      const encryptedBytes = aesCtr.encrypt(textBytes);
      const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

      if (encryptedHex === password) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const setAuthenticationPasscode = async (
    username: string,
    password: string
  ) => {
    try {
      const textBytes = aesjs.utils.utf8.toBytes(password);
      const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
      const encryptedBytes = aesCtr.encrypt(textBytes);
      const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

      await Keychain.setGenericPassword(username, encryptedHex);
      setAuth(true);
    } catch (error) {
      setHasError(true);
    }
  };

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <AuthContext.Provider
      {...props}
      value={{
        auth,
        ready,
        isNew,
        authHasError,
        unlock,
        setAuthenticationPasscode,
      }}
    />
  );
};

export { AuthProvider, useAuth };
