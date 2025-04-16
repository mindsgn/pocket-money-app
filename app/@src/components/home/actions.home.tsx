import React from "react";
import { COLOR } from "@/@src/constants/color";
import { View, StyleSheet, Text } from "react-native";
import Button from "./button.home";
import { WIDTH } from "@/@src/constants/dimension";

export default function Actions() {
  return(
    <View style={style.container}>
      <Button title={"SEND"} onPress={()=>{}}/>
      <Button title={"RECIEVE"} outline={true} onPress={()=>{}}/>
    </View>
  );
}

const style = StyleSheet.create({
  container: { 
    display:"flex",
    flexDirection: "row",
    margin: 10,
    width: WIDTH - 20,
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20
  },
})
