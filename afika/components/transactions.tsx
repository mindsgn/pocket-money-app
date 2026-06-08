import { StyleSheet, View } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import EmptyTransactionCard from '@/components/empty-transaction-card';
import TransactionCard from '@/components/transaction-card';
import TransactionHeader from '@/components/transaction-header';
import { Title } from '@/components/shared/title';

export default function TransactionList() {
    /*
  const { transactions, setTransactions, walletAddress } = useWallet();

  const usdcTransactions = useMemo(() => {
    return transactions.filter((tx: any) => tx.symbol === "USDC" || tx.tokenSymbol === "USDC");
  }, [transactions]);
  */

  return (
    <View testID="transaction-list">
      {
        [].length === 0 ?
        null
        :
        <Title>Transactions</Title>
      }
      
      <FlashList
        data={[]}
        //@ts-expect-error unknown error
        estimatedItemSize={90}
        ListEmptyComponent={<EmptyTransactionCard /> }
        ListHeaderComponent={[].length == 0? null: <TransactionHeader />}
        renderItem={({ item }) => <TransactionCard tx={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
