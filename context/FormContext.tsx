// Em /context/FormContext.tsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import { FormData, FormState, Question } from '../types';
import formData from '../data/formData.json';

interface FormContextType {
  formData: FormData;
  formState: FormState;
  setAnswer: (questionId: number, answer: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  getCurrentQuestions: () => Question[];
  getQuestion: (id: number) => Question | undefined;
  isLastStep: boolean;
  shouldSkipToQuestion: (questionId: number) => boolean;
}

const initialFormState: FormState = {
  answers: {},
  currentStep: 1,
  completed: false,
};

const FormContext = createContext<FormContextType | undefined>(undefined);

// Organiza as perguntas em grupos de 5, exceto as perguntas com imagens
export const getGroupedQuestions = (questions: Question[]): Question[][] => {
  const groupedQuestions: Question[][] = [];
  let currentGroup: Question[] = [];

  questions.forEach(question => {
    if (question.type.includes('image')) {
      // Se já temos perguntas no grupo atual, finalize-o
      if (currentGroup.length > 0) {
        groupedQuestions.push([...currentGroup]);
        currentGroup = [];
      }
      // Coloque a pergunta com imagem em seu próprio grupo
      groupedQuestions.push([question]);
    } else {
      // Adicione a pergunta ao grupo atual
      currentGroup.push(question);
      // Se o grupo atual atingiu 5 perguntas, finalize-o
      if (currentGroup.length === 5) {
        groupedQuestions.push([...currentGroup]);
        currentGroup = [];
      }
    }
  });

  // Não esqueça de adicionar o último grupo se ainda houver perguntas
  if (currentGroup.length > 0) {
    groupedQuestions.push(currentGroup);
  }

  return groupedQuestions;
};

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [groupedQuestions, setGroupedQuestions] = useState<Question[][]>([]);

  useEffect(() => {
    setGroupedQuestions(getGroupedQuestions(formData.questions));
  }, []);

  const setAnswer = (questionId: number, answer: any) => {
    setFormState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answer,
      },
    }));
  };

  const getCurrentQuestions = (): Question[] => {
    if (formState.currentStep <= groupedQuestions.length && formState.currentStep > 0) {
      return groupedQuestions[formState.currentStep - 1];
    }
    return [];
  };

  const getQuestion = (id: number): Question | undefined => {
    return formData.questions.find(q => q.id === id);
  };

  const shouldSkipToQuestion = (questionId: number): boolean => {
    // Verifica se, com base nas respostas atuais, devemos pular para outra pergunta
    const { answers } = formState;
    
    for (const [qId, answer] of Object.entries(answers)) {
      const question = getQuestion(parseInt(qId));
      if (!question) continue;

      const selectedOption = question.options.find((opt: any) => {  
        if (typeof opt === 'string') {
          return opt === answer;
        } else {
          return opt.value === answer;
        }
      }) as Option | undefined;
      
      if (selectedOption && typeof selectedOption !== 'string') {
        if (selectedOption.next_question === questionId) return true;
        if (selectedOption.end_questionnaire) return false;
      }
    }
    
    return false;
  };

  const nextStep = () => {
    // Verifique se esta é a última etapa
    if (formState.currentStep >= groupedQuestions.length) {
      setFormState(prev => ({ ...prev, completed: true }));
      return;
    }

    // Verifique se alguma resposta atual tem instruções de salto
    const currentQuestions = getCurrentQuestions();
    let shouldEnd = false;
    let shouldJump = false;
    let jumpToStep = 0;

    currentQuestions.forEach(question => {
      const answer = formState.answers[question.id];
      if (!answer) return;

      const options = question.options as any[];
      const selectedOption = options.find(opt => {
        if (typeof opt === 'string') {
          return opt === answer;
        } else {
          return opt.value === answer;
        }
      });

      if (selectedOption && typeof selectedOption !== 'string') {
        if (selectedOption.end_questionnaire) {
          shouldEnd = true;
        } else if (selectedOption.next_question) {
          shouldJump = true;
          // Encontre o grupo que contém esta próxima pergunta
          for (let i = 0; i < groupedQuestions.length; i++) {
            if (groupedQuestions[i].some(q => q.id === selectedOption.next_question)) {
              jumpToStep = i + 1;
              break;
            }
          }
        }
      }
    });

    if (shouldEnd) {
      setFormState(prev => ({ ...prev, completed: true }));
    } else if (shouldJump && jumpToStep > 0) {
      setFormState(prev => ({ ...prev, currentStep: jumpToStep }));
    } else {
      setFormState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
    }
  };

  const prevStep = () => {
    if (formState.currentStep > 1) {
      setFormState(prev => ({ ...prev, currentStep: prev.currentStep - 1 }));
    }
  };

  const goToStep = (step: number) => {
    if (step > 0 && step <= groupedQuestions.length) {
      setFormState(prev => ({ ...prev, currentStep: step }));
    }
  };

  const isLastStep = formState.currentStep === groupedQuestions.length;

  const value = {
    formData: formData as FormData,
    formState,
    setAnswer,
    nextStep,
    prevStep,
    goToStep,
    getCurrentQuestions,
    getQuestion,
    isLastStep,
    shouldSkipToQuestion,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};