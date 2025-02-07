export interface NewStudent {
  studentId: string;
  name: string;
  deptName: string;
}

export interface AddActionResponse {
  data: null;
  message: string;
  statuscode: number;
  success: boolean;
}
