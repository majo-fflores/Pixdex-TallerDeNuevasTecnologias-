import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Buttons } from "@/components/Buttons";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";

import { ROUTES } from "@/src/navigation/routes";

export function AhorcadoHomeHeader() {
  const router = useRouter();
  const handleBack = () => {
    router.replace(ROUTES.HOME);
  };
  return (
    <View style={styles.header}>
      <Buttons
        titulo="BACK"
        onPress={handleBack}
        backgroundColor={Colors.purpura}
        showIcon={true}
        iconName="arrow-back"
        textSize={14}
        padding={10}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: Platform.OS === "web" ? 20 : 5,
  },
}); 