// Em /types/index.ts

export type QuestionType = 'single_choice' | 'image_choice' | 'image_choice_with_label' | 'scale';

export interface Option {
  value?: string;
  label?: string;
  next_question?: number;
  end_questionnaire?: boolean;
}

export interface Question {
  id: number;
  text: string;
  type: QuestionType;
  options: Option[] | string[];
  scale_min?: number;
  scale_max?: number;
  description?: string;
}

export interface FormData {
  questions: Question[];
}

export interface FormState {
  answers: Record<number, any>;
  currentStep: number;
  completed: boolean;
}