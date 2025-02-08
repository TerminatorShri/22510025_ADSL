import { User } from '../../../../store/types/auth.model';

export interface LoginResponse {
  data: User;
  message: string;
  statuscode: number;
  success: boolean;
}
