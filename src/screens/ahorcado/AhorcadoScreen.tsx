import React, { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { View, StyleSheet, ScrollView, Platform } from "react-native";
import { useAudioVisual } from "@/src/context/ContextoAudioVisual";
import { useAuth } from "@/src/context/ContextoAuth";
import { guardarPuntaje } from "@/src/screens/ahorcado/puntuaciones/puntuaciones";
import { ROUTES } from "@/src/navigation/routes";
import { AhorcadoHeader } from "./componentesAhorcado/AhorcadoHeader";
import { AhorcadoImagen } from "./componentesAhorcado/AhorcadoImagen";
import { AhorcadoProgreso } from "./componentesAhorcado/AhorcadoProgreso";
import { ModalGuessTitle } from "./componentesAhorcado/ModalGuessTitle";
import { ModalGuessLetter } from "./componentesAhorcado/ModalGuessLetter";
import { AhorcadoFin } from "./componentesAhorcado/AhorcadoFin";
import { useRouter } from "expo-router";
import { Buttons } from "@/components/Buttons";
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextPressStart2P } from "@/components/TextPressStart2P";
import {
  calcularProgreso,
  letraEstaEnTitulo,
  titulosCoinciden,
  tituloLetrasAdivinadas,
} from "./utilidadesTitulo";

