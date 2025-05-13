// Em /app/(tabs)/about.tsx

import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Linking, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.appTitle}>ChildrenCheck</Text>
          <Text style={styles.versionText}>Versão 1.0.0</Text>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Sobre o Aplicativo</Text>
          <Text style={styles.sectionText}>
            O ChildrenCheck é um aplicativo desenvolvido para avaliar hábitos, saúde e postura de crianças e adolescentes.
            Por meio de um questionário simples e ilustrado, buscamos identificar fatores de risco para problemas posturais
            e de saúde, permitindo intervenções preventivas e orientações adequadas.
          </Text>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Como Funciona</Text>
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepText}>
              Responda ao questionário completo com 21 perguntas sobre seus hábitos diários.
            </Text>
          </View>
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepText}>
              Identifique nas imagens as posturas que melhor representam sua rotina.
            </Text>
          </View>
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepText}>
              Após concluir, receba orientações e recomendações personalizadas.
            </Text>
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Objetivo</Text>
          <Text style={styles.sectionText}>
            Nosso principal objetivo é promover a saúde e prevenir problemas posturais em crianças e adolescentes, 
            fornecendo informações e orientações valiosas para melhorar a qualidade de vida e bem-estar.
          </Text>
        </View>
        
        <View style={styles.contactContainer}>
          <Text style={styles.contactTitle}>Contato e Suporte</Text>
          <TouchableOpacity 
            style={styles.contactButton}
            onPress={() => Linking.openURL('mailto:suporte@childrencheck.com')}
          >
            <FontAwesome name="envelope" size={18} color="#4a90e2" />
            <Text style={styles.contactButtonText}>suporte@childrencheck.com</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.contactButton}
            onPress={() => Linking.openURL('https://childrencheck.com')}
          >
            <FontAwesome name="globe" size={18} color="#4a90e2" />
            <Text style={styles.contactButtonText}>www.childrencheck.com</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4a90e2',
    marginBottom: 5,
  },
  versionText: {
    fontSize: 14,
    color: '#888',
  },
  sectionContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  sectionText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#555',
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stepNumber: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#4a90e2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  contactContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
  },
  contactButtonText: {
    fontSize: 15,
    color: '#4a90e2',
    marginLeft: 10,
  },
});