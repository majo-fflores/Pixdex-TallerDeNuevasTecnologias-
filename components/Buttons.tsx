import Colors from '@/constants/Colors';
import { MaterialIcons } from "@expo/vector-icons";
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextPressStart2P } from './TextPressStart2P';

interface ButtonsProps {
  titulo: string;
  onPress: () => void;
  backgroundColor?: string;
  // Props para el icono
  showIcon?: boolean;
  iconName?: keyof typeof MaterialIcons.glyphMap; //busca la coincidencia de nombre de entre los icons
  iconSize?: number;
  iconColor?: string;
  // Props para el texto
  textColor?: string;
  textSize?: number;
  // Props para el boton
  padding?: number;
  borderWidth?: number;
  borderTopColor?: string;
  borderLeftColor?: string;
  borderBottomColor?: string;
  borderRightColor?: string;
}

export function Buttons({
  titulo,
  onPress,
  backgroundColor = Colors.purpura,
  showIcon = true,
  iconName = 'arrow-back',
  iconSize = 16,
  iconColor = Colors.blanco,
  textColor = Colors.blanco,
  textSize = 12,
  padding = 15,
  borderWidth = 1,
  borderTopColor = Colors.purpuraClaro,
  borderLeftColor = Colors.purpuraClaro,
  borderBottomColor = Colors.purpuraOscuro,
  borderRightColor = Colors.purpuraOscuro,
}: ButtonsProps) {

  const buttonStyles = [
    styles.button,
    {
      backgroundColor,
      padding,
      borderWidth,
      borderTopColor,
      borderLeftColor,
      borderBottomColor,
      borderRightColor,
    }
  ];

  const textStyles = [styles.buttonText, { color: textColor, fontSize: textSize, }];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.buttonContent}>
        {showIcon && (<MaterialIcons name={iconName} size={iconSize} color={iconColor} style={styles.icon} />)}
        <TextPressStart2P style={textStyles}> {titulo} </TextPressStart2P>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderStyle: 'solid',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
  },
  icon: {
    marginRight: 8,
  },
});