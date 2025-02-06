export interface StudentMarks {
  student_id: string;
  student_name: string;
  course_id: string;
  course_title: string;
  semester: string;
  year: number;
  grade: string;
}

export interface TeacherRecordsResponse {
  statuscode: number;
  message: string;
  success: boolean;
  data: StudentMarks[];
}
