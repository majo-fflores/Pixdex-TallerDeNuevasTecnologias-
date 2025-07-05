import { useAudioVisual } from "@/src/context/ContextoAudioVisual";
import DetailScreen from "@/src/screens/detail/DetailScreen";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Snackbar } from "react-native-paper";

type DetailRouteParams = {
    audioVisualId: string;
};

export default function DetailRoute() {
    const { audioVisualId } = useLocalSearchParams<DetailRouteParams>();
    const { getContenidoId } = useAudioVisual();
    const [showError, setShowError] = useState(false);
    const contenido = audioVisualId ? getContenidoId(parseInt(audioVisualId)) : undefined;

    useEffect(() => {
        if (!contenido) {
            setShowError(true);
        }
    }, [contenido]);

    if (!contenido) {
        return (
            <Snackbar
                visible={showError}
                onDismiss={() => setShowError(false)}
                duration={3000}
                style={{ backgroundColor: 'red' }}>
                No se encontro el contenido.
            </Snackbar>
        );
    }

    return <DetailScreen audioVisualId={audioVisualId} />;
}
