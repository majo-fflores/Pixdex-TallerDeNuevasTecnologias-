import Colors from '@/constants/Colors';
import { Image } from "expo-image";
import { StyleSheet } from "react-native";


interface ImagenProps {
    url: string | number;
}

export default function Imagen({ url }: ImagenProps) {
    const source = typeof url === 'number' ? url : { uri: url };

    return (
        <Image
            style={styles.stylesImage}
            source={source}
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