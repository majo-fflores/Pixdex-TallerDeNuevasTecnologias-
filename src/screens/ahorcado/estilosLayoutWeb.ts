import { Platform, ViewStyle } from "react-native";

/** Ancho máximo compartido en web para pantallas del ahorcado */
export const ANCHO_MAX_AHORCADO_WEB = 560;

export const contenedorAhorcadoWeb: ViewStyle =
  Platform.OS === "web"
    ? { width: "100%", maxWidth: ANCHO_MAX_AHORCADO_WEB, alignSelf: "center" }
    : { width: "100%" };
