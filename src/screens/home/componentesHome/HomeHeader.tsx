import { Buttons } from '@/components/Buttons';
import Colors from '@/constants/Colors';
import { Platform, StyleSheet, View } from "react-native";
import { TextPressStart2P } from "../../../../components/TextPressStart2P";

interface HomeHeaderProps {
  onFilterPress: () => void;
  onAuthPress: () => void;
  onLogoutPress: () => void;
  sesionIniciada: boolean;
}

export function HomeHeader({ onFilterPress, onAuthPress, onLogoutPress, sesionIniciada }: HomeHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <TextPressStart2P style={styles.logo}>Pixdex</TextPressStart2P>
      </View>
      <View style={styles.botonesContainer}>
        <Buttons
          titulo={sesionIniciada ? "CERRAR SESION" : "INICIAR SESION"}
          onPress={sesionIniciada ? onLogoutPress : onAuthPress}
          iconName="person"
          iconSize={Platform.OS === "android" ? 14 : 18}
          textSize={Platform.OS === "android" ? 7 : 9}
          padding={Platform.OS === "web" ? 8 : 6}
        />
        <Buttons
          titulo="FILTRAR"
          onPress={onFilterPress}
          iconName="settings"
          iconSize={Platform.OS === "android" ? 14 : 18}
          textSize={Platform.OS === "android" ? 7 : 9}
          padding={Platform.OS === "web" ? 8 : 6}
        />
      </View>
    </View>
  );
}

let height = 100;
if (Platform.OS == "android") {
  height = 75
}

let logoSize = 36;
if (Platform.OS == "android") {
  logoSize = 24
}

const styles = StyleSheet.create({
  container: {
    minHeight: height,
    color: Colors.fondo,
    padding: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  logoContainer: {
    flexShrink: 1,
    marginRight: 8,
  },
  logo: {
    color: Colors.purpura,
    fontSize: logoSize,
  },
  botonesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
    gap: 8,
  },
});
