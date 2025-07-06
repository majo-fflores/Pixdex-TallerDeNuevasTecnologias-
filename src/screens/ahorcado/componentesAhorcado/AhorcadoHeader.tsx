import React from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
import { Buttons } from "@/components/Buttons";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';

export function AhorcadoHeader({ vidas, puntaje }: { vidas: number; puntaje: number }) {
  const router = useRouter();
  const maxVidas = 5;
  const handleBack = () => {
    router.back();
  };
  return (
    <View style={styles.header}>
      {/* Botón EXIT */}
      <View style={styles.exitButtonContainer}>
        <Buttons
          titulo="EXIT"
          onPress={handleBack}
          backgroundColor={Colors.purpura}
          showIcon={true}
          iconName="arrow-back"
          textSize={Platform.OS === "android" ? 14: 12}
          padding={8}
        />
      </View>
      
      {/* Contenedor central para las vidas */}
      <View style={styles.vidasContainer}>
        {[...Array(maxVidas)].map((_, i) => (
          <View key={i} style={styles.corazon}>
            {i < vidas
              ? <AntDesign name="heart" size={20} color={Colors.purpuraClaro} />
              : <AntDesign name="hearto" size={20} color={Colors.grisOscuro} />
            }
          </View>
        ))}
      </View>
      
      {/* Score */}
      <View style={styles.scoreContainer}>
        <Text style={styles.puntajeText}>Score: {puntaje}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: Colors.fondo,
    width: "100%",
    minHeight: 50,
  },
  exitButtonContainer: {
    width: 100, 
    justifyContent: "flex-start",
  },
  vidasContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
    flex: 1,
  },
  scoreContainer: {
    width: 80, 
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  puntajeText: {
    color: Colors.blanco,
    fontSize: 14, 
    textAlign: "right",
  },
  corazon: {
    justifyContent: "center",
    alignItems: "center",
  },
});