export interface AttemptedExamDetails {
  question_id: number;
  selected_option: string;
  is_correct: boolean;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  image_url: string | null;
  difficulty: string;

  // Exam details
  exam_title: string;
  exam_total_marks: number;
  exam_start_time: string;
  exam_duration_minutes: number;

  // Course details
  course_name: string;
  course_code: string;
}
