import firestore from '@react-native-firebase/firestore';

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

export async function upsertWallet(
  walletAddress: string,
  data: UpsertData
) {
  if (!walletAddress) return; 

  try {
    await firestore()
      .collection('wallets')
      .doc(walletAddress.toLowerCase())
      .set(
        {
          ...data,
          address: data.address ?? walletAddress,
          updatedAt: firestore.FieldValue.serverTimestamp(),
          createdAt: data.createdAt ?? firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
  } catch (error) {
    console.log('upsertWallet error:', error);
  }
}

export async function getWallet(
    address: string,
) {
  try {
    const data = await firestore().collection("wallets").doc(address.toLocaleLowerCase()).collection("balances").get()
    return data
  } catch (error) {
    console.log('upsertWallet error:', error);
    return  null
  } finally {
  }
}

export async function getTransaction(
    address: string,
) {
  try {
    const data = await firestore().collection("wallets").doc(address.toLocaleLowerCase()).collection("transactions").where("tokenSymbol", "==", "USDC").get()
    return data
  } catch (error) {
    console.log('upsertWallet error:', error);
    return  null
  } finally {
  }
}