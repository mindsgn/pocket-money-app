import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, Image, Alert } from 'react-native';
import { LineGraph, RecieveBottomSheet, SendBottomSheet } from "../../components" 
import { style } from './style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useWallet } from '../../context';
import { numberFormatter } from 'hooks';


const Token = (props: any) => {
  const { route } = props;
  const { params } = route;
  const { 
    address,
    privateKey,
    currentPrice = 0, 
    price = 0,
    balanceHistory,
    balance = 0, 
    balanceData 
  } = params;
  const { settings } = useWallet();
  const { currencySymbol } = settings;

  const recieveBottomSheetY = useSharedValue(-200);
  const recieveBackgroundY = useSharedValue(-1000);
  const recieveBackgroundOpacity = useSharedValue(0);

  const sendBottomSheetY = useSharedValue(-200);
  const sendBackgroundY = useSharedValue(-1000);
  const sendBackgroundOpacity = useSharedValue(0);

  const openRecieveBottomSheet = () => {
    recieveBackgroundY.value = withTiming(0, {duration: 200});
    recieveBottomSheetY.value = withTiming(0, {duration: 500});
    recieveBackgroundOpacity.value = withTiming(1, {duration: 500})
  }

  const closeRecieveBottomSheet = () => {
    sendBackgroundY.value = withTiming(-1000, {duration: 500});
    recieveBottomSheetY.value = withTiming(-200, {duration: 200});
    recieveBackgroundOpacity.value = withTiming(0, {duration: 200})
  }

  const openSendBottomSheet = () => {
    sendBackgroundY.value = withTiming(0, {duration: 200});
    sendBottomSheetY.value = withTiming(0, {duration: 500});
    sendBackgroundOpacity.value = withTiming(1, {duration: 500})
  }

  const closeSendBottomSheet = () => {
    sendBackgroundY.value = withTiming(-1000, {duration: 500});
    sendBottomSheetY.value = withTiming(-200, {duration: 200});
    sendBackgroundOpacity.value = withTiming(0, {duration: 200})
  }

  const recieveBottomSheetStyle = useAnimatedStyle(() => {
    return {
      bottom: recieveBottomSheetY.value,
    };
  }, []);

  const recieveBackgroundStyle = useAnimatedStyle(() => {
    return {
      bottom: recieveBackgroundY.value,
      opacity: recieveBackgroundOpacity.value,
    };
  }, []);

  const sendBottomSheetStyle = useAnimatedStyle(() => {
    return {
      bottom: sendBottomSheetY.value,
    };
  }, []);

  const sendBackgroundStyle = useAnimatedStyle(() => {
    return {
      bottom: sendBackgroundY.value,
      opacity: sendBackgroundOpacity.value,
    };
  }, []);

  return (
    <View style={style.default}>
      <LineGraph data={balanceHistory}/>
      <View style={style.tokenDetails}>
        <Image style={style.tokenImage} source={require("../../assets/bitcoin.png")}/>
        <View>
          <Text style={style.tokenName}>{`Bitcoin`}</Text>
          <Text style={style.tokenPrice}>{currencySymbol} {`${numberFormatter(balance.zar, 1)}`}</Text>
        </View>
      </View>
      <View style={style.tokenButtons}>
        <View
          style={style.row}>
        <TouchableOpacity
          onPress={()=> { openSendBottomSheet( ) }}
          style={style.tokenButton}>
            <Text style={style.buttonText}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=> { openRecieveBottomSheet() }}
            style={[style.tokenButton, 
            {
              backgroundColor: "none", 
              borderColor: "green", 
              borderWidth: 2
            }]}>
            <Text style={style.buttonText}>Recieve</Text>
          </TouchableOpacity>
        </View> 
      </View>
      <RecieveBottomSheet 
        type={"Bitcoin"}
        address={address}
        backgroundStyle={recieveBackgroundStyle}
        closeBottomSheet={closeRecieveBottomSheet} 
        bottomSheetStyle={recieveBottomSheetStyle}/>
      <SendBottomSheet
        type={"Bitcoin"} 
        address={address}
        privateKey={privateKey}
        backgroundStyle={sendBackgroundStyle}
        closeBottomSheet={closeSendBottomSheet} 
        bottomSheetStyle={sendBottomSheetStyle}
      />
    </View>
  );
};

export { Token };