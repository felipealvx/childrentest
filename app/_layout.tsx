// Em /app/_layout.tsx

import React from 'react';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Impedir a tela de splash de esconder automaticamente
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    // Você pode adicionar fontes personalizadas aqui
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Esconder a tela de splash depois que as fontes forem carregadas ou se houver erro
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="form" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}