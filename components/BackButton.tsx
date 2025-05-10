import Colors from '@/constants/Colors';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { TextPressStart2P } from './TextPressStart2P';

interface PixdexButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
}

export function BackButton({ title, onPress, backgroundColor = Colors.purpura }: PixdexButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
      activeOpacity={0.5}>
      <TextPressStart2P style={styles.buttonText}>{title}</TextPressStart2P>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderWidth: 1,
    borderTopColor: Colors.purpuraClaro,
    borderLeftColor: Colors.purpuraClaro,
    borderBottomColor: Colors.purpuraOscuro,
    borderRightColor: Colors.purpuraOscuro,
  },
  buttonText: {
    fontSize: 12,
    color: Colors.blanco,
  },
});