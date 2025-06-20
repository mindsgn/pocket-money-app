import React, { useState } from "react";
import { useEffect } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
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

export default function Address() {
    const [ loading, setLoading] = useState(false);
    const { details, triggerTransaction } = useWallet();
    const { show, fiatValue, transactionFee, timeStamp } = details;
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
        if(show){
            isOpen.value = true;
        }else{
            isOpen.value = false;
        }
    }, [show]);

    return (
        <Animated.View style={[styles.container, sheetStyle]}> 
            <Animated.View style={[styles.backdrop, backdropStyle]}/>
            <Animated.View style={[styles.modal, sheetStyle]} onLayout={(e) => {}}>
                {
                    loading ?
                        <ActivityIndicator/>
                    :
                        <View>
                            <Text style={styles.title}>{`Transaction Details\n`}</Text>
                            <Text>{`Transaction Amount:\n R${fiatValue}\n`}</Text>
                            <Text>{`Transaction Date:\n ${new Date(parseInt(`${timeStamp}`) * 1000)}\n`}</Text>
                            <Text>{`Transaction Fee:\n R${transactionFee}\n`}</Text>
                            <Button 
                                title={"OK"} 
                                onPress={() => {
                                    triggerTransaction()
                                }}
                                size={"full"}/>
                        </View>
                }
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
    },
    backdrop: {
        flex: 1,
    },
    modal:{
      display: "flex",
      justifyContent: "space-between",
      paddingTop: 10,
      backgroundColor: COLOR.dark.backgroundColor ,
      borderRadius: 10,
      padding: 10,
      paddingBottom: 30,
    },
    title: {
        ...TEXT.transactionHead
    }
}); 