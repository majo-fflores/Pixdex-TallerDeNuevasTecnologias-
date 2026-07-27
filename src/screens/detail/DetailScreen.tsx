import Colors from '@/constants/Colors';
import React from "react";
import { Platform, ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import CardDetail from "./componentesDetail/CardDetail";
import HeaderDetail from "./componentesDetail/HeaderDetail";

export interface DetailScreenProps {
    audioVisualId: string
}

export default function DetailScreen({ audioVisualId }: DetailScreenProps) {
    const { width: screenWidth } = useWindowDimensions();
    const anchoTarjeta = screenWidth * (Platform.OS === 'web' ? 0.4 : 0.9);

    return (
        <SafeAreaView edges={['top']} style={styles.safeArea}>
            <ScrollView style={styles.contenedorPrincipal} contentContainerStyle={styles.contenido}>
                <View style={[styles.contenedorColumna, { width: anchoTarjeta }]}>
                    <HeaderDetail />
                    <CardDetail audioVisualId={audioVisualId} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.fondo,
    },
    contenedorPrincipal: {
        backgroundColor: Colors.fondo,
        flex: 1,
    },
    contenido: {
        padding: 20,
        paddingTop: Platform.OS === 'web' ? 10 : 4,
        paddingBottom: 20,
        alignItems: "center",
    },
    contenedorColumna: {
        alignSelf: "center",
    },
});
