import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { AhorcadoHomeHeader } from "./componentesHomeAhorcado/AhorcadoHomeHeader";
import { AhorcadoHomeTitle } from "./componentesHomeAhorcado/AhorcadoHomeTitle";
import { AhorcadoHomeDescription } from "./componentesHomeAhorcado/AhorcadoHomeDescription";
import { Buttons } from "@/components/Buttons";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { ROUTES } from "@/src/navigation/routes";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AhorcadoHomeScreen() {
  const router = useRouter();
  
  const handleStartGame = () => {
    router.push(ROUTES.AHORCADO_GAME);
  };

  return (
    <SafeAreaView edges={['top']} style={styles.screenContainer}>
      <View style={styles.container}>
        <AhorcadoHomeHeader />
        <View style={styles.cuadro}>
          <AhorcadoHomeTitle />
          <AhorcadoHomeDescription />
          <Buttons
            titulo="START GAME"
            onPress={handleStartGame}
            backgroundColor={Colors.purpura}
            showIcon={false}
            textSize={16}
            padding={14}
            borderWidth={2}
            borderTopColor={Colors.verde}
            borderLeftColor={Colors.verde}
            borderBottomColor={Colors.verde}
            borderRightColor={Colors.verde}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.fondo,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: Platform.OS === "web" ? 40 : 10,
  },
  cuadro: {
    flex: 1,
    width: "100%",
    maxWidth: Platform.OS === "web" ? 500 : 400,
    backgroundColor: Colors.fondo,
    borderWidth: 4,
    borderColor: Colors.grisOscuro,
    padding: Platform.OS === "web" ? 40 : 30,
    marginTop: Platform.OS === "web" ? 40 : 10,
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: Platform.OS === "web" ? 420 : undefined,
  },
});