import React, { useMemo, useState } from "react";
import { View, StyleSheet, ScrollView, Platform, Dimensions } from "react-native";
import { useAudioVisual } from "@/src/context/ContextoAudioVisual";
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

export function AhorcadoScreen() {
  const { contenidos } = useAudioVisual();
    const router = useRouter();

  // Barajar contenidos solo una vez
  const contenidosAleatorios = useMemo(() => {
    const arr = [...contenidos];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [contenidos]);

  const contenidoActual = contenidosAleatorios[0];

  // Estados principales
  const [vidas, setVidas] = useState(5);
  const [letrasAdivinadas, setLetrasAdivinadas] = useState<string[]>([]);
  const [letrasUsadas, setLetrasUsadas] = useState<string[]>([]);
  const [mostrarModalTitulo, setMostrarModalTitulo] = useState(false);
  const [mostrarModalLetra, setMostrarModalLetra] = useState(false);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [inputTitulo, setInputTitulo] = useState("");
  const [gano, setGano] = useState(false);

  // Funcion para limpiar el input y abrir el modal
  const handleAbrirModalTitulo = () => {
    setInputTitulo("");
    setMostrarModalTitulo(true);
  };

  // Progreso: array de letras y guiones bajos
  const progreso = useMemo(() => {
    if (!contenidoActual) return [];
    return contenidoActual.nombre.split("").map(letra =>
      letra === " " || letrasAdivinadas.includes(letra.toUpperCase())
        ? letra
        : "_"
    );
  }, [contenidoActual, letrasAdivinadas]);

  //si adivina todo
  const adivinoTodo = useMemo(() => {
    if (!contenidoActual) return false;
    return contenidoActual.nombre
      .toUpperCase()
      .split("")
      .every(l => l === " " || letrasAdivinadas.includes(l));
  }, [contenidoActual, letrasAdivinadas]);

  // Logica de adivinar título
  const handleGuessTitle = () => {
    if (!contenidoActual) return;
    if (inputTitulo.trim().toLowerCase() === contenidoActual.nombre.trim().toLowerCase()) {
      setGano(true);
      setJuegoTerminado(true);
    } else {
      const nuevasVidas = vidas - 1;
      setVidas(nuevasVidas);
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
    if (contenidoActual.nombre.toUpperCase().includes(upper)) {
      setLetrasAdivinadas(prev => [...prev, upper]);
      // Si ya adivino todo, termina el juego
      const todasAdivinadas = contenidoActual.nombre
        .toUpperCase()
        .split("")
        .every(l => l === " " || [...letrasAdivinadas, upper].includes(l));
      if (todasAdivinadas) {
        setGano(true);
        setJuegoTerminado(true);
      }
    } else {
      const nuevasVidas = vidas - 1;
      setVidas(nuevasVidas);
      if (nuevasVidas <= 0) setJuegoTerminado(true);
    }
    setMostrarModalLetra(false);
  };

  const handleExit = () => {
    router.back(); // O la ruta de tu home
  };

  const handleVolverHome = () => {
    router.replace("/"); // O la ruta de tu home
  };

  if (!contenidoActual) return null;
  if (juegoTerminado) {
    return (
      <AhorcadoFin
        gano={gano}
        titulo={contenidoActual.nombre}
        onVolver={handleVolverHome}
      />
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles.screenContainer}>
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container} bounces={false}>
      <AhorcadoHeader vidas={vidas} onExit={handleExit} />
      <View style={styles.cuadroGris}>
        <View style={styles.botonesRow}>
          <Buttons
            titulo="GUESS TITLE"
            onPress={handleAbrirModalTitulo}
            backgroundColor={Colors.purpura}
            showIcon={false}
            textSize={12}
            padding={10}
          />
          <Buttons
            titulo="GUESS LETTER"
            onPress={() => setMostrarModalLetra(true)}
            backgroundColor={Colors.purpura}
            showIcon={false}
            textSize={12}
            padding={10}
          />
            </View>
        <AhorcadoImagen url={String(contenidoActual.imageUrl)} />
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: Colors.fondo,
    },
  scroll: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },
  container: {
    minHeight: Platform.OS === "web" ? "100%" : undefined,
    padding: Platform.OS === "web" ? 40 : 15,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  cuadroGris: {
    width: "100%",
    maxWidth: Platform.OS === "web" ? 700 : 600,
    backgroundColor: Colors.fondo,
    borderWidth: 5,
    borderColor: Colors.grisOscuro,
    padding: Platform.OS === "web" ? 30 : 10,
    marginTop: Platform.OS === "web" ? 30 : 10,
    marginBottom: Platform.OS === "web" ? 30 : 5,
    alignItems: "center",
  },
  botonesRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: Platform.OS === "web" ? 30 : 10,
    marginBottom: Platform.OS === "web" ? 30 : 10,
  },
  rayitasBox: {
    width: "100%",
    backgroundColor: Colors.grisOscuro,
    borderWidth: 2,
    borderColor: Colors.grisOscuro,
    padding: Platform.OS === "web" ? 20 : 10,
    marginTop: Platform.OS === "web" ? 30 : 20,
    alignItems: "center",
    },
});