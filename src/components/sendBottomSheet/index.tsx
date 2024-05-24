import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { style } from './style';
import Animated from 'react-native-reanimated';
import { useWallet } from 'context';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, 'X'];

const SendBottomSheet = (
  {
    address,
    privateKey,
    type, 
    bottomSheetStyle, 
    closeBottomSheet, 
    backgroundStyle 
  } : { 
    address: string, 
    type: string,  
    privateKey: string,
    bottomSheetStyle: any, 
    closeBottomSheet: any, 
    backgroundStyle: any 
  }) => {
    const [ amount, setAmount ] = useState("0")
    const { settings, socket } = useWallet();
    const { currencySymbol } = settings

    const sendBitcoin = () => {
      socket.emit("send-bitcoin", {
        address,
        privateKey,
        amount: 1,
        sendTo: "",
        type,
        network: "testnet",
       
      })


      socket.once("sent-bitcoin", ()=>{
        closeBottomSheet();
      }) 
    }

  return (
    <Animated.View style={[style.default, backgroundStyle]}>
      <Animated.View
        style={[style.bottomSheet, bottomSheetStyle]}>
          <View>
            <Text style={style.title}>{`Send ${type}`}</Text>
          </View>

          <View>
            <Text style={style.amount}>{`${currencySymbol} ${parseFloat(amount)}`}</Text>

            <View
              style={style.buttonContainer}>
              {
                numbers.map((number: number | null | string) => {
                  let buttonType = style.codeButton;
                  let buttonText = style.buttonText;

                  if (number === null) {
                    buttonType = style.codeButtonNull;
                  }

                  if (number === 'X') {
                    buttonType = style.codeButtonDelete;
                    buttonText = style.buttonTextDelete;
                  }

                  return (
                    <TouchableOpacity
                      key={number}
                      style={buttonType}
                      onPress={
                        number === "X"?
                        () => setAmount("0")
                        :
                        () => setAmount(amount + `${number}`) 
                      }
                    >
                      <Text style={buttonText}>{number}</Text>
                    </TouchableOpacity>
                  );
            })
          }
            </View>
          </View>

          <View>
            <TouchableOpacity
              onPress={()=>{
                sendBitcoin()
              }}
              style={style.closeButton}>
              <Text style={style.buttonTextSend}>SEND</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={()=>{
                closeBottomSheet()
              }}
              style={style.closeButton}>
              <Text style={style.buttonTextClose}>CLOSE</Text>
            </TouchableOpacity>
          </View>
          
      </Animated.View>
    </Animated.View>
  );
};

export { SendBottomSheet };
