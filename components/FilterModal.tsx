import { Buttons } from '@/components/Buttons';
import Colors from '@/constants/Colors';
import { useAudioVisual } from '@/src/context/ContextoAudioVisual';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextPressStart2P } from './TextPressStart2P';

export interface FilterOptions {
  seleccionarTipos: number[];
  seleccionarGeneros: number[];
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  initialFilters: FilterOptions;
}

export function FilterModal({ visible, onClose, onApplyFilters, initialFilters }: FilterModalProps) {

  //uso el contexto 
  const {tipos, generos} = useAudioVisual();

  const [seleccionarTipos, setSeleccionarTipos] = useState<number[]>(initialFilters.seleccionarTipos);
  const [seleccionarGeneros, setSeleccionarGeneros] = useState<number[]>(initialFilters.seleccionarGeneros);

  const toggleType = (typeId: number) => {
    setSeleccionarTipos(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const toggleGenre = (genreId: number) => {
    setSeleccionarGeneros(prev => 
      prev.includes(genreId) 
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    );
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      seleccionarTipos,
      seleccionarGeneros
    });
    onClose();
  };

  const handleCancel = () => {
    setSeleccionarTipos(initialFilters.seleccionarTipos);
    setSeleccionarGeneros(initialFilters.seleccionarGeneros);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <TextPressStart2P style={styles.title}>Filter Contenido</TextPressStart2P>
            <TouchableOpacity onPress={handleCancel} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color={Colors.blanco} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            {/* La seccion de los tipos de contenidos */}
            <View style={styles.section}>
              <TextPressStart2P style={styles.sectionTitle}>Tipos de Contenidos</TextPressStart2P>
              {tipos.map((tipo) => (
                <TouchableOpacity
                  key={tipo.id}
                  style={styles.checkboxItem}
                  onPress={() => toggleType(tipo.id)}
                >
                  <View style={[
                    styles.checkbox,
                    seleccionarTipos.includes(tipo.id) && styles.checkboxSelected
                  ]}>
                    {seleccionarTipos.includes(tipo.id) && (
                      <MaterialIcons name="check" size={16} color={Colors.blanco} />
                    )}
                  </View>
                  <TextPressStart2P style={styles.checkboxLabel}>
                    {tipo.plural}
                  </TextPressStart2P>
                </TouchableOpacity>
              ))}
            </View>

            {/* Seccion de generos */}
            <View style={styles.section}>
              <TextPressStart2P style={styles.sectionTitle}>Generos</TextPressStart2P>
              <View style={styles.genresGrid}>
                {generos.map((genero) => (
                  <TouchableOpacity
                    key={genero.id}
                    style={styles.checkboxItem}
                    onPress={() => toggleGenre(genero.id)}
                  >
                    <View style={[
                      styles.checkbox,
                      seleccionarGeneros.includes(genero.id) && styles.checkboxSelected
                    ]}>
                      {seleccionarGeneros.includes(genero.id) && (
                        <MaterialIcons name="check" size={16} color={Colors.blanco} />
                      )}
                    </View>
                    <TextPressStart2P style={styles.checkboxLabel}>
                      {genero.nombre}
                    </TextPressStart2P>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Botones */}
          <View style={styles.footer}>
            <View style={styles.buttonContainer}>
              <Buttons
                titulo="CANCELAR"
                onPress={handleCancel}
                backgroundColor={Colors.grisOscuro}
                borderTopColor={Colors.grisOscuro}
                borderLeftColor={Colors.grisOscuro}
                borderBottomColor={Colors.grisOscuro}
                borderRightColor={Colors.grisOscuro}
                showIcon={false}
                textSize={Platform.OS === "android" ? 10 : 12}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Buttons
                titulo="APLICAR FILTROS"
                onPress={handleApplyFilters}
                backgroundColor={Colors.purpura}
                showIcon={false}
                textSize={Platform.OS === "android" ? 10 : 12}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: Colors.fondo,
    borderWidth: 2,
    borderColor: Colors.purpuraClaro,
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
    borderRadius: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grisOscuro,
  },
  title: {
    color: Colors.blanco,
    fontSize: Platform.OS === "android" ? 14 : 16,
  },
  closeButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: Colors.purpuraClaro,
    fontSize: Platform.OS === "android" ? 12 : 14,
    marginBottom: 15,
  },
  genresGrid: {
    flexDirection: 'column',
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: Colors.purpuraClaro,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: Colors.purpura,
    borderColor: Colors.purpura,
  },
  checkboxLabel: {
    color: Colors.blanco,
    fontSize: Platform.OS === "android" ? 10 : 12,
    textTransform: 'capitalize',
  },
  footer: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.grisOscuro,
  },
  buttonContainer: {
    flex: 1,
  },
});

function setSelectedTypes(arg0: (prev: any) => any) {
  throw new Error('Function not implemented.');
}
