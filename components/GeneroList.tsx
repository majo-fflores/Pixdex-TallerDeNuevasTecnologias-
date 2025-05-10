import { IGeneroContenidoAudiovisual } from "@/data/generosContenidoAudiovisual";
import { StyleSheet, View } from "react-native";
import Tags from "./Tags";

interface GeneroListProps {
    generos: IGeneroContenidoAudiovisual[]
}


export default function GeneroList({ generos }: GeneroListProps) {
    return (
        generos.length > 0 && (
            <View style={styles.container}>
                {generos.map((genero, index) => (
                    <Tags key={index} texto={genero.nombre} />
                ))}
            </View>
        )
    );
}



// Styles
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: 10,
        paddingBottom: 8,
        gap: 10,
        alignItems: "center"
    }
});