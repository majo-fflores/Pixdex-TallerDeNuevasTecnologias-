import React from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
import { Buttons } from "@/components/Buttons";
import Colors from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

export function AhorcadoHeader({
  vidas,
  puntaje,
  nombreJugador,
  onExit,
}: {
  vidas: number;
  puntaje: number;
  nombreJugador: string | null;
  onExit: () => void;
}) {
  const maxVidas = 5;

  return (
    <View style={styles.header}>
      <View style={styles.exitButtonContainer}>
        <Buttons
          titulo="EXIT"
          onPress={onExit}
          backgroundColor={Colors.purpura}
          showIcon={true}
          iconName="arrow-back"
          textSize={Platform.OS === "android" ? 14: 12}
          padding={8}
        />
      </View>

      <View style={styles.vidasContainer}>
        {[...Array(maxVidas)].map((_, i) => (
          <View key={i} style={styles.corazon}>
            {i < vidas
              ? <MaterialIcons name="favorite" size={20} color={Colors.purpuraClaro} />
              : <MaterialIcons name="favorite-border" size={20} color={Colors.purpuraClaro} />
            }
          </View>
        ))}
      </View>

      <View style={styles.scoreContainer}>
        {nombreJugador && (
          <Text style={styles.nombreText} numberOfLines={1}>{nombreJugador}</Text>
        )}
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
    minWidth: 80,
    maxWidth: 120,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  nombreText: {
    color: Colors.blanco,
    fontSize: 10,
    textAlign: "right",
    marginBottom: 2,
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