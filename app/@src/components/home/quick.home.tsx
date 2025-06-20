import React, { useState } from "react";
import { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
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

export default function Quck() {
    const [ loading ] = useState(false);
    const { wallet, triggerWallet } = useWallet();
    const { show, today = 0, week = 0, month = 0 } = wallet;
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
        zIndex: isOpen.value ? 1 : withDelay(duration, withTiming(-2, { duration: 0 })),
    }));
    
    useEffect(() => {
        if(show){
            isOpen.value = true;
        } else {
            isOpen.value = false;
        }
    }, [show]);

    return (
        <Animated.View style={[styles.container, backdropStyle]}>
            <Animated.View style={[styles.modal, sheetStyle]} onLayout={(e) => {}}>
                <View>
                    <Text style={styles.text}>{`Spent Today:\nR${today}\n`}</Text>
                    <Text style={styles.text}>{`Spent This Week:\nR${week}\n`}</Text>
                    <Text style={styles.text}>{`Spent This Month:\nR${month}\n`}</Text>
                    <Button
                            title={"OK"} 
                            onPress={() => {
                                triggerWallet()
                            }}
                            size={"full"}/>
                        </View>
            </Animated.View>
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
        justifyContent: "flex-end"
    },
    backdrop: {
        flex: 1,
    },
    text: {
        color: COLOR.dark.balanceColor,
        ...TEXT.emptyBody
    },
    modal:{
      display: "flex",
      justifyContent: "space-between",
      paddingTop: 10,
      backgroundColor: COLOR.dark.backgroundColor,
      borderRadius: 10,
      padding: 10,
      paddingBottom: 30,
    },
    title: {
        ...TEXT.transactionHead
    }
}); 