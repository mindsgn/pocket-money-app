import React from "react";
import { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
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

export default function Terms() {
    const { terms, updateUser } = useUser();
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

    const agree = async() => {
        await updateUser();
    };

    useEffect(() => {
        if(!terms){
            isOpen.value = true;
        }else{
            isOpen.value = false;
        }
    }, [terms]);

    return (
        <Animated.View
            style={[styles.container, backdropStyle]}> 
            <Animated.View style={[styles.backdrop]}/>
            <Animated.View
                style={[styles.modal, sheetStyle]}
                onLayout={(e) => {
                    height.value = e.nativeEvent.layout.height;
                }}>
                <View>
                    <Text style={[styles.title]}>{"Important Notice:"}</Text>
                    <Text style={[styles.text]}>{`While we continuously strive to improve your experience and enhance the features of this cryptocurrency wallet, please note the following: This is a non-custodial wallet, meaning you are solely responsible for managing your private keys. We do not store, manage, or have access to your private keys under any circumstances. If you lose your private keys or recovery phrase, we cannot recover your wallet or your funds. Please take all necessary precautions to securely back up and store your private keys. Loss of access to your keys may result in the permanent loss of your cryptocurrency assets.
                    `}</Text>
                </View>
                <Button
                    title={"I AGREE"} 
                    onPress={() => {
                        agree()
                    }}
                />
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimensions.get("window").height,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
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
      bottom: 0,
      height: 400,
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
    }
}); 