import GeneroList from "@/components/GeneroList";
import Imagenes from "@/components/Imagenes";
import Tags from "@/components/Tags";
import { TextPressStart2P } from "@/components/TextPressStart2P";
import Colors from "@/constants/Colors";
import { ContenidoAudiovisual, contenidosAudiovisuales } from "@/data/contenidosAudiovisuales";
import { generosContenidoAudiovisual, IGeneroContenidoAudiovisual } from "@/data/generosContenidoAudiovisual";
import { ITipoContenidoAudiovisual, tiposContenidoAudiovisual } from "@/data/tiposContenidoAudiovisual";
import { Platform, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { DetailScreenProps } from "../DetailScreen";


export default function CardDetail({ audioVisualId }: DetailScreenProps) {
    const tipoAudioVisualId: ContenidoAudiovisual | undefined = contenidosAudiovisuales.find(
        (contenido) => contenido.id === Number(audioVisualId)
    );

    const tipo: ITipoContenidoAudiovisual | undefined = tiposContenidoAudiovisual.find(
        (tipoID) => tipoID.id === (tipoAudioVisualId ? tipoAudioVisualId.tipoId : undefined)
    );

    const contenidoInfo: ContenidoAudiovisual | undefined = contenidosAudiovisuales.find(
        (contenidoInfoID) => contenidoInfoID.id === Number(audioVisualId)
    );

    const generos = contenidoInfo?.generos.map((id) =>
        generosContenidoAudiovisual.find((g) => g.id === id)
    );

    const { width: screenWidth } = useWindowDimensions();
    const widthFactor = Platform.OS === 'web' ? 0.4 : 0.9;
    const CARD_WIDTH = screenWidth * widthFactor;
    
    return (
        <View style={[styles.contenedor, { width: CARD_WIDTH }]}>
            {contenidoInfo && <Imagenes url={contenidoInfo.imageUrl}/>}
            <TextPressStart2P style={styles.tituloCard}>
                {contenidoInfo?.nombre}
            </TextPressStart2P>
            <View style={styles.generosContenedor}>
                {tipo && <Tags texto={tipo.singular} />}
            </View>
            <View style={styles.contenedorDescripcion} >
                <Text style={styles.generoText} numberOfLines={4}>{contenidoInfo?.descripcion}</Text>
            </View>
            <View style={styles.contenedorGeneroEtiqueta}>
                <TextPressStart2P style={styles.etiquetaGenero}>
                    Generos
                </TextPressStart2P>
            </View>
            <GeneroList generos={generos?.filter((g): g is IGeneroContenidoAudiovisual => g !== undefined) || []}/>
        </View>
    )
}

let tituloSize = 36
    if (Platform.OS == "android") {
      tituloSize = 20
    }
    

// Styles
const styles = StyleSheet.create({
    contenedor: {
        borderWidth: 4,
        borderColor: Colors.grisOscuro,
        flex: 1,
        padding: 20
    },
    tituloCard: {
        padding: 10,
        color: Colors.purpura,
        fontSize: tituloSize
    },
    contenedorDescripcion: {
        paddingHorizontal: 15,
        paddingBottom: 15,
        paddingTop: 15
    },
    generosContenedor: {
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingBottom: 8,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 10
    },
    generoText: {
        color: Colors.blanco
    },
    etiquetaGenero: {
        fontSize: 14,
        color: Colors.verde,
        padding: 10,
    },
    contenedorGeneroEtiqueta: {
        paddingBottom: 10
    }
});
