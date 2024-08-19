export type TCourse =  {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourse: TPreRequisiteCourse[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export type TPreRequisiteCourse = {
  course: TCourse;
  isDeleted: boolean;
  _id: string;
};

