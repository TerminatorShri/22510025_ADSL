export interface ExamQuestion {
  id: number;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: 'A' | 'B' | 'C' | 'D';
  image_url: string | null;
  difficulty: 'easy' | 'medium' | 'hard';
}
