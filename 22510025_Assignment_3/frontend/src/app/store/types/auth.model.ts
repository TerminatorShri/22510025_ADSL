export interface User {
  id: number;
  username: string;
  role_id: string;
  student_id?: string | null;
  instructor_id?: string | null;
  dept_name?: string | null;
}

export interface AuthState {
  user: User | null;
}
