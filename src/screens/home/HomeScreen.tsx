import Colors from '@/constants/Colors';
import { useAudioVisual } from '@/src/context/ContextoAudioVisual';
import { ROUTES } from "@/src/navigation/routes";
import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { FilterModal, FilterOptions } from "../../../components/FilterModal";
import { AudioVisualScroll } from "./componentesHome/AudioVisualScroll";
import { GameButton } from "./componentesHome/GameButton";
import { HomeHeader } from "./componentesHome/HomeHeader";

export function HomeScreen() {
  const {tipos,filtrarContenidos} = useAudioVisual(); //aqui uso el contexto

  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    seleccionarTipos: tipos.map(tipo => tipo.id), // Todos seleccionados por defecto
    seleccionarGeneros: [] // Ninguno seleccionado por defecto
  });

  // funcion para filtrar contenido usando el contexto
  const filteredContent = useMemo(() => {
    return filtrarContenidos(filters.seleccionarTipos, filters.seleccionarGeneros);
  },[filters,filtrarContenidos]);

  // funcion para obtener contenido filtrado por tipo
  const getFilteredContentType = (tipoId: number) => {
    return filteredContent.filter(item => item.tipoId === tipoId);
  };

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
            .filter(tipo => filters.seleccionarTipos.includes(tipo.id)) // Solo mostrar tipos seleccionados
            .map((tipo) => {
              const contentForType = getFilteredContentType(tipo.id);
              // Solo mostrar la sección si hay contenido
              return contentForType.length > 0 ? (
                <AudioVisualScroll 
                  key={tipo.id} 
                  tipoId={tipo.id} 
                  filteredContent={contentForType}
                />
              ) : null;
            })}
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