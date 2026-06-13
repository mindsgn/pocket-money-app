import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import * as Haptics from "expo-haptics"
import { useRouter } from "expo-router";
import { useWallet } from "@/store/wallet";

type CurrencyPrice = {
  value: string | number;
  lastUpdatedAt?: any;
};

type MarketItem = {
  id: string;
  name?: string;
  symbol: string;
  prices?: {
    USD?: CurrencyPrice;
    ZAR?: CurrencyPrice;
  };
};

export default function Markets() {
  const router = useRouter();
  const [marketData, setMarketData] = useState<MarketItem[]>([]);
  const [loading, setLoading] = useState(true);

  const { address } = useWallet();

  useEffect(() => {
    if (!address) {
      setLoading(false);
      return;
    }

    const unsubscribe = firestore()
      .collection("tokenPrices")
      .doc("base-mainnet")
      .collection("tokens")
      .onSnapshot(
        (snapshot: FirebaseFirestoreTypes.QuerySnapshot) => {
          const markets: MarketItem[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<MarketItem, "id">),
          }));

          setMarketData(markets);
          setLoading(false);
        },
        (error) => {
          console.log("Market listener error:", error);
          setLoading(false);
        }
      );

    return unsubscribe;
  }, [address]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={styles.loadingText}>Loading markets...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlashList
        data={marketData}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<MarketHeader />}
        ListFooterComponent={<MarketFooter />}
        ListEmptyComponent={<EmptyMarketCard />}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => <MarketCard item={item} />}
      />
    </View>
  );
}

function MarketHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Markets</Text>
      <Text style={styles.subtitle}>Live token prices on Base</Text>
    </View>
  );
}

function MarketFooter() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Prices update automatically.</Text>
    </View>
  );
}

function EmptyMarketCard() {
  return (
    <View style={styles.emptyCard}>
      <Text style={styles.emptyTitle}>No markets found</Text>
      <Text style={styles.emptyText}>
        Market data will appear here once tokens are available.
      </Text>
    </View>
  );
}

function MarketCard({ item }: { item: MarketItem }) {
  const router = useRouter();
  const usdValue = item.prices?.USD?.value;
  const zarValue = item.prices?.ZAR?.value;

  const formattedUSD =
    usdValue !== undefined ? `$${Number(usdValue).toFixed(2)}` : "$0.00";

  const formattedZAR =
    zarValue !== undefined ? `R${Number(zarValue).toFixed(2)}` : "R0.00";

  return (
    <TouchableOpacity
      onPress={() => { 
        router.push({
          pathname: "/market/[symbol]",
          params: {
            symbol: item.symbol,
          },
        })
      }}
      onPressIn={() => [
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)  
      ]}
      onPressOut={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)  
      }}
      activeOpacity={0.8} style={styles.card}>
        <View style={styles.row}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>
              {item.symbol?.charAt(0)?.toUpperCase()}
            </Text>
          </View>

          <View style={styles.marketInfo}>
            <Text style={styles.symbol}>{item.symbol}</Text>
            {item.name && <Text style={styles.name}>{item.name}</Text>}
          </View>

          <View style={styles.priceInfo}>
            <Text style={styles.usdPrice}>{formattedUSD}</Text>
          </View>
        </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  listContent: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F7FA",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: "#777",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#111",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 16,
    color: "#666",
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginBottom: 12,
    borderRadius: 22,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#1D4878",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
  },
  marketInfo: {
    flex: 1,
  },
  symbol: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111",
    textTransform: "uppercase",
  },
  name: {
    marginTop: 3,
    fontSize: 14,
    color: "#777",
  },
  priceInfo: {
    alignItems: "flex-end",
  },
  usdPrice: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111",
  },
  zarPrice: {
    marginTop: 4,
    fontSize: 14,
    color: "#777",
  },
  emptyCard: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 22,
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111",
  },
  emptyText: {
    marginTop: 8,
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    lineHeight: 20,
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 13,
    color: "#888",
  },
});
