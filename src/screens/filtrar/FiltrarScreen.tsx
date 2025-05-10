import Colors from '@/constants/Colors';
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { BackButton } from "../../../components/BackButton";
import { TextPressStart2P } from "../../../components/TextPressStart2P";

export default function FiltrarScreen() {
    const router = useRouter();
    const handleBack = () => {
        router.back();
    };

    return (
        <View style={[styles.container]}>
            <BackButton
                title=" Back"
                onPress={handleBack} />
            <TextPressStart2P style={styles.titulo}>FILTRADO DE AUDIOVISUAL</TextPressStart2P>
        </View>
    )
}

//------------------
// Styles
//------------------
const styles = StyleSheet.create({
    titulo: {
        color: Colors.purpuraOscuro,
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