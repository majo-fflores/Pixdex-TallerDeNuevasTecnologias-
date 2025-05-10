import Colors from '@/constants/Colors';
import { Image } from "expo-image";
import { StyleSheet } from "react-native";


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

// Styles
const styles = StyleSheet.create({
    stylesImage: {
        width: "100%",
        aspectRatio: 2 / 3,
        backgroundColor: Colors.grisOscuro,
    },
});