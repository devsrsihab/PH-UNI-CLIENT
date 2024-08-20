export type TFaculty = {
  _id: string;
  id: string;
  designation: string;
  name: TFName;
  user: string;
  gender: string;
  dateOfBirth: string;
  academicFaculty: TFAcademicFaculty;
  academicDepartment: TFAcademicDepartment;
  email: string;
  contactNo: string;
  emergencyContact: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg: string;
  fullName: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TFName =  {
  firstName: string;
  middleName: string;
  lastName: string;
  _id: string;
}

export type TFAcademicFaculty =  {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export type TFAcademicDepartment =  {
  _id: string;
  name: string;
  academicFaculty: TFAcademicFaculty;
  createdAt: string;
  updatedAt: string;
}

