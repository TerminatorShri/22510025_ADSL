export interface StudentInfo {
  advisor_id: string;
  advisor_name: string;
  dept_name: string;
  student_id: string;
  student_name: string;
  tot_cred: number;
}

export interface StudentProfileResponse {
  statuscode: number;
  message: string;
  success: boolean;
  data: StudentInfo;
}
