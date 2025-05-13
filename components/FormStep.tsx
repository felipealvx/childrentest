// Em /components/FormStep.tsx

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useForm } from '../context/FormContext';
import { QuestionRenderer } from './questions/QuestionRenderer';
import { FormStepper } from './FormStepper';

interface FormStepProps {
  step: number;
  onComplete: () => void;
}

export const FormStep: React.FC<FormStepProps> = ({ step, onComplete }) => {
  const { getCurrentQuestions, nextStep, prevStep, formState, formData, isLastStep } = useForm();
  const questions = getCurrentQuestions();
  
  // Verificar se todas as perguntas na etapa atual foram respondidas
  const areAllQuestionsAnswered = questions.every(q => formState.answers[q.id] !== undefined);
  
  const totalSteps = Math.ceil(formData.questions.length / 5); // Estimativa aproximada, ajustar conforme a lógica de agrupamento

  return (
    <View style={styles.container}>
      <FormStepper totalSteps={totalSteps} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.stepTitle}>Etapa {step}</Text>
        
        {questions.map((question) => (
          <View key={question.id} style={styles.questionContainer}>
            <QuestionRenderer question={question} />
          </View>
        ))}

        <View style={styles.buttonsContainer}>
          {step > 1 && (
            <TouchableOpacity
              style={[styles.button, styles.backButton]}
              onPress={prevStep}
            >
              <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            style={[
              styles.button, 
              styles.nextButton,
              !areAllQuestionsAnswered && styles.disabledButton,
            ]}
            disabled={!areAllQuestionsAnswered}
            onPress={() => {
              if (isLastStep) {
                onComplete();
              } else {
                nextStep();
              }
            }}
          >
            <Text style={styles.nextButtonText}>
              {isLastStep ? 'Concluir' : 'Próximo'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // Espaço extra para o botão no fim do formulário
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  questionContainer: {
    marginBottom: 30,
    width: '100%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    minWidth: 120,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#4a90e2',
    flex: 1,
    marginLeft: 10,
  },
  backButton: {
    backgroundColor: '#f0f0f0',
    flex: 1,
    marginRight: 10,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
    opacity: 0.7,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  backButtonText: {
    color: '#666666',
    fontSize: 16,
    fontWeight: '500',
  },
});