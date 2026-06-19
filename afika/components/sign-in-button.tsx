import { View, Text, Platform, Pressable } from "react-native";
import ChromaRing from "@/shared/ui/organisms/chroma-ring";

const SignInButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <ChromaRing glow="#000000" base="#000000">
      <Pressable onPress={onPress}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          {Platform.OS === "ios" ? "SIGN IN WITH APPLE" : "SIGN IN WITH"}
        </Text>
      </Pressable>
    </ChromaRing>
  );
};

export { SignInButton };
