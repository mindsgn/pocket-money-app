import React from "react";
import { COLOR } from "@/@src/constants/color";
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";
import { TEXT } from "@/@src/constants/text";

interface Button{
    title: string,
    onPress:() => void
    size?: "full" | null, 
    outline?: boolean,
}

export default function Button({title, onPress, outline=false, size} : Button) {
  return(
    <TouchableOpacity 

        style={[style.container, outline? style.outline: null, size ? style.size : null ] } 
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
    size: {
        width: Dimensions.get("window").width - 20,
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
