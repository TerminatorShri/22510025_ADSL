export interface TeacherExam {
  id: number;
  title: string;
  description: string;
  total_marks: number;
  start_time: string; // ISO Date String (e.g., "2025-02-10T04:30:00.000Z")
  duration_minutes: number;
  status: 'upcoming' | 'ongoing' | 'completed'; // Enum for status
}


export interface CreateExamRequest {
  teacherId: number;
  courseId: number;
  title: string;
  description: string;
  total_marks: number;
  start_time: string;
  duration_minutes: number;
}

export interface CreateExamResponse {
  examId: number;
}
