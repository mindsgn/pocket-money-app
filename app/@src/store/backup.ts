import { create } from 'zustand'
import { CloudStorage, CloudStorageProvider, } from 'react-native-cloud-storage';
import { getLocales, Locale } from 'expo-localization';
import { Platform } from 'react-native';
import { Wallet } from "ethers";

const filePath: string[] = ["/v1/keys.txt"]

interface UseBackup {
  init: () => void
  writeToCloud: () => void,
  readFromCloud: () => void
}

interface Wallet {
  address: String,
  currencyCode: String, 
  currencySymbol: String, 
  decimalSeparator: String, 
  depth: number, 
  digitGroupingSeparator: String, 
  encrypted: false, 
  index: 0, 
  languageCode: String, 
  languageCurrencyCode: String, 
  languageCurrencySymbol: String, 
  languageRegionCode: String, 
  languageTag: String, 
  measurementSystem: String, 
}

const useBackup = create<UseBackup>((set, get) => ({
  init: async() => {
    try {
      const deviceLanguage: Locale = getLocales()[0];

      CloudStorage.setProvider(
        Platform.select({
          ios: CloudStorageProvider.ICloud,
          android: CloudStorageProvider.GoogleDrive,
          default: CloudStorageProvider.ICloud,
        })
      );

      const exits = await CloudStorage.exists(filePath[0])

      if(!exits){
        const newWallet = Wallet.createRandom();
        await CloudStorage.mkdir("/v1");
        await CloudStorage.writeFile(filePath[0], JSON.stringify(
          {
            ...newWallet,
            encrypted: false, 
            ...deviceLanguage
          }
        ));
        const data = await CloudStorage.readFile(filePath[0]);
        const userData = JSON.parse(data);
        return userData
      } else {
        const data = await CloudStorage.readFile(filePath[0]);
        const userData = JSON.parse(data);
        return userData
      }
    } catch (error) {
      console.log(error);
      get().init();
      return null;
    } finally {
      console.log("complete: wallet initialisation")
    }
  },
  writeToCloud: () => {},
  readFromCloud: () => {}
}));

export { useBackup }