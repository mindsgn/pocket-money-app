import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { style } from './style';
import Animated from 'react-native-reanimated';
import QRCode from 'react-native-qrcode-svg';


const RecieveBottomSheet = (
  { 
    address, 
    type, 
    bottomSheetStyle, 
    closeBottomSheet, 
    backgroundStyle 
  } : {  
    address: string, 
    type: string,
    bottomSheetStyle: any, 
    closeBottomSheet: any, 
    backgroundStyle: any }) => {
  return (
    <Animated.View style={[style.default, backgroundStyle]}>
      <Animated.View
        style={[style.bottomSheet, bottomSheetStyle]}>
          <View>
            <Text style={style.title}>{`Recieve ${type}`}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`whatsapp://send?text=${address}`);
            }}
            style={style.qrCodeContainer}>
            <QRCode
              value={`${address}`}
            />
          </TouchableOpacity>
      
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

export { RecieveBottomSheet };
