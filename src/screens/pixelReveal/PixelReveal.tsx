import Colors from '@/constants/Colors';
import { ROUTES } from "@/src/navigation/routes";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Buttons } from "../../../components/Buttons";
import { TextPressStart2P } from "../../../components/TextPressStart2P";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PixelRevealScreen() {
    const router = useRouter();
    const handleBack = () => {
        router.push(ROUTES.HOME);
    };

    return (
        <SafeAreaView edges={['top']} style={styles.screenContainer}>
        <View style={[styles.container]}>

            <View style={styles.contenedorHeader}>
                <Buttons titulo=" Back" onPress={handleBack} />
            </View>
            
            <View style={[styles.containerTitulo]}>
                <TextPressStart2P style={styles.titulo}>EL JUEGO DE PIXEL REVEAL</TextPressStart2P>
            </View>
        </View>
        </SafeAreaView>
    )
}

//------------------
// Styles
//------------------
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: Colors.fondo,
    },
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