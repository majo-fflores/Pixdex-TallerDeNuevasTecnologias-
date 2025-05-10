import Colors from '@/constants/Colors';
import { ContenidoAudiovisual } from "@/data/contenidosAudiovisuales";
import { generosContenidoAudiovisual, IGeneroContenidoAudiovisual } from "@/data/generosContenidoAudiovisual";
import { useRouter } from "expo-router";
import React from "react";
import { LayoutChangeEvent, Platform, StyleSheet, TouchableOpacity, useWindowDimensions, View } from "react-native";
import GeneroList from "../../../../components/GeneroList";
import Imagenes from '../../../../components/Imagenes';
import { TextPressStart2P } from "../../../../components/TextPressStart2P";

interface AudioVisualCardProps {
  itemCard: ContenidoAudiovisual;
  fixedHeight?:number;
  onMeasure?:(height:number)=>void;
}

export function AudioVisualCard({ itemCard, fixedHeight, onMeasure }: AudioVisualCardProps) {
  const { width: screenWidth } = useWindowDimensions();
  const widthFactor = Platform.OS === 'web' ? 0.2 : 0.5;
  const CARD_WIDTH = screenWidth * widthFactor;
  
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
      <View style={[styles.contenedor,{ width: CARD_WIDTH },fixedHeight != null? {minHeight: fixedHeight}: undefined]} onLayout={(e:LayoutChangeEvent) => {
        const{height} = e.nativeEvent.layout;
        if(onMeasure) onMeasure(height);
      }}>
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

// Styles
const styles = StyleSheet.create({
  contenedor: {
    borderWidth: 2,
    borderTopColor: Colors.purpuraOscuro,
    borderRightColor: Colors.purpuraOscuro,
    borderBottomColor: Colors.purpuraClaro,
    borderLeftColor: Colors.purpuraClaro,
  },
  tituloCard: {
    padding: 10,
    color: Colors.blanco,
    fontSize: 12,
  },
});
