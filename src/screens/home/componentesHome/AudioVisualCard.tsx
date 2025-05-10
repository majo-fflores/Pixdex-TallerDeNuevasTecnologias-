import Colors from '@/constants/Colors';
import { ContenidoAudiovisual } from "@/data/contenidosAudiovisuales";
import { generosContenidoAudiovisual, IGeneroContenidoAudiovisual } from "@/data/generosContenidoAudiovisual";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import GeneroList from "../../../../components/GeneroList";
import Imagenes from '../../../../components/Imagenes';
import { TextPressStart2P } from "../../../../components/TextPressStart2P";

interface AudioVisualCardProps {
  itemCard: ContenidoAudiovisual;
}

export function AudioVisualCard({ itemCard }: AudioVisualCardProps) {
  const router = useRouter();
  const handlePress = () => {
    router.push({
      pathname: "/detail/[audioVisualId]",
      params: { audioVisualId: itemCard.id.toString() }
    });
  }

  const generos = itemCard.generos.map((id) =>
    generosContenidoAudiovisual.find((genero) => genero.id === id)
  );

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={handlePress}>
      <View style={styles.contenedor}>
        {itemCard && <Imagenes url={itemCard.imageUrl} />}
        <View>
          <TextPressStart2P style={styles.tituloCard}>
            {itemCard.nombre}
          </TextPressStart2P>
        </View>
        <GeneroList generos={generos?.filter((g): g is IGeneroContenidoAudiovisual => g !== undefined) || []} />
      </View>
    </TouchableOpacity>
  );
}

const WIDTH = Dimensions.get("window").width * 0.2;

// Styles
const styles = StyleSheet.create({
  contenedor: {
    borderWidth: 2,
    borderTopColor: Colors.purpuraOscuro,
    borderRightColor: Colors.purpuraOscuro,
    borderBottomColor: Colors.purpuraClaro,
    borderLeftColor: Colors.purpuraClaro,
    width: WIDTH,
  },
  tituloCard: {
    padding: 10,
    color: Colors.blanco,
    fontSize: 12,
  },
});
