import { TextPressStart2P } from '@/components/TextPressStart2P';
import Colors from '@/constants/Colors';
import React from 'react';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';
import { IPuntuacion } from './puntuaciones';

interface TopPlayersListProps {
  puntuaciones: IPuntuacion[];
  cargando: boolean;
}

export function TopPlayersList({ puntuaciones, cargando }: TopPlayersListProps) {
  return (
    <View style={styles.contenedor}>
      <TextPressStart2P style={styles.titulo}>Top Players</TextPressStart2P>

      <View style={styles.lista}>
        {cargando ? (
          <ActivityIndicator color={Colors.purpuraClaro} style={styles.loader} />
        ) : puntuaciones.length === 0 ? (
          <TextPressStart2P style={styles.vacio}>
            Aun no hay puntuaciones
          </TextPressStart2P>
        ) : (
          puntuaciones.map((item, index) => (
            <View key={item.id} style={styles.fila}>
              <TextPressStart2P style={styles.nombre} numberOfLines={1}>
                {index + 1}. {item.nombre_jugador}
              </TextPressStart2P>
              <TextPressStart2P style={styles.puntaje}>{item.puntaje}</TextPressStart2P>
            </View>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    width: '100%',
    marginTop: Platform.OS === 'web' ? 24 : 16,
  },
  titulo: {
    color: Colors.verde,
    fontSize: Platform.OS === 'web' ? 18 : 14,
    marginBottom: Platform.OS === 'web' ? 16 : 10,
    textAlign: 'center',
  },
  lista: {
    borderWidth: 2,
    borderColor: Colors.grisOscuro,
    backgroundColor: Colors.fondo,
    padding: Platform.OS === 'web' ? 20 : 12,
    gap: Platform.OS === 'web' ? 12 : 8,
    minHeight: 120,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  nombre: {
    color: Colors.blanco,
    fontSize: Platform.OS === 'web' ? 12 : 10,
    flex: 1,
  },
  puntaje: {
    color: Colors.verde,
    fontSize: Platform.OS === 'web' ? 12 : 10,
  },
  vacio: {
    color: Colors.grisClaro,
    fontSize: Platform.OS === 'web' ? 10 : 8,
    textAlign: 'center',
    paddingVertical: 20,
  },
  loader: {
    paddingVertical: 30,
  },
});
