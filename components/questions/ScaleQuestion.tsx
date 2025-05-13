// Em /components/questions/ScaleQuestion.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm } from '../../context/FormContext';
import { Question } from '../../types';

interface ScaleQuestionProps {
  question: Question;
}

export const ScaleQuestion: React.FC<ScaleQuestionProps> = ({ question }) => {
  const { setAnswer, formState } = useForm();
  const selectedAnswer = formState.answers[question.id];
  
  const min = question.scale_min || 0;
  const max = question.scale_max || 10;
  const scaleValues = Array.from({ length: max - min + 1 }, (_, i) => i + min);

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question.text}</Text>
      
      {question.description && (
        <Text style={styles.description}>{question.description}</Text>
      )}
      
      <View style={styles.scaleContainer}>
        {scaleValues.map((value) => (
          <TouchableOpacity
            key={value}
            style={[
              styles.scaleButton,
              selectedAnswer === value && styles.selectedScaleButton,
            ]}
            onPress={() => setAnswer(question.id, value)}
          >
            <Text 
              style={[
                styles.scaleButtonText,
                selectedAnswer === value && styles.selectedScaleButtonText,
              ]}
            >
              {value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.labelsContainer}>
        <Text style={styles.minLabel}>{min} = {question.description?.split('|')[0].trim()}</Text>
        <Text style={styles.maxLabel}>{max} = {question.description?.split('|')[1].trim()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  scaleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  scaleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedScaleButton: {
    backgroundColor: '#4a90e2',
    borderColor: '#3a70b2',
  },
  scaleButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  selectedScaleButtonText: {
    color: 'white',
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  minLabel: {
    fontSize: 12,
    color: '#666',
    maxWidth: '45%',
  },
  maxLabel: {
    fontSize: 12,
    color: '#666',
    maxWidth: '45%',
    textAlign: 'right',
  },
});