// Em /components/questions/SingleChoiceQuestion.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm } from '../../context/FormContext';
import { Question } from '../../types';

interface SingleChoiceQuestionProps {
  question: Question;
}

export const SingleChoiceQuestion: React.FC<SingleChoiceQuestionProps> = ({ question }) => {
  const { setAnswer, formState } = useForm();
  const selectedAnswer = formState.answers[question.id];

  const handleSelect = (option: string | { value: string; label?: string }) => {
    const value = typeof option === 'string' ? option : option.value;
    setAnswer(question.id, value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question.text}</Text>
      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => {
          const optionValue = typeof option === 'string' ? option : option.value;
          const optionLabel = typeof option === 'string' ? option : option.label || option.value;
          const isSelected = selectedAnswer === optionValue;

          return (
            <TouchableOpacity
              key={index}
              style={[styles.optionButton, isSelected && styles.selectedOption]}
              onPress={() => handleSelect(option)}
            >
              <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>
                {optionLabel}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
  },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  optionsContainer: {
    width: '100%',
  },
  optionButton: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    backgroundColor: '#f1f1f1',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedOption: {
    backgroundColor: '#4a90e2',
    borderColor: '#4a90e2',
  },
  optionText: {
    fontSize: 14,
  },
  selectedOptionText: {
    color: 'white',
  },
});