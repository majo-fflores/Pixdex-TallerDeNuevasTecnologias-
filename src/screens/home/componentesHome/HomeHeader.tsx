import { Buttons } from '@/components/Buttons';
import Colors from '@/constants/Colors';
import { Platform, StyleSheet, View } from "react-native";
import { TextPressStart2P } from "../../../../components/TextPressStart2P";

interface HomeHeaderProps {
  onFilterPress: () => void;
}

export function HomeHeader({ onFilterPress }: HomeHeaderProps) {
  return (
    <View style={[styles.container]}>
      <TextPressStart2P style={styles.logo}>Pixdex</TextPressStart2P>
      <Buttons
        titulo="FILTRAR"
        onPress={onFilterPress}
        iconName="settings"
        iconSize={Platform.OS === "android" ? 20 : 24}
        textSize={Platform.OS === "android" ? 10 : 14}
        padding={5}
      />
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

//------------------
// Styles
//------------------
const styles = StyleSheet.create({
  container: {
    height: height,
    color: Colors.fondo,
    padding: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    color: Colors.purpura,
    fontSize: logoSize,
  },
});