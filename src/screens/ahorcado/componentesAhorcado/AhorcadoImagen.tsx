import React from "react";
import { View, StyleSheet } from "react-native";
import Imagenes from "@/components/Imagenes";

export function AhorcadoImagen({ url }: { url: string | number }) {
  return (
    <View style={styles.container}>
      <Imagenes url={url} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
  },
});
