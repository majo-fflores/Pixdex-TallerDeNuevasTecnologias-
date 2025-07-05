import React from "react";
import { View, StyleSheet } from "react-native";
import Imagenes from "@/components/Imagenes";

export function AhorcadoImagen({ url }: { url: string }) {
  return (
    <View style={styles.container}>
      <Imagenes url={url} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
}); 