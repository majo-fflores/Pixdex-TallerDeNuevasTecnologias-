import { AudioVisualProvider } from '@/src/context/ContextoAudioVisual';
import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function RootLayout() {
  return (
    <AudioVisualProvider>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{
          headerShown: false,
          headerBackButtonDisplayMode: "minimal",
          headerTitleAlign: "center",
        }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="detail/[audioVisualId]" options={{ headerShown: false }} />
        </Stack>
      </View>
    </AudioVisualProvider>
  );
}