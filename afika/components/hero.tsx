import { StyleSheet, View, Text } from "react-native";
import { Dimensions } from "react-native";
import { GrainyGradient } from "@/shared/ui/organisms/grainy-gradient";

export default function Hero() {
  return (
    <View>
      <GrainyGradient colors={["#000", "#D9D9D9", "#4F4F4F", "#fff"]} />
      <View
        style={{
          height: Dimensions.get("screen").height,
          width: Dimensions.get("window").width,
          position: "absolute",
          paddingBottom: 100,
        }}
      >
        <View style={{ flex: 1 }} />
        <View style={{ padding: 20 }}>
          <Text style={{ color: "white", fontSize: 42 }}>
            {"Save in Dollars"}
          </Text>
          <Text style={{ color: "white", fontSize: 42, fontWeight: "bold" }}>
            {"Send Instantly"}
          </Text>
        </View>
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
