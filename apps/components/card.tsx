import React from 'react';
import { View, Text } from 'react-native';
//import { wallet } from '../redux/actions/wallet.action';

const Card = () => {

    return (
        <View
            style={{
                minHeight: 200,
                display:'flex',
                backgroundColor: 'white',
                borderRadius: 10,
                margin: 10,
                padding: 20,
            }}>
             <View>
                <Text
                style={{
                    color: 'black',
                    fontSize: 20,
                    fontWeight:'bold'
                }}
                >{}</Text>
            </View>
            <View>
                <Text
                    style={{
                        fontSize: 40,
                        fontWeight:'bold'
                    }}>R {(0)?.toFixed(2)}</Text>
            </View>
            <View
                style={{
                    position: 'absolute',
                    right: "2%",
                    bottom: "2%",
                    borderRadius: 100,
                    minWidth: 50,
                    minHeight: 50,
                    maxWidth: 50,
                    maxHeight: 50,
                    backgroundColor: 'black',
                }}>
            </View>
        </View>
    )
}

export default Card;