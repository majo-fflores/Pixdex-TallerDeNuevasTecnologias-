import { useRouter } from "expo-router";
import { StatusBar, StyleSheet, View } from "react-native";
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

// Styles
const styles = StyleSheet.create({
    contenedorHeader: {
        paddingBottom: 20,
        alignItems: "flex-start",
    }
});