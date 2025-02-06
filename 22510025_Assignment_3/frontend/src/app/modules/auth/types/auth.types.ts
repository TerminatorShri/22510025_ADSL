export interface LoginResponse {
  statuscode: number;
  message: string;
  success: boolean;
  data: {
    id: number;
    username: string;
    role_id: string;
    student_id: string | null;
    instructor_id: string | null;
    dept_name: string | null;
  };
}


