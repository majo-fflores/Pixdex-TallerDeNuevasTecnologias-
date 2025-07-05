import Colors from '@/constants/Colors';
import { useAudioVisual } from '@/src/context/ContextoAudioVisual';
import { ROUTES } from "@/src/navigation/routes";
import React, { useMemo, useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { FilterModal, FilterOptions } from "./componentesHome/FilterModal";
import { AudioVisualScroll } from "./componentesHome/AudioVisualScroll";
import { GameButton } from "./componentesHome/GameButton";
import { HomeHeader } from "./componentesHome/HomeHeader";
import { TextPressStart2P } from "@/components/TextPressStart2P";

export function HomeScreen() {
  const {tipos,filtrarContenidos} = useAudioVisual(); //aqui uso el contexto

  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    seleccionarTipos: [], // Inicialmente vacío
    seleccionarGeneros: []
  });

  // Setear los tipos automáticamente cuando estén disponibles o si el usuario destildó todo
  useEffect(() => {
    if (tipos.length > 0 && filters.seleccionarTipos.length === 0) {
      setFilters(f => ({ ...f, seleccionarTipos: tipos.map(tipo => tipo.id) }));
    }
  }, [tipos]);

  // funcion para filtrar contenido usando el contexto
  const filteredContent = useMemo(() => {
    return filtrarContenidos(filters.seleccionarTipos, filters.seleccionarGeneros);
  },[filters,filtrarContenidos]);

  // funcion para obtener contenido filtrado por tipo
  const getFilteredContentType = (tipoId: number) => {
    return filteredContent.filter(item => item.tipoId === tipoId);
  };

  // Verificar si hay algún resultado en toda la pantalla o si no hay ningún tipo seleccionado
  const hayResultados = filters.seleccionarTipos.length > 0 && tipos.some(tipo => getFilteredContentType(tipo.id).length > 0);

  const handleOpenFilterModal = () => {
    setIsFilterModalVisible(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalVisible(false);
  };

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <SafeAreaView edges={['top']} style={styles.screenContainer}>
      <ScrollView style={styles.screenContainer}>
        <HomeHeader onFilterPress={handleOpenFilterModal} />
        <View style={styles.buttonRow}>
          <GameButton
            title="Desafío del Ahorcado"
            description="Adivina los títulos letra por letra. ¿Cuántos puedes identificar?"
            background={Colors.purpura}
            url={ROUTES.AHORCADO}
          />
          <GameButton
            title="Pixel Reveal"
            description="Identifica títulos desde imágenes pixeladas. ¡Pon a prueba tu memoria visual!"
            background={Colors.verde}
            url={ROUTES.PIXEL_REVEAL}
          />
        </View>
        <View style={styles.contenedorScroll}>
          {tipos
            .filter(tipo => filters.seleccionarTipos.includes(tipo.id))
            .map((tipo) => {
              const contentForType = getFilteredContentType(tipo.id);
              if (contentForType.length === 0) return null;
              return (
                <AudioVisualScroll
                  key={tipo.id}
                  tipoId={tipo.id}
                  filteredContent={contentForType}
                />
              );
            })}
          {!hayResultados && (
            <View style={{ padding: 40 }}>
              <TextPressStart2P style={{ color: Colors.blanco, textAlign: 'center', fontSize: 16 }}>
                No hay resultados que coincidan con los filtros seleccionados.
              </TextPressStart2P>
            </View>
          )}
        </View>
      </ScrollView>

      <FilterModal
        visible={isFilterModalVisible}
        onClose={handleCloseFilterModal}
        onApplyFilters={handleApplyFilters}
        initialFilters={filters}
      />
    </SafeAreaView>
  );
}

//------------------
// Styles
//------------------

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.fondo
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,

  },
  contenedorScroll: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 10,
    gap: 20
  }
});