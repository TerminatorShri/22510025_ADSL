export interface CourseWithoutTimeSlot {
  course_id: string;
  course_title: string;
  credits: number;
}

export interface TimeSlotUpdate {
  courseId: string;
  secId: string;
  semester: string;
  year: number;
  timeSlotId: string;
  day: string;
  startTime: string;
  endTime: string;
  building: string;
  roomNumber: string;
}

export interface RegistrarCourseResponse {
  statuscode: number;
  message: string;
  success: boolean;
  data: CourseWithoutTimeSlot[];
}

export interface TimeSlotUpdateResponse {
  data: null;
  statuscode: number;
  message: string;
  success: boolean;
}
