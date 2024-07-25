export type TStudent = {
  _id: string;
  id: string;
  name: TName;
  user: string;
  gender: string;
  dateOfBirth: string;
  admissionSemester: TAdmissionSemester;
  academicDepartment: TAcademicDepartment;
  email: string;
  bloodGroup: string;
  contactNo: string;
  emergencyContact: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg: string;
  fullName: string;
  isDeleted: boolean;
};

export type TName = {
  firstName: string;
  middleName: string;
  lastName: string;
  _id: string;
}

export type TAdmissionSemester = {
  _id: string;
  name: string;
  code: string;
  year: string;
  startMonth: string;
  endMonth: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type TAcademicDepartment = {
  _id: string;
  name: string;
  academicFaculty: TAcademicFaculty;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type TAcademicFaculty = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherContactNo: string;
  motherOccupation: string;
  _id: string;
}

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contact: string;
  address: string;
  _id: string;
}
