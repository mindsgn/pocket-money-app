import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';
import { APP_SECRET, APP_NETWORK } from '@env';
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
  authHasSuccess: boolean;
  setAuthenticationPasscode: (username: string, password: string) => void;
}

const AuthContext = createContext<AuthContext>({
  auth: false,
  ready: false,
  isNew: false,
  authHasError: false,
  authHasSuccess: false,
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
  const [auth, setAuth] = useState(false);
  const [ready, setReady] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [authHasError, setAuthHasError] = useState(false);
  const [authHasSuccess, setAuthHasSuccess] = useState(false);

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
      setAuthHasError(true);
      setTimeout(()=> {
        setAuthHasError(false)
      }, 2000);
    }
  };

  const unlock = async (passcode: string) => {
    try {
      const credentials: any = await Keychain.getGenericPassword();
      const { password } = credentials;

      const textBytes = aesjs.utils.utf8.toBytes(`${passcode}-${APP_SECRET}`);
      const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
      const encryptedBytes = aesCtr.encrypt(textBytes);
      const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

      if (encryptedHex === password) {
        return true;
      } else {
        setAuthHasError(true);
        setTimeout(()=> {
          setAuthHasError(false)
        }, 2000);
      }
    } catch (error) {
      setAuthHasError(true);
      setTimeout(()=> {
        setAuthHasError(false)
      }, 2000);
    }
  };

  const setAuthenticationPasscode = async (
    username: string,
    password: string
  ) => {
    try {
      const textBytes = aesjs.utils.utf8.toBytes(`${password}-${APP_SECRET}`);
      const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
      const encryptedBytes = aesCtr.encrypt(textBytes);
      const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
      await Keychain.setGenericPassword(username, encryptedHex);
      setAuth(true);
      return true;      
    } catch (error) {
      setAuthHasError(true);
      setTimeout(()=> {
        setAuthHasError(false)
      }, 2000);
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
        authHasSuccess,
        unlock,
        setAuthenticationPasscode,
      }}
    />
  );
};

export { AuthProvider, useAuth };
