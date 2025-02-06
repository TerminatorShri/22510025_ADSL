export interface Course {
  course_id: string;
  course_title: string;
  day: string;
  start_time: string;
  end_time: string;
  room_number: string;
  building_name: string;
  instructor_name: string;
}

export interface StudentCourseResponse {
  statuscode: number;
  message: string;
  success: boolean;
  data: Course[] | null;
}
