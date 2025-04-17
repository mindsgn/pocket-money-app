import React, { useState } from "react";
import { useEffect } from "react";
import { Dimensions, StyleSheet, KeyboardAvoidingView, TextInput, ActivityIndicator, Platform } from "react-native";
import { View, Text } from "react-native";
import { COLOR } from "@/@src/constants/color";
import Button from "@/@src/components/home/button.home"
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useDerivedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated';
import { TEXT } from "@/@src/constants/text";
import { useUser } from "@/@src/store/user";
import { useWallet } from "@/@src/store/wallet";

export default function Address() {
    const [ walletAddress, setWalletAddress ] = useState();
    const { wallet, loading } = useWallet();
    const { address } = wallet;
    const duration = 500;
    const isOpen = useSharedValue(false);
    const height = useSharedValue(0);
    const progress = useDerivedValue(() =>
        withTiming(isOpen.value ? 0 : 1, { duration })
    );

    const sheetStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: progress.value * 2 * height.value }],
    }));

    const backdropStyle = useAnimatedStyle(() => ({
        opacity: 1 - progress.value,
        zIndex: isOpen.value
          ? 1
          : withDelay(duration, withTiming(-1, { duration: 0 })),
    }));


    useEffect(() => {
        if(address===""){
            isOpen.value = true;
        }else{
            isOpen.value = false;
        }
    }, [address]);

    return (
        <Animated.View
            style={[styles.container, backdropStyle]}> 
            <Animated.View style={[styles.backdrop]}/>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={{ flex: 1 }}>
                {
                    loading ?
                        <ActivityIndicator />
                    :
                        <Animated.View
                            style={[styles.modal, sheetStyle]}
                            onLayout={(e) => {
                                height.value = e.nativeEvent.layout.height;
                            }}>
                            <View>
                                <TextInput
                                    multiline={true}
                                    autoCorrect={true}
                                    spellCheck={true}
                                    autoCapitalize={"sentences"}
                                    // editable={!sending}
                                    value={walletAddress}
                                    style={styles.input}
                                    placeholder="Enter wallet address"
                                    // placeholderTextColor={COLORS["light"].background }
                                    onChangeText={(text) => {
                                        setWalletAddress(text);
                                    }}
                                />
                            </View>
                        <Button
                            size={"full"}
                            title={"GET WALLET"} 
                            onPress={() => {
                                // agree()
                            }}
                        />
                    </Animated.View>
                }
            </KeyboardAvoidingView>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        position: "absolute",
    },
    backdrop: {
        flex: 1,
    },
    modal:{
      display: "flex",
      justifyContent: "space-between",
      paddingTop: 10,
      backgroundColor: COLOR.light.backgroundColor,
      borderRadius: 10,
      padding: 10,
      paddingBottom: 30,
    },
    button: {
        backgroundColor: "blue",
        height: 40,
        margin: 10
    },
    title: {
        ...TEXT.title,
        paddingBottom: 20,
        ...TEXT.transactionHead
    },
    input:{
        height: 40,
        width: Dimensions.get("window").width - 20,
        backgroundColor: "black",
        marginVertical: 20,
    }
}); 