export interface Course {
  course_id: string;
  course_title: string;
  credits: number;
  semester: string;
  year: number;
}

export interface Teacher {
  instructor_id: string;
  name: string;
  dept_name: string;
  salary: string;
  courses: Course[];
}

export interface TeacherProfileResponse {
  statuscode: number;
  message: string;
  success: boolean;
  data: Teacher;
}
