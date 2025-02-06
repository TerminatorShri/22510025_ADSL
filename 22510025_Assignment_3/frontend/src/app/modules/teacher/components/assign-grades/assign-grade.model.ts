export interface GradeAssignment {
  studentId: string;
  courseId: string;
  secId: string;
  semester: string;
  year: number;
  grade: string;
}

export interface GradesCourseInput {
  course_id: string;
  course_title: string;
  semester: string;
  year: number;
  sec_id: string;
}
