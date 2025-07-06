import React from "react";
import { TextPressStart2P } from "@/components/TextPressStart2P";
import { StyleSheet, View, Platform } from "react-native";
import Colors from "@/constants/Colors";

export function AhorcadoHomeTitle() {
  return (
    <View style={styles.titleBox}>
      <TextPressStart2P style={styles.title}>Hangman</TextPressStart2P>
      <TextPressStart2P style={styles.title}>Challenge</TextPressStart2P>
    </View>
  );
}

const styles = StyleSheet.create({
  titleBox: {
    alignItems: "center",
    marginBottom: Platform.OS === "web" ? 24 : 12,
  },
  title: {
    color: Colors.purpuraClaro,
    fontSize: Platform.OS === "web" ? 38 : 28,
    textAlign: "center",
    marginVertical: 0,
  },
}); 