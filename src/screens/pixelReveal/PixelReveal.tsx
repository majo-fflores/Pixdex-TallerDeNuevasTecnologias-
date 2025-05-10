import Colors from '@/constants/Colors';
import { ROUTES } from "@/src/navigation/routes";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { BackButton } from "../../../components/BackButton";
import { TextPressStart2P } from "../../../components/TextPressStart2P";

export default function PixelRevealScreen() {
    const router = useRouter();
    const handleBack = () => {
        router.push(ROUTES.HOME);
    };

    return (
        <View style={[styles.container]}>
            <BackButton
                title=" Back"
                onPress={handleBack} />
            <TextPressStart2P style={styles.titulo}>EL JUEGO DE PIXEL REVEAL</TextPressStart2P>
        </View>
    )
}

//------------------
// Styles
//------------------
const styles = StyleSheet.create({
    titulo: {
        color: Colors.verde,
        fontSize: 24,
    },
    container: {
        height: 100,
        color: Colors.fondo,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});