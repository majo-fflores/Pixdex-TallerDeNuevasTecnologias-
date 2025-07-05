import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { TextPressStart2P } from "@/components/TextPressStart2P";
import { Buttons } from "@/components/Buttons";
import Colors from "@/constants/Colors";

export function AhorcadoHeader({
  vidas,
  onExit,
}: {
  vidas: number;
  onExit: () => void;
}) {
  const maxVidas = 5;
  return (
    <View style={styles.header}>
      <Buttons
        titulo="EXIT"
        onPress={onExit}
        backgroundColor={Colors.purpuraOscuro}
        showIcon={true}
        iconName="arrow-back"
        textSize={Platform.OS === "android" ? 14 : 14}
        padding={8}
      />
      <View style={styles.vidasContainer}>
        {[...Array(maxVidas)].map((_, i) => (
          <TextPressStart2P
            key={i}
            style={[
              styles.corazon,
              i < vidas ? styles.corazonLleno : styles.corazonVacio,
            ]}
          >
            {i < vidas ? "♥" : "♡"}
          </TextPressStart2P>
        ))}
      </View>
      <View style={{ width: 60 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    backgroundColor: Colors.fondo,
    width: "100%",
    minHeight: 50,
  },
  vidasContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  corazon: {
    fontSize: 25,
    marginHorizontal: 2,
    textAlign: "center",
  },
  corazonLleno: {
    color: Colors.purpuraClaro,
  },
  corazonVacio: {
    color: Colors.grisOscuro,
  },
}); 