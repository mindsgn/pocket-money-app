import { StyleSheet, View } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import EmptyTransactionCard from '@/components/empty-transaction-card';
import TransactionCard from '@/components/transaction-card';
import TransactionHeader from '@/components/transaction-header';
import { Title } from '@/components/shared/title';
import { useState, useEffect } from 'react';
import { getTransaction } from '@/lib/firebase';

export default function TransactionList() {
  const [transactions, setTransactions] = useState<any[]>([])

  const getallTransaction = async() => {
    try {
      const data = await getTransaction(`0x04333a1788a47068b9102D2d35695c312A0b312F`.toLowerCase())
      
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
