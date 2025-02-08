export interface CurrentExam {
  id: number;
  title: string;
  description: string;
  total_marks: number;
  start_time: string;
  duration_minutes: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  course_id: number;
  course_name: string;
  course_code: string;
  question_ids: number[];
  assigned_students: number[];
}
