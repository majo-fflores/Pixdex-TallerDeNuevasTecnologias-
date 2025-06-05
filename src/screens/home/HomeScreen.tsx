import Colors from '@/constants/Colors';
import { tiposContenidoAudiovisual } from '@/data/tiposContenidoAudiovisual';
import { ROUTES } from "@/src/navigation/routes";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { AudioVisualScroll } from "./componentesHome/AudioVisualScroll";
import { GameButton } from "./componentesHome/GameButton";
import { HomeHeader } from "./componentesHome/HomeHeader";

export function HomeScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.screenContainer}>
      <ScrollView style={styles.screenContainer}>
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
          {tiposContenidoAudiovisual.map((tipo) => (<AudioVisualScroll key={tipo.id} tipoId={tipo.id} />))}
        </View>
      </ScrollView>
    </SafeAreaView>
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
    paddingHorizontal: 10,
    paddingVertical: 10,

  },
  contenedorScroll: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 10,
    gap: 20
  }
});
