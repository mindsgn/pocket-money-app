import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { Title } from '@/components/shared/title';

export default function WalletCard() {
  return (
    <View style={styles.container}>
      <Title>{'Your Balance'}</Title>
      <Title>{'0.00'}</Title>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    width: Dimensions.get("screen").width - 40,
    backgroundColor: "#fff",
    alignSelf: "center",
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
  },
});
