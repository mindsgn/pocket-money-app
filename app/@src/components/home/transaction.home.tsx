import React from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { WIDTH } from "@/@src/constants/dimension";
import { useTransactions } from "@/@src/store/transactions";
import Empty from "@/@src/components/home/empty.home";
import Header from "@/@src/components/home/header.home";
import TransactionCard from "./card/transaction.card";
import { useWallet } from "@/@src/store/wallet";

export default function Transactions() {
  const { transactions, loading } = useWallet();

  if(loading){
    return(
      <View style={[style.container]}>
        <ActivityIndicator />
      </View>
    );
  }
  
  return (
      <FlashList
        ListHeaderComponent={<Header />}
        ListEmptyComponent={<Empty />}
        data={transactions}
        renderItem={({ item }) => {
          const { 
            formatedFiatValue, 
            transactionType, 
            timeStamp, 
            fiatValue, 
            blockNumber, 
            hash, 
            nonce, 
            blockHash, 
            transactionIndex, 
            to,
            gas, 
            gasPrice,
            transactionFee
          } = item;

          return ( 
            <TransactionCard
              fiatValue={fiatValue}
              transactionType={transactionType}
              formatedFiatValue={formatedFiatValue}
              timeStamp={timeStamp}
              blockNumber={blockNumber}
              hash={hash}
              nonce={nonce}
              blockHash={blockHash}
              transactionIndex={transactionIndex}
              to={to}
              gas={gas}
              gasPrice={gasPrice}
              transactionFee={transactionFee}
            />
          )
        }
        }
        estimatedItemSize={200}
      />
  );
}

const style = StyleSheet.create({
  container: {
    flex:1,
    alignItems: "center",
    justifyContent: "center",
    width: WIDTH - 20,
  },
})
