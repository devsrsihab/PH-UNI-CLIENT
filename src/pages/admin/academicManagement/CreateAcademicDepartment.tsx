import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartmentSchema } from "../../../schemas/academicManagment.schema";
import PHSelect from "../../../components/form/PHSelect";
import PHInput from "../../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  useAddAcademicDepartmentMutation,
  useGetAllAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.Api";
import { TAcademicFacultyOptions } from "../../../types/academicFaculty.type";
import { TAcademicDepartment } from "../../../types/academicDepartment.type";
import { TResponseRedux } from "../../../types";
import { toast } from "sonner";

const CreateAcademicDepartment = () => {
  //* get all academicFaculties
  const { data: academicFaculties } =
    useGetAllAcademicFacultiesQuery(undefined);
  const academicFacultieOptions = academicFaculties?.data?.map(
    (academicFacultie: TAcademicFacultyOptions) => ({
      value: academicFacultie?._id,
      label: academicFacultie?.name,
    })
  );

  //* academic department mutation
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();

  const onSubmi: SubmitHandler<FieldValues> = async (data) => {
    const loader = toast.loading("Creating Academic Department...");

    try {
      const res = (await addAcademicDepartment(
        data
      )) as TResponseRedux<TAcademicDepartment>;
      console.log(res);

      if (res.error) {
        toast.error(res.error.data.message, { id: loader });
      } else {
        toast.success("Academic Department created successfully", {
          id: loader,
        });
      }
    } catch (error: any) {
      toast.error(error?.data?.message, { id: loader });
    }
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmi}
          resolver={zodResolver(academicDepartmentSchema)}
        >
          <PHInput label="Name" name="name" type="text" />
          <PHSelect
            label="Academic Faculty"
            name="academicFaculty"
            options={academicFacultieOptions}
          />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
