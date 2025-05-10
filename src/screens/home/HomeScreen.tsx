import Colors from '@/constants/Colors';
import { ROUTES } from "@/src/navigation/routes";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { AudioVisualScroll } from "./componentesHome/AudioVisualScroll";
import { GameButton } from "./componentesHome/GameButton";
import { HomeHeader } from "./componentesHome/HomeHeader";

export function HomeScreen() {
  return (
    <ScrollView style={styles.screenContainer}>
      <StatusBar backgroundColor="rgba(0,0,0,0.9)" barStyle="light-content" />
      <HomeHeader />
      <View style={styles.buttonRow}>
        <GameButton
          title="Desafío del Ahorcado"
          description="Adivina los títulos letra por letra. ¿Cuántos puedes identificar?"
          background={Colors.purpura}
          url={ROUTES.AHORCADO}
        />
        <GameButton
          title="Pixel Reveal"
          description="Identifica títulos desde imágenes pixeladas. ¡Pon a prueba tu memoria visual!"
          background={Colors.verde}
          url={ROUTES.PIXEL_REVEAL}
        />
      </View>
      <View style={styles.contenedorScroll}>
        <AudioVisualScroll tipoId={1} />
        <AudioVisualScroll tipoId={2} />
        <AudioVisualScroll tipoId={3} />
      </View>
    </ScrollView>
  );
}

//------------------
// Styles
//------------------

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.fondo
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    paddingHorizontal: 20,

  },
  contenedorScroll: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 20,
    gap: 20
  }
});
