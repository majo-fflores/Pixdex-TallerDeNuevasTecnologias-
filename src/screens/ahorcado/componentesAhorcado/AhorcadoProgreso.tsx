import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TextPressStart2P } from "@/components/TextPressStart2P";
import Colors from "@/constants/Colors";

export function AhorcadoProgreso({ progreso }: { progreso: string[] }) {
  const palabras = progreso.join("").split(" ");
  const screenWidth = Dimensions.get('window').width;
  
  // Calculamos el ancho disponible considerando el padding del contenedor padre
  const availableWidth = screenWidth - 120; // Margen de seguridad para padding y bordes
  
  // Función para calcular el tamaño de fuente dinámico
  const calculateFontSize = (palabra: string) => {
    const baseSize = 20;
    const minSize = 10;
    const maxLetters = Math.floor(availableWidth / 30); // Aproximadamente 35px por letra
    
    if (palabra.length <= maxLetters) {
      return baseSize;
    }
    
    const scaleFactor = maxLetters / palabra.length;
    return Math.max(minSize, baseSize * scaleFactor);
  };

  return (
    <View style={styles.container}>
      {palabras.map((palabra, idx) => {
        const fontSize = calculateFontSize(palabra);
        const letterSpacing = palabra.length > 12 ? 2 : 5;
        
        return (
          <View key={idx} style={[styles.fila, { maxWidth: availableWidth }]}>
            {palabra.split("").map((letra, i) => (
              <TextPressStart2P 
                key={i} 
                style={[
                  styles.letra,
                  { 
                    fontSize: fontSize,
                    marginHorizontal: letterSpacing,
                    minWidth: fontSize + 6, // Ajustamos el ancho mínimo según el tamaño de fuente
                  }
                ]}
              >
                {letra}
              </TextPressStart2P>
            ))}
          </View>
        );
      })}
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
    width: "100%",
  },
  fila: {
    flexDirection: "row",
    gap: 5,
    marginVertical: 1,
    flexWrap: "wrap", // Permite que las letras se envuelvan si es necesario
    justifyContent: "center",
    alignItems: "center",
  },
  letra: {
    color: Colors.blanco,
    textAlign: "center",
    flexShrink: 1, // Permite que las letras se contraigan si es necesario
  },
});