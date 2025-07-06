import React from "react";
import { Text, StyleSheet, View, Platform } from "react-native";
import Colors from "@/constants/Colors";

export function AhorcadoHomeDescription() {
  return (
    <View style={styles.descBox}>
      <Text style={styles.desc}>
        Guess the titles of popular TV shows, movies, and anime one letter at a time. You have 5 lives - can you get the highest score?
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  descBox: {
    marginBottom: Platform.OS === "web" ? 40 : 24,
    alignItems: "center",
  },
  desc: {
    color: Colors.blanco,
    fontSize: Platform.OS === "web" ? 24 : 20,
    textAlign: "center",
    lineHeight: Platform.OS === "web" ? 32 : 25,
  },
});