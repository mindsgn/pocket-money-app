import React, { useEffect, useState } from 'react';
import { style } from './style';
import { View, Text, TouchableOpacity } from 'react-native';
import { useWallet, useAuth } from "../../../context"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const ErrorToast = () => {
  const toastY = useSharedValue(-120);
  const { walletHasError, toast } = useWallet();
  const { authHasError } = useAuth();

  const showToast = (number: number ) => {
    toastY.value = withTiming(number, { duration: 200 });
  };

  const toastStyle = useAnimatedStyle(() => {
    return {
      top: toastY.value
    };
  }, []);

  useEffect(()=> {
    if(authHasError || walletHasError){
      showToast(0);
    }else{
      showToast(-120);
    }
  },[authHasError, walletHasError]);

  return (
    <Animated.View style={[style.default, toastStyle]}>
      <Text style={style.title}>{`${toast.type}: ${toast.message}`}</Text>
    </Animated.View>
  );
};

export { ErrorToast };
