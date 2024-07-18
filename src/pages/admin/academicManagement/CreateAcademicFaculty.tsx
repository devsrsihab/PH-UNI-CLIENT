import { Button, Col, Flex } from "antd";
import PHInput from "../../../components/form/PHInput";
import PHForm from "../../../components/form/PHForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../schemas/academicManagment.schema";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.Api";
import { TResponseRedux } from "../../../types";
import { TAcademicFaculty } from "../../../types/academicFaculty.type";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const loader = toast.loading("Creating Academic Faculty...");
    const semesterData = {
      name: data.name,
    };

    try {
      const res = (await addAcademicFaculty(
        semesterData
      )) as TResponseRedux<TAcademicFaculty>;
      console.log(res);

      if (res.error) {
        toast.error(res.error.data.message, { id: loader });
      } else {
        toast.success("Academic Faculty created successfully", { id: loader });
      }
    } catch (error: any) {
      toast.error(error?.data?.message, { id: loader });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicFacultySchema)}
        >
          <PHInput label="Name" name="name" type="text" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
