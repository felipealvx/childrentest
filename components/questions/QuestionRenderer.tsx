// Em /components/questions/QuestionRenderer.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SingleChoiceQuestion } from './SingleChoiceQuestion';
import { ImageChoiceQuestion } from './ImageChoiceQuestion';
import { ScaleQuestion } from './ScaleQuestion';
import { Question } from '../../types';

interface QuestionRendererProps {
  question: Question;
}

export const QuestionRenderer: React.FC<QuestionRendererProps> = ({ question }) => {
  switch (question.type) {
    case 'single_choice':
      return <SingleChoiceQuestion question={question} />;
    case 'image_choice':
    case 'image_choice_with_label':
      return <ImageChoiceQuestion question={question} />;
    case 'scale':
      return <ScaleQuestion question={question} />;
    default:
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Tipo de pergunta não suportado: {question.type}
          </Text>
        </View>
      );
  }
};

const styles = StyleSheet.create({
  errorContainer: {
    padding: 20,
    backgroundColor: '#ffebee',
    borderRadius: 8,
    marginVertical: 10,
  },
  errorText: {
    color: '#c62828',
    fontWeight: '500',
  },
});