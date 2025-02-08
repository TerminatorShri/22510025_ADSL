export interface User {
  id: number;
  username: string;
  role: string;
}

export interface AuthState {
  user: User | null;
}
