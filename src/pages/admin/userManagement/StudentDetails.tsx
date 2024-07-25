import { useParams } from "react-router-dom";
import { useGetSingleStudentQuery } from "../../../redux/features/admin/userManagement.Api";

const StudentDetails = () => {
  const params = useParams();
  const { studentId } = params;
  const { data, isLoading } = useGetSingleStudentQuery(studentId);
  
  const student = data?.data

  if (isLoading) {
    return <h2>Loading....</h2>;
  }

  return (
    <div>
      <h2>Welcome to the StudentDetails {student?.fullName}</h2>
    </div>
  );
};

export default StudentDetails;
