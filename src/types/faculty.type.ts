export type TFaculty = {
  _id: string;
  id: string;
  designation: string;
  name: TName;
  user: string;
  gender: string;
  dateOfBirth: string;
  academicFaculty: TAcademicFaculty;
  academicDepartment: TAcademicDepartment;
  email: string;
  contactNo: string;
  emergencyContact: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export type TName =  {
  firstName: string;
  middleName: string;
  lastName: string;
  _id: string;
}

export type TAcademicFaculty =  {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export type TAcademicDepartment =  {
  _id: string;
  name: string;
  academicFaculty: TAcademicFaculty;
  createdAt: string;
  updatedAt: string;
}

