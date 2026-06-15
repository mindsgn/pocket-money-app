import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
  serverTimestamp,
  deleteDoc,
} from "@react-native-firebase/firestore";

export interface UpsertData {
  address?: string;
  network?: string;
  createdAt?: any;
  updatedAt?: any;
  PhoneNumber?: string | null;
  IsVerified?: boolean;
  UserLevel?: number;
  PhoneLinkedAt?: any | null;
}

export type PreferredCurrency = "USD" | "ZAR";

export interface WalletSettings {
  preferredCurrency: PreferredCurrency;
}

export interface PushNotificationDetails {
  enabled: boolean;
  permissionStatus: string;
  platform: string;
  expoPushToken?: string | null;
  devicePushToken?: string | null;
  devicePushTokenType?: string | null;
}

export async function upsertWallet(walletAddress: string, data: UpsertData) {
  if (!walletAddress) return;

  try {
    const db = getFirestore();
    const docRef = doc(db, "wallets", walletAddress.toLowerCase());
    const document = await getDoc(docRef);
    if (document.exists()) return;

    await setDoc(
      docRef,
      {
        ...data,
        address: data.address ?? walletAddress,
        updatedAt: serverTimestamp(),
        createdAt: data.createdAt ?? serverTimestamp(),
      },
      { merge: true },
    );
  } catch (error) {
    console.log("upsertWallet error:", error);
  }
}

export async function getWallet(address: string) {
  try {
    const db = getFirestore();
    const balancesRef = collection(
      db,
      "wallets",
      address.toLocaleLowerCase(),
      "balances",
    );
    const data = await getDocs(balancesRef);
    return data;
  } catch (error) {
    console.log("upsertWallet error:", error);
    return null;
  } finally {
  }
}

export async function getTransaction(address: string) {
  try {
    const db = getFirestore();
    const txRef = collection(
      db,
      "wallets",
      address.toLocaleLowerCase(),
      "transactions",
    );
    const q = query(txRef, where("tokenSymbol", "==", "USDC"));
    const data = await getDocs(q);
    return data;
  } catch (error) {
    console.log("upsertWallet error:", error);
    return null;
  } finally {
  }
}

const DEFAULT_WALLET_SETTINGS: WalletSettings = {
  preferredCurrency: "USD",
};

function walletDetailsDoc(address: string, detailId: string) {
  const db = getFirestore();
  return doc(db, "wallets", address.toLowerCase(), "details", detailId);
}

export async function getWalletSettings(
  walletAddress: string,
): Promise<WalletSettings> {
  if (!walletAddress) {
    return DEFAULT_WALLET_SETTINGS;
  }

  try {
    const settingsDoc = await getDoc(
      walletDetailsDoc(walletAddress, "preferences"),
    );

    if (!settingsDoc.exists()) {
      return DEFAULT_WALLET_SETTINGS;
    }

    const data = settingsDoc.data() as Partial<WalletSettings> | undefined;

    return {
      preferredCurrency:
        data?.preferredCurrency === "ZAR"
          ? "ZAR"
          : DEFAULT_WALLET_SETTINGS.preferredCurrency,
    };
  } catch (error) {
    console.log("getWalletSettings error:", error);
    return DEFAULT_WALLET_SETTINGS;
  }
}

export async function setWalletCurrencyPreference(
  walletAddress: string,
  preferredCurrency: PreferredCurrency,
) {
  if (!walletAddress) return;

  try {
    await setDoc(
      walletDetailsDoc(walletAddress, "preferences"),
      {
        preferredCurrency,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
  } catch (error) {
    console.log("setWalletCurrencyPreference error:", error);
    throw error;
  }
}

export async function hasPushNotificationDetails(walletAddress: string) {
  if (!walletAddress) return false;

  try {
    const pushDoc = await getDoc(
      walletDetailsDoc(walletAddress, "push-notifications"),
    );
    return pushDoc.exists();
  } catch (error) {
    console.log("hasPushNotificationDetails error:", error);
    return false;
  }
}

export async function savePushNotificationDetails(
  walletAddress: string,
  details: PushNotificationDetails,
) {
  if (!walletAddress) return;

  try {
    await setDoc(
      walletDetailsDoc(walletAddress, "push-notifications"),
      {
        ...details,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
  } catch (error) {
    console.log("savePushNotificationDetails error:", error);
    throw error;
  }
}

export async function deletePushNotificationDetails(walletAddress: string) {
  if (!walletAddress) return;

  try {
    await deleteDoc(walletDetailsDoc(walletAddress, "push-notifications"));
  } catch (error) {
    console.log("deletePushNotificationDetails error:", error);
    throw error;
  }
}
