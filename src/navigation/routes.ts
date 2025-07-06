import { Href } from "expo-router";

export const ROUTES: Record<string, Href> = {
    HOME: "/",
    DETAIL: "/detail/",
    AHORCADO_HOME: "/ahorcadoHome", // Ruta para AhorcadoHomeScreen
    AHORCADO_GAME: "/ahorcado" as Href, // Ruta para AhorcadoScreen
    PIXEL_REVEAL: "/pixelReveal",
}