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

export interface AddQuestionRequest {
  examId: number; // ID of the exam to which the question is being added
  teacherId: number; // ID of the teacher adding the question
  questionText: string; // The actual question text
  optionA: string; // Option A
  optionB: string; // Option B
  optionC: string; // Option C
  optionD: string; // Option D
  correctOption: 'A' | 'B' | 'C' | 'D'; // The correct answer
  difficulty: 'easy' | 'medium' | 'hard'; // Question difficulty level
  imageUrl?: string | null; // Optional image URL (nullable)
}
