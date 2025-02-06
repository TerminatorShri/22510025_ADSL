export interface Department {
  dept_name: string;
  building: string;
  budget: string;
  total_rooms: number;
  room_numbers: string; // Comma-separated room numbers
}

export interface HodProfileResponse {
  statuscode: number;
  message: string;
  success: boolean;
  data: Department;
}
