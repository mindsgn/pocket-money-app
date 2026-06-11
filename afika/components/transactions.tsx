import { StyleSheet, View } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import EmptyTransactionCard from '@/components/empty-transaction-card';
import TransactionCard from '@/components/transaction-card';
import TransactionHeader from '@/components/transaction-header';
import { Title } from '@/components/shared/title';
import { useState, useEffect } from 'react';
import { getTransaction } from '@/lib/firebase';
import { useWallet } from '@/store/wallet';

export default function TransactionList() {
  const {smartAdress, address} = useWallet()
  const [transactions, setTransactions] = useState<any[]>([])

  const getallTransaction = async() => {
    if(address === null){
      return null
    }

    try {
      const data = await getTransaction(smartAdress? smartAdress.toLowerCase() : address?.toLowerCase())
      
      const transactionArray: any[] = []

      data?.forEach( (transaction)=> {
        transactionArray.push( transaction.data())
      })

      setTransactions(transactionArray)

    } catch(error){
    } finally {
    }
  }

  useEffect(() => {
    getallTransaction()
  },[transactions])

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
