// Em /app/form/index.tsx

import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ActivityIndicator, BackHandler } from 'react-native';
import { useForm } from '../../context/FormContext';
import { FormStep } from '../../components/FormStep';
import { FormComplete } from '../../components/FormComplete';
import { useFocusEffect } from 'expo-router';

export default function FormScreen() {
  const { formState, goToStep } = useForm();
  const [loading, setLoading] = useState(true);

  // Simular carregamento inicial (pode ser removido ou substituído por carregamento real)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Lidar com o botão voltar do dispositivo
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (formState.currentStep > 1 && !formState.completed) {
          goToStep(formState.currentStep - 1);
          return true; // Impede a navegação padrão de voltar
        }
        return false; // Permite a navegação padrão de voltar
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.addEventListener('hardwareBackPress', onBackPress);
    }, [formState.currentStep, formState.completed])
  );
  
  const handleCompleteForm = () => {
    // Aqui você pode adicionar lógica antes de marcar o formulário como concluído
    console.log('Formulário concluído');
  };
  
  const handleRestartForm = () => {
    // Reiniciar o formulário
    goToStep(1);
  };
 
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4a90e2" />
      </View>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      {formState.completed ? (
        <FormComplete onRestart={handleRestartForm} />
      ) : (
        <FormStep 
          step={formState.currentStep}
          onComplete={handleCompleteForm}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});