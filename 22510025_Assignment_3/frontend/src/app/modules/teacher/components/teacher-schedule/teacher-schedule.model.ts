export interface Schedule {
  course_id: string;
  course_title: string;
  semester: string;
  year: number;
  building_name: string;
  room_number: string;
  day: string;
  start_time: string;
  end_time: string;
}

export interface TeacherScheduleResponse {
  statuscode: number;
  message: string;
  success: boolean;
  data: Schedule[] | null;
}
