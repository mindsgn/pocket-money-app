import React from "react";
import { COLOR } from "@/@src/constants/color";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { TEXT } from "@/@src/constants/text";

interface Button{
    title: string,
    onPress:() => void
    outline?: boolean,
}

export default function Button({title, onPress, outline=false} : Button) {
  return(
    <TouchableOpacity 
        style={[style.container, outline? style.outline: null]} 
        onPress={onPress}
    >
        <Text style={style.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
    container: { 
        width: 150,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLOR.dark.buttoneColor,
        borderRadius: 10,
        paddingVertical: 10,
    },
    outline: {
        backgroundColor: "none",
        borderWidth: 4,
        borderColor: COLOR.dark.buttoneColor
    },
    title: {
        ...TEXT.button,
        color: COLOR.dark.balanceColor,
    },
});
