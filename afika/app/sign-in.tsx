import {
  StyleSheet,
  View,
  Text,
  Platform,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useLoginWithOAuth, OAuthProviderID } from "@privy-io/expo";
import { useState } from "react";
import Hero from "@/components/hero";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { useFocusEffect } from "expo-router";
import * as Haptics from "expo-haptics";
import Animated from "react-native-reanimated";
import { SignInButton } from "@/components/sign-in-button";

export default function SignIn() {
  const router = useRouter();
  const [progress, setProgress] = useState<boolean>(false);
  const { login } = useLoginWithOAuth();

  async function handleSignIn(provider: OAuthProviderID) {
    setProgress(true);
    try {
      await login({ provider });
      router.replace("/(home)");
    } catch (error) {
      console.log(error);
    } finally {
      setProgress(false);
    }
  }

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
      <Hero />
      <Animated.View
        style={{
          width: Dimensions.get("screen").width,
          paddingVertical: 20,
          position: "absolute",
          bottom: 0,
          alignItems: "center",
        }}
      >
        {progress ? (
          <ActivityIndicator size={40} />
        ) : Platform.OS === "ios" ? (
          <SignInButton
            onPress={() => {
              handleSignIn("apple");
            }}
          />
        ) : (
          <SignInButton
            onPress={() => {
              handleSignIn("google");
            }}
          />
        )}
      </Animated.View>
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
  button: {
    width: 200,
    height: 44,
  },
});
