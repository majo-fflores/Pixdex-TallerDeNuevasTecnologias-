import Colors from '@/constants/Colors';
import { Image } from "expo-image";
import { Dimensions, StyleSheet } from "react-native";


interface ImagenProps {
    url: string
}

export default function Imagen({ url }: ImagenProps) {
    return (
        <Image
            style={styles.stylesImage}
            source={{ uri: url }}
            contentFit="cover"
            cachePolicy="disk"
            transition={300}
        />
    )
}

const WIDTH = Dimensions.get("window").width * 0.2;
const HEIGTH = WIDTH * 1.5;

// Styles
const styles = StyleSheet.create({
    stylesImage: {
        width: "100%",
        height: HEIGTH,
        backgroundColor: Colors.grisOscuro,
    },
});