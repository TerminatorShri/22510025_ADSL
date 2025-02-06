export interface Course {
  course_id: string;
  course_title: string;
  credits: number;
  instructor_id: string;
  instructor_name: string;
  salary: string;
}

export interface HodRecordsResponse {
  statuscode: number;
  message: string;
  success: boolean;
  data: Course[];
}
