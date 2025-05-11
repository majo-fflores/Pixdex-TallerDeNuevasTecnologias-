import Colors from '@/constants/Colors';
import { ROUTES } from "@/src/navigation/routes";
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { TextPressStart2P } from "../../../../components/TextPressStart2P";


export function HomeHeader() {
  const handleNavigateToFiltrar = () => {
    router.push(ROUTES.FILTRAR);
  };

  return (
    <View style={[styles.container]}>
      <TextPressStart2P style={styles.logo}>Pixdex</TextPressStart2P>
      <TouchableOpacity style={styles.boton} onPress={handleNavigateToFiltrar}>
        <View style={styles.botonContenido}>
          <Feather name="settings" size={iconsSize} color="white" style={{ marginRight: 5, marginBlockEnd:10,  margin: 5 }} />
          <TextPressStart2P style={styles.botonTexto}>FILTRAR</TextPressStart2P>
        </View>
      </TouchableOpacity>
    </View>
  );
}

let height = 100;
if (Platform.OS == "android") {
  height = 75
}

let iconsSize = 15;
if (Platform.OS == "android") {
  iconsSize = 10
}

let logoSize = 36;
if (Platform.OS == "android") {
  logoSize = 24
}

let botonSize = 14;
if (Platform.OS == "android") {
  botonSize = 10
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
  boton: {
    backgroundColor: Colors.purpura,
    padding: 5,
    borderWidth: 1,
    borderTopColor: Colors.purpuraClaro,
    borderLeftColor: Colors.purpuraClaro,
    borderBottomColor: Colors.purpuraOscuro,
    borderRightColor: Colors.purpuraOscuro,
    borderStyle: 'solid',
  },
  botonContenido: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botonTexto: {
    color: Colors.blanco,
    fontSize: botonSize,
    padding: 5,
  }
});
