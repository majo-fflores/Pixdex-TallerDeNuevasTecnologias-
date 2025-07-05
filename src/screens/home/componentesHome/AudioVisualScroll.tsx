import Colors from '@/constants/Colors';
import { IContenidoAudiovisual } from "@/data/contenidosAudiovisuales";
import { useAudioVisual } from '@/src/context/ContextoAudioVisual';
import React, { useState } from "react";
import { FlatList, Platform, StyleSheet, View } from "react-native";
import { TextPressStart2P } from "../../../../components/TextPressStart2P";
import { AudioVisualCard } from "./AudioVisualCard";

interface AudioVisualScrollProps {
    tipoId: number;
    filteredContent?: IContenidoAudiovisual[]; 
}

export function AudioVisualScroll({ tipoId, filteredContent }: AudioVisualScrollProps) {
    
    //uso el contesto para obtener la info del tipo
    const { getTipoId, getContenidosTipo} = useAudioVisual();
    
    const tipo = getTipoId(tipoId);

    // Usar contenido filtrado si se proporciona, sino usar el filtro original
    const contenido: IContenidoAudiovisual[] = filteredContent || getContenidosTipo(tipoId);

    const [maxCardHeight, setMaxCardHeight] = useState(0);

    const handleMeasure = (height: number) => {
        if (height > maxCardHeight) setMaxCardHeight(height);
    };

    // No renderizar si no hay contenido
    if (contenido.length === 0) {
        return (
            <View style={styles.contenedor}>
                <View style={styles.contenedorTitulo}>
                    <TextPressStart2P style={styles.titulo}>{tipo?.plural.toUpperCase()}</TextPressStart2P>
                </View>
                <View style={{ padding: 20 }}>
                    <TextPressStart2P style={{ color: Colors.blanco, textAlign: 'center' }}>
                        Sin resultados para los filtros elegidos
                    </TextPressStart2P>
                </View>
            </View>
        );
    }

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