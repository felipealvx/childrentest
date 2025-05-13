// Em /components/FormStepper.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm } from '../context/FormContext';

interface FormStepperProps {
  totalSteps: number;
}

export const FormStepper: React.FC<FormStepperProps> = ({ totalSteps }) => {
  const { formState, goToStep } = useForm();
  const { currentStep } = formState;

  // Renderiza até 5 passos visíveis para não sobrecarregar a UI
  const getVisibleSteps = () => {
    const steps = [];
    let start = Math.max(1, currentStep - 2);
    let end = Math.min(totalSteps, start + 4);
    
    // Ajusta para mostrar sempre 5 passos se possível
    if (end - start < 4 && start > 1) {
      start = Math.max(1, end - 4);
    }

    for (let i = start; i <= end; i++) {
      steps.push(i);
    }
    
    return steps;
  };

  const visibleSteps = getVisibleSteps();

  return (
    <View style={styles.container}>
      {currentStep > 3 && (
        <View style={styles.stepIndicatorsContainer}>
          <TouchableOpacity
            style={[styles.stepIndicator, styles.firstStep]}
            onPress={() => goToStep(1)}
          >
            <Text style={styles.stepText}>1</Text>
          </TouchableOpacity>
          <Text style={styles.ellipsis}>...</Text>
        </View>
      )}

      <View style={styles.stepIndicatorsContainer}>
        {visibleSteps.map((step) => (
          <TouchableOpacity
            key={step}
            style={[
              styles.stepIndicator,
              currentStep === step && styles.currentStepIndicator,
            ]}
            onPress={() => goToStep(step)}
          >
            <Text 
              style={[
                styles.stepText,
                currentStep === step && styles.currentStepText,
              ]}
            >
              {step}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {currentStep < totalSteps - 2 && (
        <View style={styles.stepIndicatorsContainer}>
          <Text style={styles.ellipsis}>...</Text>
          <TouchableOpacity
            style={[styles.stepIndicator, styles.lastStep]}
            onPress={() => goToStep(totalSteps)}
          >
            <Text style={styles.stepText}>{totalSteps}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  stepIndicatorsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepIndicator: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#eeeeee',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  currentStepIndicator: {
    backgroundColor: '#4a90e2',
    borderColor: '#3a70b2',
  },
  firstStep: {
    backgroundColor: '#f0f0f0',
  },
  lastStep: {
    backgroundColor: '#f0f0f0',
  },
  stepText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  currentStepText: {
    color: 'white',
  },
  ellipsis: {
    marginHorizontal: 5,
    fontSize: 16,
    color: '#666',
  },
});