import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useWallet } from '@/@src/store/wallet';

interface Props {
    showToast: boolean;
    message?: string;
}

const Toast = (): JSX.Element => {
    const { toast } = useWallet()
    const { message, title, show } = toast;
    const positionY = useSharedValue(-100);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: withSpring(positionY.value) }],
        };
    });

    if (show) {
        positionY.value = 60;
    }

    if (!show) {
        positionY.value = -100;
    }

    return (
        <Animated.View
            style={[
                styles.commonToastStyle,
                styles.topToastStyle,
                animatedStyle,
            ]}
        >
            <Text>{title}</Text>
            <Text>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    commonToastStyle: {
        height: 72,
        borderRadius: 8,
        margin: 8,
        padding: 16,
        elevation: 4,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        position: 'absolute',
        right: 0,
        left: 0,
        zIndex: 100,
    },
    topToastStyle: {
        backgroundColor: '#FFCCCB',
        top: 0,
    },
    bottomToastStyle: {
        backgroundColor: '#FFCCCB',
        bottom: 0,
    },
}); 


export default Toast;