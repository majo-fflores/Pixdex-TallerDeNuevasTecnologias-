import React from "react";
import { ScrollView, StyleSheet, Platform, View } from "react-native";
import { AhorcadoHomeHeader } from "./componentesHomeAhorcado/AhorcadoHomeHeader";
import { AhorcadoHomeTitle } from "./componentesHomeAhorcado/AhorcadoHomeTitle";
import { TopPlayersList } from "./puntuaciones/TopPlayersList";
import { useTopPuntuaciones } from "./puntuaciones/useTopPuntuaciones";
import { Buttons } from "@/components/Buttons";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { ROUTES } from "@/src/navigation/routes";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AhorcadoHomeScreen() {
  const router = useRouter();
  const { puntuaciones, cargando } = useTopPuntuaciones();

  const handleStartGame = () => {
    router.push(ROUTES.AHORCADO_GAME);
  };

  return (
    <SafeAreaView edges={['top']} style={styles.screenContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <AhorcadoHomeHeader />
        <View style={styles.cuadro}>
          <AhorcadoHomeTitle />
          <View style={styles.botonContainer}>
            <Buttons
              titulo="START GAME"
              onPress={handleStartGame}
              backgroundColor={Colors.purpura}
              showIcon={false}
              textSize={Platform.OS === "web" ? 14 : 12}
              padding={Platform.OS === "web" ? 14 : 10}
              centrado
              borderWidth={2}
              borderTopColor={Colors.verde}
              borderLeftColor={Colors.verde}
              borderBottomColor={Colors.verde}
              borderRightColor={Colors.verde}
            />
          </View>
          <TopPlayersList puntuaciones={puntuaciones} cargando={cargando} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },
  container: {
    flexGrow: 1,
    backgroundColor: Colors.fondo,
    alignItems: "center",
    padding: Platform.OS === "web" ? 40 : 16,
    paddingTop: Platform.OS === "web" ? 40 : 8,
  },
  cuadro: {
    width: "100%",
    maxWidth: Platform.OS === "web" ? 500 : 400,
    backgroundColor: Colors.fondo,
    borderWidth: 4,
    borderColor: Colors.grisOscuro,
    padding: Platform.OS === "web" ? 40 : 24,
    marginTop: Platform.OS === "web" ? 20 : 10,
    alignItems: "center",
  },
  botonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: Platform.OS === "web" ? 8 : 4,
  },
});
