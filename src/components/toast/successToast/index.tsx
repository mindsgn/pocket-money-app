import React, { useEffect, useState } from 'react';
import { style } from './style';
import { View, Text, TouchableOpacity } from 'react-native';
import { useWallet, useAuth } from "../../../context"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const SuccessToast = () => {
  const toastY = useSharedValue(-120);
  const { walletHasSuccess, toast } = useWallet();
  const { authHasSuccess } = useAuth();

  const showToast = (number: number ) => {
    toastY.value = withTiming(number, { duration: 200 });
  };

  const toastStyle = useAnimatedStyle(() => {
    return {
      top: toastY.value,
    };
  }, []);

  useEffect(()=> {
    if(authHasSuccess || walletHasSuccess){
      showToast(0);
    }else{
      showToast(-120);
    }
  },[authHasSuccess, walletHasSuccess]);

  return (
    <Animated.View style={[style.default, toastStyle]}>
      <Text style={style.title}>{`${toast.type}: ${toast.message}`}</Text>
    </Animated.View>
  );
};

export { SuccessToast };
