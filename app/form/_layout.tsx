// Em /app/form/_layout.tsx

import React from 'react';
import { Stack } from 'expo-router';
import { FormProvider } from '../../context/FormContext';

export default function FormLayout() {
  return (
    <FormProvider>
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#4a90e2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{ 
            title: 'Questionário de Saúde',
            headerBackTitle: 'Voltar'
          }}
        />
      </Stack>
    </FormProvider>
  );
}