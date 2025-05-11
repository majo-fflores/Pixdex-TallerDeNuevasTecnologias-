import Colors from '@/constants/Colors';
import React from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import CardDetail from "./componentesDetail/CardDetail";
import HeaderDetail from "./componentesDetail/HeaderDetail";

export interface DetailScreenProps {
    audioVisualId: string
}

export default function DetailScreen({ audioVisualId }: DetailScreenProps) {

    return (
        <ScrollView style={styles.contenedorPrincipal}>
            <View style={styles.contenedorHeader}>
                <HeaderDetail />
            </View>
            {
                Platform.OS === "web" ? ( //CAMBIAR ESTO
                    <View style={{ alignSelf: "center" }}>
                        <CardDetail audioVisualId={audioVisualId} />
                    </View>
                ) : (
                    <CardDetail audioVisualId={audioVisualId} />
                )
            }
        </ScrollView>
    )
}

// Styles
const styles = StyleSheet.create({
    contenedorPrincipal: {
        backgroundColor: Colors.fondo,
        flex: 1,
        padding: 20,
        paddingVertical:10
    },
    contenedorHeader: {
        alignItems: "flex-start",
    }
});