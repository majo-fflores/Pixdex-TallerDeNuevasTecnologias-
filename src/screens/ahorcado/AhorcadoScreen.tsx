import Colors from '@/constants/Colors';
import { ROUTES } from "@/src/navigation/routes";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Buttons } from "../../../components/Buttons";
import { TextPressStart2P } from "../../../components/TextPressStart2P";

export default function PixelRevealScreen() {
    const router = useRouter();
    const handleBack = () => {
        router.push(ROUTES.HOME);
    };
//FILTRADO DE AUDIOVISUAL
    return (
        <View style={[styles.container]}>

            <View style={styles.contenedorHeader}>
                <Buttons titulo=" Back" onPress={handleBack} />
            </View>
            
            <View style={[styles.containerTitulo]}>
                <TextPressStart2P style={styles.titulo}>EL JUEGO DEL AHORCADO</TextPressStart2P>
            </View>
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
        textAlign: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: Colors.fondo,
        padding: 20,
        flexDirection: 'column',
    },
    contenedorHeader: {
        alignItems: "flex-start",
    },
    containerTitulo: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flex:1
    },
});