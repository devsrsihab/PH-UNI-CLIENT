import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { semesterStatusOptions } from "../../../constant/semester";
import { toast } from "sonner";
import { TResponseRedux } from "../../../types/global.type";
import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagement.Api";
import PHInput from "../../../components/form/PHInput";
import { useAddRegistaredSemesterMutation } from "../../../redux/features/admin/courseManagement.Api";
import PHDatePicker from "../../../components/form/PHDatePicker";

const SemesterRegistration = () => {
  const [addRegistaredSemester] = useAddRegistaredSemesterMutation();
  const { data: academicSemester } = useGetAllSemesterQuery([
    {
      name: "sort",
      value: "year",
    },
  ]);

  console.log(academicSemester);
  const academicSemesterOptions = academicSemester?.data?.map((semester) => ({
    value: semester._id,
    label: `${semester.name} ${semester.year}`,
  }));

  const onSubmi: SubmitHandler<FieldValues> = async (data) => {
    const loader = toast.loading("Creating semester...");
    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    console.log(semesterData);

    try {
      const res = (await addRegistaredSemester(semesterData)) as TResponseRedux<any>;
      console.log(res);

      if (res.error) {
        toast.error(res.error.data.message, { id: loader });
      } else {
        toast.success("Academic Registred created successfully", {
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
        <PHForm onSubmit={onSubmi}>
          <PHSelect
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />
          <PHSelect
            label="Status"
            name="status"
            options={semesterStatusOptions}
          />
          <PHDatePicker label="Start Date" name="startDate" />
          <PHDatePicker label="End Date" name="endDate" />
          <PHInput label="Min Creadit" name="minCredit" type="text" />
          <PHInput label="Max Creadit" name="maxCredit" type="text" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
