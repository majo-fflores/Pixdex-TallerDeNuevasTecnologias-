import Colors from '@/constants/Colors';
import { IContenidoAudiovisual, contenidosAudiovisuales } from "@/data/contenidosAudiovisuales";
import { ITipoContenidoAudiovisual, tiposContenidoAudiovisual } from "@/data/tiposContenidoAudiovisual";
import React, { useState } from "react";
import { FlatList, Platform, StyleSheet, View } from "react-native";
import { TextPressStart2P } from "../../../../components/TextPressStart2P";
import { AudioVisualCard } from "./AudioVisualCard";

interface AudioVisualScrollProps {
    tipoId: number,
}

export function AudioVisualScroll({ tipoId }: AudioVisualScrollProps) {
    const tipo: ITipoContenidoAudiovisual | undefined = tiposContenidoAudiovisual.find(
        (tipoID) => tipoID.id === tipoId
    );

    const contenido: IContenidoAudiovisual[] = contenidosAudiovisuales.filter(
        (contenidoID) => contenidoID.tipoId === tipo?.id
    );

    const [maxCardHeight, setMaxCardHeight] = useState(0);

    const handleMeasure = (height: number) => {
        if (height > maxCardHeight) setMaxCardHeight(height);
    };

    return (
        <View style={styles.contenedor}>
            <View style={styles.contenedorTitulo}>
                <TextPressStart2P style={styles.titulo}>{tipo?.plural.toUpperCase()}</TextPressStart2P>
            </View>
            <FlatList
                data={contenido}
                horizontal
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <AudioVisualCard itemCard={item} onMeasure={handleMeasure}
                        fixedHeight={maxCardHeight || undefined}/>}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listaStyle}
            />
        </View>
    )
}

let tituloSize = 12;
if (Platform.OS == "android") {
    tituloSize = 10
}

// Styles
const styles = StyleSheet.create({
    contenedor: {
        borderWidth: 4,
        borderColor: Colors.grisOscuro,
        flex: 1,
        padding: 20
    },
    titulo: {
        fontSize: tituloSize,
        color: Colors.blanco
    },
    contenedorTitulo: {
        borderWidth: 2,
        borderColor: Colors.purpuraClaro,
        backgroundColor: Colors.purpura,
        paddingHorizontal: 10,
        paddingVertical: 5,
        position: "absolute",
        zIndex: 1,
        top: -15,
        left: 15
    },
    listaStyle: {
        gap: 10
    }
});
