import { useGetAllSemesterQuery } from "../../../redux/features/academicSemester/academicSemesterApi";

const AcademicSemester = () => {
  const { data } = useGetAllSemesterQuery(undefined);
  console.log(data);

  return (
    <div>
      <h2>Welcome to the AcademicSemester Component</h2>
    </div>
  );
};

export default AcademicSemester;
