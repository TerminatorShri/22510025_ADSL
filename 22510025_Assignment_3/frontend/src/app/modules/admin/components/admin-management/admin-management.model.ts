export interface NewDepartment {
  deptName: string;
  building: string;
  budget: number;
}

export interface NewBuildingRoom {
  building: string;
  roomNumber: string;
  capacity: number;
}

export interface AdminActionResponse {
  statuscode: number;
  message: string;
  success: boolean;
}
