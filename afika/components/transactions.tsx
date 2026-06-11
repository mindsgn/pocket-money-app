import { StyleSheet, View } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import EmptyTransactionCard from '@/components/empty-transaction-card';
import TransactionCard from '@/components/transaction-card';
import TransactionHeader from '@/components/transaction-header';
import { useState, useEffect } from 'react';
import { useWallet } from '@/store/wallet';
import firestore, { QuerySnapshot } from '@react-native-firebase/firestore';

export default function TransactionList() {
  const {smartAdress, address} = useWallet()
  const [transactions, setTransactions] = useState<any[]>([])

    const onResult = (data: QuerySnapshot) => {
      const transactionArray: any[] = []

      data?.forEach( (transaction)=> {
        transactionArray.push( transaction.data())
      })

      setTransactions(transactionArray)
    }
  
    const onError = (error: any) => {
      console.log(error)
    }


  const getallTransaction = async() => {
    if(address === null){
      return null
    }

    try {
      firestore().collection("wallets").doc(smartAdress? smartAdress.toLowerCase() : address?.toLowerCase()).collection("transactions").onSnapshot(onResult, onError)
    } catch(error){
      console.log(error)
    } finally {
    }
  }

  useEffect(() => {
    getallTransaction()
  },[])

  return (
    <View testID="transaction-list">
      <FlashList
        data={transactions}
        //@ts-expect-error unknown error
        estimatedItemSize={90}
        ListEmptyComponent={<EmptyTransactionCard /> }
        ListHeaderComponent={transactions.length == 0? null: <TransactionHeader />}
        renderItem={({ item }) => <TransactionCard tx={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
