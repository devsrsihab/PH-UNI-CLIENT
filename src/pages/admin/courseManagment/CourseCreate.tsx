import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import { toast } from "sonner";
import { TResponseRedux } from "../../../types/global.type";
import PHInput from "../../../components/form/PHInput";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.Api";
import PHSelect from "../../../components/form/PHSelect";
import { TCourse } from "../../../types";

const SemesterRegistration = () => {
  const { data: courses } = useGetAllCoursesQuery(undefined);
  const [addCourse] = useAddCourseMutation();

const preRequisiteCourseOptions = Array.isArray(courses?.data) ? courses?.data.map((course: TCourse) => ({
  value: course._id,
  label: `${course.title} `,
})) : [];

  const onSubmi: SubmitHandler<FieldValues> = async (data) => {
    const loader = toast.loading("Creating semester...");
    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      preRequisiteCourse: data?.preRequisiteCourse ? data?.preRequisiteCourse?.map((item: any) => ({
        course: item,
        isDeleted: false,
      })) : [],
    };

    console.log(courseData);

    try {
      const res = (await addCourse(courseData)) as TResponseRedux<any>;
      console.log(res);

      if (res.error) {
        toast.error(res.error.data.message, { id: loader });
      } else {
        toast.success("Course created successfully", {
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
          <PHInput label="Title" name="title" type="text" />
          <PHInput label="Prefix" name="prefix" type="text" />
          <PHInput label="code" name="code" type="number" />
          <PHInput label="Credits" name="credits" type="number" />
          <PHSelect
            mode={"multiple"}
            label="Pre Requisite Course"
            name="preRequisiteCourse"
            options={preRequisiteCourseOptions}
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