export function AhorcadoScreen() {
  const { contenidos } = useAudioVisual();
  const { user, obtenerNombreJugador } = useAuth();
  const router = useRouter();

  const [indice, setIndice] = useState(0);
  const [vidas, setVidas] = useState(5);
  const [letrasAdivinadas, setLetrasAdivinadas] = useState<string[]>([]);
  const [letrasUsadas, setLetrasUsadas] = useState<string[]>([]);
  const [mostrarModalTitulo, setMostrarModalTitulo] = useState(false);
  const [mostrarModalLetra, setMostrarModalLetra] = useState(false);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [inputTitulo, setInputTitulo] = useState("");
  const [puntaje, setPuntaje] = useState(0);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarError, setSnackbarError] = useState(false);

  const puntajeGuardadoRef = useRef(false);

  const finalizarYGuardar = useCallback(async (puntajeFinal: number) => {
    if (puntajeGuardadoRef.current || puntajeFinal <= 0 || !user) return;
    const nombre = obtenerNombreJugador();
    if (!nombre) return;
    puntajeGuardadoRef.current = true;
    await guardarPuntaje(user.id, nombre, puntajeFinal);
  }, [user, obtenerNombreJugador]);

  const contenidosAleatorios = useMemo(() => {
    const arr = [...contenidos];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [contenidos]);

  const contenidoActual = contenidosAleatorios[indice];

  const progreso = useMemo(() => {
    if (!contenidoActual) return [];
    return calcularProgreso(contenidoActual.nombre, letrasAdivinadas);
  }, [contenidoActual, letrasAdivinadas]);

  // Logica de adivinar titulo
  const handleGuessTitle = () => {
    if (!contenidoActual) return;
    if (titulosCoinciden(inputTitulo, contenidoActual.nombre)) {
      setPuntaje(p => p + 1);
      setSnackbar(true);
      setTimeout(() => setSnackbar(false), 2000);
      // Pasar al siguiente contenido si hay más
      if (indice < contenidosAleatorios.length - 1) {
        setIndice(i => i + 1);
        setLetrasAdivinadas([]);
        setLetrasUsadas([]);
        setInputTitulo("");
      } else {
        setLetrasAdivinadas([]);
        setLetrasUsadas([]);
      }
    } else {
      const nuevasVidas = vidas - 1;
      setVidas(nuevasVidas);
      setSnackbarError(true);
      setTimeout(() => setSnackbarError(false), 2000);
      if (nuevasVidas <= 0) setJuegoTerminado(true);
    }
    setMostrarModalTitulo(false);
    setInputTitulo("");
  };

  // Logica de adivinar letra
  const handleGuessLetter = (letra: string) => {
    if (!contenidoActual) return;
    const upper = letra.toUpperCase();
    if (letrasUsadas.includes(upper)) return;
    setLetrasUsadas(prev => [...prev, upper]);
    if (letraEstaEnTitulo(contenidoActual.nombre, upper)) {
      setLetrasAdivinadas(prev => [...prev, upper]);
      const todasAdivinadas = tituloLetrasAdivinadas(
        contenidoActual.nombre,
        [...letrasAdivinadas, upper]
      );
      if (todasAdivinadas) {
        setPuntaje(p => p + 1);
        setSnackbar(true);
        setTimeout(() => setSnackbar(false), 2000);
        if (indice < contenidosAleatorios.length - 1) {
          setIndice(i => i + 1);
          setLetrasAdivinadas([]);
          setLetrasUsadas([]);
        } else {
          setLetrasAdivinadas([]);
          setLetrasUsadas([]);
        }
      }
    } else {
      const nuevasVidas = vidas - 1;
      setVidas(nuevasVidas);
      setSnackbarError(true);
      setTimeout(() => setSnackbarError(false), 2000);
      if (nuevasVidas <= 0) setJuegoTerminado(true);
    }
    setMostrarModalLetra(false);
  };

  useEffect(() => {
    if (vidas <= 0) {
      setJuegoTerminado(true);
    }
  }, [vidas]);

  useEffect(() => {
    if (juegoTerminado) {
      finalizarYGuardar(puntaje);
    }
  }, [juegoTerminado, puntaje, finalizarYGuardar]);

  const handleExit = async () => {
    await finalizarYGuardar(puntaje);
    router.replace(ROUTES.AHORCADO_HOME);
  };

  const handleVolverLeaderboard = async () => {
    await finalizarYGuardar(puntaje);
    router.replace(ROUTES.AHORCADO_HOME);
  };

  if (!contenidoActual) return null;
  if (juegoTerminado) {
    return (
      <AhorcadoFin
        titulo={contenidoActual.nombre}
        onVolver={handleVolverLeaderboard}
        puntaje={puntaje}
      />
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles.screenContainer}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container} bounces={false}>
        <AhorcadoHeader
          vidas={vidas}
          puntaje={puntaje}
          nombreJugador={obtenerNombreJugador()}
          onExit={handleExit}
        />
        <View style={styles.cuadroGris}>
          <View style={styles.botonesRow}>
            <View style={styles.botonContainer}>
              <Buttons
                titulo="GUESS TITLE"
                onPress={() => setMostrarModalTitulo(true)}
                backgroundColor={Colors.purpura}
                showIcon={false}
                textSize={12}
                padding={10}
              />
            </View>
            <View style={styles.botonContainer}>
              <Buttons
                titulo="GUESS LETTER"
                onPress={() => setMostrarModalLetra(true)}
                backgroundColor={Colors.purpura}
                showIcon={false}
                textSize={12}
                padding={10}
              />
            </View>
          </View>
          <AhorcadoImagen url={contenidoActual.imageUrl} />
          <View style={styles.rayitasBox}>
            <AhorcadoProgreso progreso={progreso} />
          </View>
        </View>
        <ModalGuessTitle
          visible={mostrarModalTitulo}
          value={inputTitulo}
          onChange={setInputTitulo}
          onSubmit={handleGuessTitle}
          onClose={() => setMostrarModalTitulo(false)}
        />
        <ModalGuessLetter
          visible={mostrarModalLetra}
          letrasUsadas={letrasUsadas}
          onSelect={handleGuessLetter}
          onClose={() => setMostrarModalLetra(false)}
        />
      </ScrollView>
      {/* Snackbar de éxito */}
      {snackbar && (
        <View style={styles.snackbar}>
          <TextPressStart2P style={styles.snackbarText}>¡Correcto! +1 punto</TextPressStart2P>
        </View>
      )}
      {/* Snackbar de error */}
      {snackbarError && (
        <View style={styles.snackbar}>
          <TextPressStart2P style={styles.snackbarErrorText}>¡Incorrecto! -1 vidas</TextPressStart2P>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },
  snackbar: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 100,
  },
  snackbarText: {
    backgroundColor: Colors.grisOscuro,
    color: Colors.verde,
    fontSize: 18,
    borderWidth: 2,
    borderColor: Colors.verde,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
    textAlign: "center",
    textShadowRadius: 2,
  },
  snackbarErrorText: {
    backgroundColor: Colors.grisOscuro,
    color: Colors.rojo,
    fontSize: 18,
    borderWidth: 2,
    borderColor: Colors.rojo,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
    textAlign: "center",
    textShadowRadius: 2,
  },
  scroll: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },
  container: {
    minHeight: Platform.OS === "web" ? "100%" : undefined,
    padding: Platform.OS === "web" ? 40 : 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  cuadroGris: {
    width: "100%",
    maxWidth: Platform.OS === "web" ? 700 : 900,
    backgroundColor: Colors.fondo,
    borderWidth: 5,
    borderColor: Colors.grisOscuro,
    padding: Platform.OS === "web" ? 30 : 20,
    marginTop: Platform.OS === "web" ? 30 : 5,
    marginBottom: Platform.OS === "web" ? 30 : 5,
    alignItems: "center",
  },
  botonesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: Platform.OS === "web" ? 30 : 5,
    paddingHorizontal: 1,
  },
  botonContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  rayitasBox: {
    width: "100%",
    backgroundColor: Colors.grisOscuro,
    borderWidth: 2,
    borderColor: Colors.grisOscuro,
    padding: Platform.OS === "web" ? 20 : 10,
    marginTop: Platform.OS === "web" ? 30 : 10,
    alignItems: "center",
  },
});