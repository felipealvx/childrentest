// Em /components/questions/ImageChoiceQuestion.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useForm } from '../../context/FormContext';
import { Question } from '../../types';

interface ImageChoiceQuestionProps {
  question: Question;
}

export const ImageChoiceQuestion: React.FC<ImageChoiceQuestionProps> = ({ question }) => {
  const { setAnswer, formState } = useForm();
  const selectedAnswer = formState.answers[question.id];

  // Aqui você teria que carregar as imagens com base no nome fornecido
  // Isso depende de como suas imagens serão estruturadas
  const getImageSource = (imageName: string) => {
    // Exemplo: Suponha que você tem uma pasta com imagens nomeadas como image_1.png, image_2.png, etc.
    // Isso deve ser adaptado para seu caso específico
    switch (imageName) {
      case 'image_1':
        return require('../../assets/image_1.png');
      case 'image_2':
        return require('../../assets/image_2.png');
      case 'image_3':
        return require('../../assets/image_3.png');
      case 'image_4':
        return require('../../assets/image_4.png');
      case 'image_5':
        return require('../../assets/image_5.png');
      default:
        return require('../../assets/placeholder.png'); // Imagem de placeholder
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.questionText}>{question.text}</Text>
      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => {
          const optionValue = typeof option === 'string' ? option : option.value;
          const optionLabel = typeof option === 'string' ? option : option.label || option.value;
          
          // Ignora a última opção que geralmente é "outro modo / não sei"
          const isTextOnly = typeof option === 'string' && option.includes('outro modo');
          const isSelected = selectedAnswer === optionValue;

          return (
            <TouchableOpacity
              key={index}
              style={[styles.imageOptionContainer, isSelected && styles.selectedOption]}
              onPress={() => setAnswer(question.id, optionValue)}
            >
              {!isTextOnly && (
                <Image 
                  source={getImageSource(typeof option === 'string' ? option : option.value || '')} 
                  style={styles.optionImage} 
                  resizeMode="contain"
                />
              )}
              <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>
                {optionLabel}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  optionsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  imageOptionContainer: {
    width: '80%',
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedOption: {
    backgroundColor: '#e6f0ff',
    borderColor: '#4a90e2',
    borderWidth: 2,
  },
  optionImage: {
    width: 200,
    height: 150,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  selectedOptionText: {
    color: '#4a90e2',
    fontWeight: '600',
  },
});