import { StyleSheet, View, ActivityIndicator } from "react-native";
import { usePrivy } from "@privy-io/expo";
import { useFocusEffect } from "expo-router";
import * as Haptics from "expo-haptics";
import { useCallback } from "react";
import QRCodeStyled from "react-native-qrcode-styled";
import { useState } from "react";
import { useWallet } from "@/store/wallet";

export default function Receive() {
  const { smartAdress } = useWallet();

  useFocusEffect(
    useCallback(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

      return () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
      };
    }, []),
  );

  return (
    <View style={styles.container}>
      <QRCodeStyled
        data={`${smartAdress}`}
        padding={25}
        pieceBorderRadius={"50%"}
        color={"#1F1F1F"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
