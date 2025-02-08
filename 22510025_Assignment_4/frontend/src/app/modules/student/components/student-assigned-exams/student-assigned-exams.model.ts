export interface UnattemptedExam {
  id: number;
  title: string;
  description: string;
  total_marks: number;
  start_time: string;
  duration_minutes: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}
