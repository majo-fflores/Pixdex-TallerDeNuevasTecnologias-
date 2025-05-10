import Colors from '@/constants/Colors';
import { StyleSheet, Text, View } from "react-native";

interface TagsProps {
    texto: string
}

function mayusculas(texto: string): string {
    return texto.length === 0
        ? ""
        : texto[0].toUpperCase() + texto.slice(1).toLowerCase();
}

export default function Tags({ texto }: TagsProps) {
    return (
        <View style={styles.genero}>
            <Text style={styles.generoText}>{mayusculas(texto)}</Text>
        </View>
    )
}

// Styles
const styles = StyleSheet.create({
    genero: {
        backgroundColor: Colors.grisOscuro,
        padding: 4
    },
    generoText: {
        color: Colors.blanco
    }
});
