export interface EligibleCourse {
  course_id: string;
  course_title: string;
  instructor_name: string;
  credits: number;
  sec_id: string;
  semester: string;
  year: number;
}

export interface StudentEligibleCoursesResponse {
  statuscode: number;
  message: string;
  success: boolean;
  data: EligibleCourse[];
}

export interface StudentCourseApplicationResponse {
  statuscode: number;
  message: string;
  success: boolean;
  data: null;
}
