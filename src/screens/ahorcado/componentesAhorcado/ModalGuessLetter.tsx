import React from "react";
import { Modal, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { TextPressStart2P } from "@/components/TextPressStart2P";
import Colors from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

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
                <TouchableOpacity
                  key={letra}
                  style={[
                    styles.letterButton,
                    usada && styles.letterButtonDisabled,
                  ]}
                  onPress={() => !usada && onSelect(letra)}
                  disabled={usada}
                >
                  <TextPressStart2P style={[
                    styles.letterText,
                    usada && styles.letterTextDisabled,
                  ]}>
                    {letra}
                  </TextPressStart2P>
                </TouchableOpacity>
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
  letterButton: {
    backgroundColor: Colors.purpura,
    margin: 4,
    padding: 10,
    minWidth: 36,
    alignItems: "center",
  },
  letterButtonDisabled: {
    backgroundColor: Colors.grisOscuro,
  },
  letterText: {
    color: Colors.blanco,
    fontSize: 16,
  },
  letterTextDisabled: {
    color: Colors.grisOscuro,
  },
}); 