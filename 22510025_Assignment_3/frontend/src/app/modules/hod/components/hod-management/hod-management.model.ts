export interface AssignInstructorToStudent {
  studentId: string;
  instructorId: string;
}

export interface AssignInstructor {
  instructorId: string;
  courseId: string;
  secId: string;
  semester: string;
  year: number;
}

export interface AddFunds {
  amount: number;
}

export interface ChangeSalary {
  instructorId: string;
  newSalary: number;
}
