import React from "react";
import { View, StyleSheet } from "react-native";
import { TextPressStart2P } from "@/components/TextPressStart2P";
import { Buttons } from "@/components/Buttons";
import Colors from "@/constants/Colors";

export function AhorcadoFin({ gano, titulo, onVolver }: { gano: boolean, titulo: string, onVolver: () => void }) {
  return (
    <View style={styles.container}>
      <TextPressStart2P style={styles.titulo}>¡Juego terminado!</TextPressStart2P>
      <TextPressStart2P style={styles.resultado}>
        {gano ? "¡Felicidades, adivinaste el título!" : "Te quedaste sin vidas."}
      </TextPressStart2P>
      <TextPressStart2P style={styles.tituloCorrecto}>El título era: {titulo}</TextPressStart2P>
      <Buttons
        titulo="VOLVER AL HOME"
        onPress={onVolver}
        backgroundColor={Colors.purpura}
        showIcon={false}
        textSize={14}
        padding={10}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    backgroundColor: Colors.fondo,
  },
  titulo: {
    color: Colors.blanco,
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  resultado: {
    color: Colors.verde,
    fontSize: 25,
    marginBottom: 20,
    marginHorizontal:50,
    textAlign: 'center',
    lineHeight: 40
  },
  tituloCorrecto: {
    color: Colors.blanco,
    fontSize: 16,
    marginBottom: 20,
    marginHorizontal:30,
    textAlign: 'center',
    lineHeight: 40
  },
}); 