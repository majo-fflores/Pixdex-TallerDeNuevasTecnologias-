import Colors from '@/constants/Colors';
import { Href, useRouter } from "expo-router";
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextPressStart2P } from '../../../../components/TextPressStart2P';

interface GameButtonProps {
  title: string;
  description: string;
  background: string;
  url: Href
}

export function GameButton({ title, description, background, url }: GameButtonProps) {
  const router = useRouter();
  const handlePress = () => {
    router.push(url)
  }

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: background }]} onPress={handlePress}>
      <View style={styles.contentContainer}>
        <TextPressStart2P style={styles.title}>{title}</TextPressStart2P>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.playButtonContainer}>
        <TextPressStart2P style={styles.playText}>Jugar</TextPressStart2P>
      </View>
    </TouchableOpacity>
  );
}

let tituloSize = 36;
if (Platform.OS == "android") {
  tituloSize = 14
}

let descriptionSize = 20;
if (Platform.OS == "android") {
  descriptionSize = 12
}

let playTextSize = 12;
if (Platform.OS == "android") {
  playTextSize = 10
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 4,
    borderColor: Colors.purpuraOscuro,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    marginBottom: 10,
  },
  title: {
    fontSize: tituloSize,
    color: Colors.blanco,
    marginBottom: 5,
  },
  description: {
    fontSize: descriptionSize,
    color: Colors.blanco,
    marginVertical: 5,
  },
  playButtonContainer: {
    alignItems: 'flex-end',
  },
  playText: {
    fontSize: playTextSize,
    color: Colors.blanco,
  },
});
