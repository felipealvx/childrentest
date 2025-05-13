// Em /app/(tabs)/index.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.appTitle}>ChildrenCheck</Text>
          <Text style={styles.appDescription}>
            Avaliação de saúde e hábitos para crianças e adolescentes
          </Text>
        </View>
        
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Novo Formulário</Text>
            <Text style={styles.cardDescription}>
              Responda ao questionário para avaliar seus hábitos e postura
            </Text>
            
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => router.push('../form')}
            >
              <Text style={styles.startButtonText}>Iniciar Questionário</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>21 Perguntas</Text>
            <Text style={styles.featureText}>
              Questionário completo para avaliação de saúde e postura
            </Text>
          </View>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>Avaliação Visual</Text>
            <Text style={styles.featureText}>
              Com imagens para facilitar a identificação de posturas
            </Text>
          </View>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>Fácil de Responder</Text>
            <Text style={styles.featureText}>
              Interface simples com perguntas diretas e objetivas
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4a90e2',
    marginBottom: 10,
  },
  appDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  cardContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  cardDescription: {
    fontSize: 15,
    color: '#666',
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#4a90e2',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  featuresContainer: {
    marginTop: 20,
  },
  featureItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#4a90e2',
  },
  featureText: {
    fontSize: 14,
    color: '#777',
  },
});