// Em /components/FormComplete.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useForm } from '../context/FormContext';
import { router } from 'expo-router';

interface FormCompleteProps {
  onRestart: () => void;
}

export const FormComplete: React.FC<FormCompleteProps> = ({ onRestart }) => {
  const { formState } = useForm();
  
  const handleExportResults = () => {
    // Aqui você poderia implementar lógica para salvar/exportar as respostas
    console.log('Respostas do formulário:', formState.answers);
    
    // Exemplo: preparar dados para envio ao servidor
    const resultsData = {
      answers: formState.answers,
      completedAt: new Date().toISOString(),
    };
    
    // Lógica de envio para API aqui
    alert('Respostas enviadas com sucesso!');
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.completionCard}>
        <Text style={styles.title}>Formulário Concluído!</Text>
        <Text style={styles.subtitle}>
          Obrigado por responder todas as perguntas.
        </Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {Object.keys(formState.answers).length}
            </Text>
            <Text style={styles.statLabel}>Perguntas Respondidas</Text>
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleExportResults}
        >
          <Text style={styles.actionButtonText}>Exportar Resultados</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.secondaryButton]}
          onPress={onRestart}
        >
          <Text style={styles.secondaryButtonText}>Iniciar Novo Formulário</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.tertiaryButton]}
          onPress={() => router.replace('/')}
        >
          <Text style={styles.tertiaryButtonText}>Voltar à Tela Inicial</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  completionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 500,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4a90e2',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f0f7ff',
    borderRadius: 10,
    minWidth: 150,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4a90e2',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  actionButton: {
    backgroundColor: '#4a90e2',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginVertical: 8,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  secondaryButton: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  secondaryButtonText: {
    color: '#555555',
  },
  tertiaryButton: {
    backgroundColor: 'transparent',
  },
  tertiaryButtonText: {
    color: '#4a90e2',
  },
});