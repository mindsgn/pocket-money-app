import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { style } from './style';
import { useWallet } from '../../context';
import { APP_NETWORK } from '@env';
import Animated from 'react-native-reanimated';

const TokenBottomSheet = ({ bottomSheetStyle, closeBottomSheet, backgroundStyle } : { bottomSheetStyle: any, closeBottomSheet: any, backgroundStyle: any }) => {
  const {createNewBitcoinWallet, walletList} = useWallet();

  useEffect(()=> {   
  },[walletList])
  
  return (
    <Animated.View style={[style.default, backgroundStyle]}>
      <Animated.View
        style={[style.bottomSheet, bottomSheetStyle]}>
          <View>
            <Text style={style.title}>Token</Text>
            <TouchableOpacity
              onPress={()=>{
                createNewBitcoinWallet(APP_NETWORK);
              }}
              style={style.tokenButton}>
              <Text style={style.tokenText}>Add Bitcoin</Text>
            </TouchableOpacity>
          </View>
      
          <TouchableOpacity
            onPress={()=>{
              closeBottomSheet()
            }}
            style={style.closeButton}>
            <Text style={style.buttonText}>CLOSE</Text>
          </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export { TokenBottomSheet };
