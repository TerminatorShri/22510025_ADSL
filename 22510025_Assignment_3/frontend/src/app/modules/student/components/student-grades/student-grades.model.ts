export interface Grade {
  course_id: string;
  course_title: string;
  credits: number;
  grade: string;
}

export interface StudentGradesResponse {
  statuscode: number;
  message: string;
  success: boolean;
  data: Grade[];
}
