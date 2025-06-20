import React, { useState } from "react";
import { useEffect } from "react";
import { Dimensions, StyleSheet, KeyboardAvoidingView, ActivityIndicator, Platform, } from "react-native";
import { View } from "react-native";
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
import { useWallet } from "@/@src/store/wallet";
import { useSortedRowIds } from "tinybase/ui-react";

export default function Address() {
    const data = useSortedRowIds("ethereum", "done");
    const [ walletAddress, setWalletAddress ] = useState();
    // const { firebase } = useFirebase();
    const { wallet, loading, getWalletBalance } = useWallet();
    const { address } = wallet;
    
    const duration = 500;
    const isOpen = useSharedValue(false);
    const height = useSharedValue(Dimensions.get("window").height);
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
    }, [address]);

    return (
        <Animated.View
            style={[styles.container, sheetStyle]}> 
            <Animated.View style={[styles.backdrop, backdropStyle]}/>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
            >
                        <Animated.View
                            style={[styles.modal, sheetStyle]}
                            onLayout={(e) => {
                            }}>
                           
                            {
                                loading ?
                                    <ActivityIndicator />
                                :
                                <View>
                                    <Button
                                        size={"full"}
                                        title={"CREATE NEW WALLET"} 
                                        onPress={() => {}}
                                    />
                                </View>
                            }
                    </Animated.View>
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
        zIndex: 2,
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
        backgroundColor: "none",
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 10,
        padding: 10,
        marginVertical: 20,
    }
}); 