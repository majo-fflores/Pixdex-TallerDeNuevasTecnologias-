import React from "react";
import { View, StyleSheet } from "react-native";
import { TextPressStart2P } from "@/components/TextPressStart2P";
import Colors from "@/constants/Colors";

export function AhorcadoProgreso({ progreso }: { progreso: string[] }) {

  const palabras = progreso.join("").split(" ");

  return (
    <View style={styles.container}>
      {palabras.map((palabra, idx) => (
        <View key={idx} style={styles.fila}>
          {palabra.split("").map((letra, i) => (
            <TextPressStart2P key={i} style={styles.letra}>
              {letra}
            </TextPressStart2P>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    gap: 15,
  },
  fila: {
    flexDirection: "row",
    gap: 5,
    marginVertical: 1,
  },
  letra: {
    fontSize: 24,
    color: Colors.blanco,
    marginHorizontal: 5,
    minWidth: 30,
    textAlign: "center",
  },
}); 