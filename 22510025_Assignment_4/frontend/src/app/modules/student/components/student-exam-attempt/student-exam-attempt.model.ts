export interface ExamQuestion {
  id: number;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  image_url: string | null;
}

export interface ExamDetails {
  title: string;
  total_marks: number;
  duration_minutes: number;
  start_time: string;
  status: string;
}

export interface ExamQuestionsResponse {
  success: boolean;
  message: string;
  data: {
    examDetails: ExamDetails;
    examQuestions: ExamQuestion[];
  };
}
