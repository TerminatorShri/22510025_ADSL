export interface Course {
  course_id: string;
  course_title: string;
  credits: number;
  instructor_id: string;
  instructor_name: string;
  salary: string;
}

export interface NewCourse {
  courseId: string;
  title: string;
  deptName: string;
  credits: number;
}

export interface NewInstructor {
  instructorId: string;
  name: string;
  deptName: string;
  salary: number;
}

export interface HodRecordsResponse {
  statuscode: number;
  message: string;
  success: boolean;
  data: Course[];
}

export interface AddActionResponse {
  data: null;
  message: string;
  statuscode: number;
  success: boolean;
}
