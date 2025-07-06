import React from "react";
import { Modal, View, StyleSheet, TouchableOpacity } from "react-native";
import { TextPressStart2P } from "@/components/TextPressStart2P";
import Colors from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Buttons } from "@/components/Buttons";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function ModalGuessLetter({
  visible,
  letrasUsadas,
  onSelect,
  onClose,
}: {
  visible: boolean;
  letrasUsadas: string[];
  onSelect: (letra: string) => void;
  onClose: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <TextPressStart2P style={styles.title}>Guess a Letter</TextPressStart2P>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color={Colors.blanco} />
            </TouchableOpacity>
          </View>
          <View style={styles.lettersGrid}>
            {ALPHABET.map((letra) => {
              const usada = letrasUsadas.includes(letra);
              return (
                <Buttons
                  key={letra}
                  titulo={letra}
                  onPress={() => !usada && onSelect(letra)}
                  backgroundColor={usada ? Colors.grisOscuro : Colors.purpura}
                  textColor={usada ? Colors.grisClaro : Colors.blanco}
                  textSize={16}
                  showIcon={false}
                  padding={10}
                  borderWidth={2}
                  borderTopColor={usada ? Colors.grisOscuro : Colors.purpuraClaro}
                  borderLeftColor={usada ? Colors.grisOscuro : Colors.purpuraClaro}
                  borderBottomColor={usada ? Colors.grisOscuro : Colors.purpuraOscuro}
                  borderRightColor={usada ? Colors.grisOscuro : Colors.purpuraOscuro}
                />
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: Colors.fondo,
    borderWidth: 2,
    borderColor: Colors.grisOscuro,
    width: "90%",
    maxWidth: 400,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    color: Colors.blanco,
    fontSize: 18,
  },
  closeButton: {
    padding: 5,
  },
  lettersGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
});