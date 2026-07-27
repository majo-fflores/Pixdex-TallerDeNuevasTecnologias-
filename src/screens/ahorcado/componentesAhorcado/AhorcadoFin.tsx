import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { TextPressStart2P } from "@/components/TextPressStart2P";
import { Buttons } from "@/components/Buttons";
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";

export function AhorcadoFin({ gano, titulo, onVolver, puntaje }: { gano: boolean, titulo: string, onVolver: () => void, puntaje: number }) {
  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <View style={styles.container}>
        <TextPressStart2P style={styles.titulo}>¡Juego terminado!</TextPressStart2P>
        <TextPressStart2P style={styles.resultado}>
          {gano ? "¡Felicidades, adivino todo el catalogo!!!" : "GAME OVER!!"}
        </TextPressStart2P>
        <TextPressStart2P style={styles.puntajeFinal}>Puntaje Final: {puntaje}</TextPressStart2P>
        <TextPressStart2P style={styles.tituloCorrecto}>El título era: {titulo}</TextPressStart2P>
        <Buttons
          titulo="VOLVER"
          onPress={onVolver}
          backgroundColor={Colors.purpura}
          showIcon={false}
          textSize={14}
          padding={10}
          centrado
          borderWidth={2}
          borderTopColor={Colors.verde}
          borderLeftColor={Colors.verde}
          borderBottomColor={Colors.verde}
          borderRightColor={Colors.verde}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    backgroundColor: Colors.fondo,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'web' ? 20 : 10,
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
    marginHorizontal: 50,
    textAlign: 'center',
    lineHeight: 40
  },
  puntajeFinal: {
    color: Colors.verde,
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  tituloCorrecto: {
    color: Colors.blanco,
    fontSize: 16,
    marginBottom: 20,
    marginHorizontal: 30,
    textAlign: 'center',
    lineHeight: 40
  },
});
