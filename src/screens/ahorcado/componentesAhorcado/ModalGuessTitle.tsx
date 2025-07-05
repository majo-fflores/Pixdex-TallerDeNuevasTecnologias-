import React from "react";
import { Modal, View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { TextPressStart2P } from "@/components/TextPressStart2P";
import { Buttons } from "@/components/Buttons";
import Colors from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

export function ModalGuessTitle({
  visible,
  value,
  onChange,
  onSubmit,
  onClose,
}: {
  visible: boolean;
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <TextPressStart2P style={styles.title}>Guess the Title</TextPressStart2P>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color={Colors.blanco} />
            </TouchableOpacity>
          </View>
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder="Enter complete title"
            style={styles.input}
            autoFocus
          />
          <Buttons
            titulo="SUBMIT GUESS"
            onPress={onSubmit}
            backgroundColor={Colors.purpura}
            showIcon={false}
            textSize={14}
          />
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
    borderColor: Colors.purpuraClaro,
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
  input: {
    backgroundColor: Colors.blanco,
    color: Colors.fondo,
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
}); 