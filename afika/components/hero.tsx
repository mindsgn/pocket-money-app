import { StyleSheet, View, Text } from "react-native";
import { Dimensions } from "react-native";

export default function Hero() {
  return (
    <View
      style={{
        flex: 1,
        width: Dimensions.get("window").width,
        backgroundColor: "#000",
      }}
    >
      <View style={{ flex: 1 }} />
      <View style={{ padding: 20 }}>
        <Text style={{ color: "white", fontSize: 42 }}>
          {"Save in Dollars"}
        </Text>
        <Text style={{ color: "green", fontSize: 42, fontWeight: "bold" }}>
          {"Send Instantly"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
