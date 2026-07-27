import { useRouter } from "expo-router";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { Buttons } from "../../../../components/Buttons";

export default function DetailHeader() {
    const router = useRouter();
    const handleBack = () => {
        router.back();
    };

    return (
        <View style={styles.contenedorHeader}>
            <StatusBar backgroundColor="rgba(0,0,0,0.9)" barStyle="light-content" />
            <Buttons titulo=" Back" onPress={handleBack} />
        </View>
    )

}

const styles = StyleSheet.create({
    contenedorHeader: {
        width: "100%",
        alignItems: "flex-start",
        marginBottom: Platform.OS === "web" ? 16 : 8,
    }
});