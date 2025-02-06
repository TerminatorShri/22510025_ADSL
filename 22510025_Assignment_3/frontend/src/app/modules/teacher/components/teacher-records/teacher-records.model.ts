export interface StudentMarks {
  student_id: string;
  student_name: string;
  course_id: string;
  course_title: string;
  semester: string;
  year: number;
  grade: string;
  sec_id: string;
}

export interface CourseWithStudents {
  course_id: string;
  course_title: string;
  semester: string;
  year: number;
  sec_id: string;
  students: StudentMarks[]; // Students who are enrolled in this course
}

export interface TeacherRecordsResponse {
  statuscode: number;
  message: string;
  success: boolean;
  data: StudentMarks[]; // Array of student marks with course info
}
