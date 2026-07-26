import { Buttons } from '@/components/Buttons';
import { TextPressStart2P } from '@/components/TextPressStart2P';
import Colors from '@/constants/Colors';
import { useAuth } from '@/src/context/ContextoAuth';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const isMobile = Platform.OS === 'android' || Platform.OS === 'ios';

type ModoAuth = 'login' | 'registro';

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
}

export function AuthModal({ visible, onClose }: AuthModalProps) {
  const { iniciarSesion, registrarse } = useAuth();

  const [modo, setModo] = useState<ModoAuth>('login');
  const [identificador, setIdentificador] = useState('');
  const [alias, setAlias] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (visible) {
      setModo('login');
      setIdentificador('');
      setAlias('');
      setEmail('');
      setPassword('');
      setError(null);
      setEnviando(false);
    }
  }, [visible]);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async () => {
    setEnviando(true);
    setError(null);

    let resultado: string | null = null;
    if (modo === 'login') {
      resultado = await iniciarSesion(identificador, password);
    } else {
      resultado = await registrarse(alias, email, password);
    }

    setEnviando(false);
    if (resultado) {
      setError(resultado);
    } else {
      handleClose();
    }
  };

  const cambiarModo = (nuevoModo: ModoAuth) => {
    setModo(nuevoModo);
    setError(null);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContainer}>
              <View style={styles.header}>
                <TextPressStart2P style={styles.title}>
                  {modo === 'login' ? 'Iniciar Sesion' : 'Registrarse'}
                </TextPressStart2P>
                <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                  <MaterialIcons name="close" size={24} color={Colors.blanco} />
                </TouchableOpacity>
              </View>

              <View style={styles.tabs}>
                <TouchableOpacity
                  style={[styles.tab, modo === 'login' && styles.tabActiva]}
                  onPress={() => cambiarModo('login')}
                >
                  <TextPressStart2P style={styles.tabTexto}>Login</TextPressStart2P>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.tab, modo === 'registro' && styles.tabActiva]}
                  onPress={() => cambiarModo('registro')}
                >
                  <TextPressStart2P style={styles.tabTexto}>Registro</TextPressStart2P>
                </TouchableOpacity>
              </View>

              <View style={styles.content}>
                {modo === 'login' ? (
                  <>
                    <TextPressStart2P style={styles.label}>Email o alias</TextPressStart2P>
                    <TextInput
                      value={identificador}
                      onChangeText={setIdentificador}
                      placeholder="tu@email.com o tu alias"
                      placeholderTextColor={Colors.grisClaro}
                      style={styles.input}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </>
                ) : (
                  <>
                    <TextPressStart2P style={styles.label}>Alias</TextPressStart2P>
                    <TextInput
                      value={alias}
                      onChangeText={setAlias}
                      placeholder="Tu nombre de jugador"
                      placeholderTextColor={Colors.grisClaro}
                      style={styles.input}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <TextPressStart2P style={styles.label}>Email</TextPressStart2P>
                    <TextInput
                      value={email}
                      onChangeText={setEmail}
                      placeholder="tu@email.com"
                      placeholderTextColor={Colors.grisClaro}
                      style={styles.input}
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType="email-address"
                    />
                  </>
                )}

                <TextPressStart2P style={styles.label}>Contrasena</TextPressStart2P>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Minimo 6 caracteres"
                  placeholderTextColor={Colors.grisClaro}
                  style={styles.input}
                  secureTextEntry
                  autoCapitalize="none"
                />

                {error && (
                  <TextPressStart2P style={styles.error}>{error}</TextPressStart2P>
                )}
              </View>

              <View style={styles.footer}>
                {enviando ? (
                  <ActivityIndicator color={Colors.purpuraClaro} />
                ) : (
                  <Buttons
                    titulo={modo === 'login' ? 'ENTRAR' : 'CREAR CUENTA'}
                    onPress={handleSubmit}
                    backgroundColor={Colors.purpura}
                    showIcon={false}
                    textSize={isMobile ? 10 : 12}
                    borderWidth={2}
                    borderTopColor={Colors.verde}
                    borderLeftColor={Colors.verde}
                    borderBottomColor={Colors.verde}
                    borderRightColor={Colors.verde}
                  />
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: isMobile ? 12 : 20,
  },
  modalContainer: {
    backgroundColor: Colors.fondo,
    borderWidth: 2,
    borderColor: Colors.purpuraClaro,
    width: '100%',
    maxWidth: 420,
    paddingHorizontal: isMobile ? 5 : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: isMobile ? 8 : 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grisOscuro,
  },
  title: {
    color: Colors.blanco,
    fontSize: isMobile ? 14 : 18,
  },
  closeButton: {
    padding: 5,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.grisOscuro,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActiva: {
    borderBottomColor: Colors.purpuraClaro,
    backgroundColor: Colors.grisOscuro,
  },
  tabTexto: {
    color: Colors.blanco,
    fontSize: isMobile ? 10 : 12,
  },
  content: {
    padding: isMobile ? 12 : 20,
    gap: 6,
  },
  label: {
    color: Colors.purpuraClaro,
    fontSize: isMobile ? 10 : 12,
    marginTop: 8,
  },
  input: {
    backgroundColor: Colors.fondo,
    borderWidth: 2,
    borderColor: Colors.purpuraClaro,
    color: Colors.blanco,
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  error: {
    color: Colors.rojo,
    fontSize: isMobile ? 8 : 10,
    marginTop: 8,
    textAlign: 'center',
  },
  footer: {
    padding: isMobile ? 12 : 15,
    borderTopWidth: 1,
    borderTopColor: Colors.grisOscuro,
    alignItems: 'center',
  },
});
