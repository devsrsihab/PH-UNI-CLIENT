import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import {
  useAddOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetAllRegistaredSemesterQuery,
  useGetCourseFacultyQuery,
} from "../../../redux/features/admin/courseManagement.Api";
import PHSelect from "../../../components/form/PHSelect";
import { TCourse, TResponseRedux } from "../../../types";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.Api";
import PHInput from "../../../components/form/PHInput";
import { daysOptions } from "../../../constant/course";
import PHTimePicker from "../../../components/form/PHTimePicker";
import { toast } from "sonner";

const OfferCourse = () => {
  const [courseId, setCourseId] = useState<string>("");
  const [academicDepartmentId, setAcedemicDepartId] = useState<string>("");

  const { data: courses } = useGetAllCoursesQuery(undefined);
  const { data: courseFaculties, isFetching: isFetchingCourseFaculty } = useGetCourseFacultyQuery(courseId, {skip: !courseId});
  const { data: registerSemister } = useGetAllRegistaredSemesterQuery([
    {
      name: "sort",
      value: "year",
    },
  ]);
  // offer course mutation
  const [addOfferedCourse] = useAddOfferedCourseMutation();

  const { data: academicDepartment } =
    useGetAllAcademicDepartmentQuery(undefined);
  const { data: academicFaculties } =
    useGetAllAcademicFacultiesQuery(undefined);

  const academicFacultyOptions = academicFaculties?.data?.map(
    (academicFacultie: any) => ({
      value: academicFacultie._id,
      label: `${academicFacultie.name} `,
    })
  );

  const academicDepartOptions = academicDepartment?.data?.map((department) => ({
    value: department._id,
    label: `${department.name} `,
  }));

  const registerSemisterOptions = registerSemister?.data?.map((semester) => ({
    value: semester._id,
    label: `${semester.academicSemester.name} ${semester.academicSemester.year}`,
  }));

  const courseOptions = Array.isArray(courses?.data)
    ? courses?.data.map((course: TCourse) => ({
        value: course._id,
        label: `${course.title} `,
      }))
    : [];



  const courseFacultiesOptions = Array.isArray(
    courseFaculties?.data?.faculties
  )
    ? courseFaculties?.data?.faculties?.map((course: any) => ({
        value: course._id,
        label: `${course.fullName}  `,
      }))
    : [];
    

        console.log(courseFaculties?.data?.faculties);
        console.log(courseId);

  const onSubmi: SubmitHandler<FieldValues> = async (data) => {
    // const loader = toast.loading("Creating semester...");
    const courseData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
      starTime: data.starTime ? data.starTime.format("HH:mm") : "00:00",
      endTime: data.endTime ? data.endTime.format("HH:mm") : "00:00",
    };


    const loader = toast.loading("Offer Course Creating...");
    try {
      const res = (await addOfferedCourse(courseData)) as TResponseRedux<any>;
      console.log(res);

      if (res.error) {
        toast.error(res.error.data.message, { id: loader });
      } else {
        toast.success("Offer Course created successfully", {
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
            label="Semester Registration"
            name="semesterRegistration"
            options={registerSemisterOptions}
          />

          <PHSelectWithWatch
            mode="multiple"
            label="Academic Department"
            name="academicDepartment"
            onValueChange={setAcedemicDepartId}
            options={academicDepartOptions}
          />
          <PHSelect
            label="Academic Faculty"
            name="academicFaculty"
            options={academicFacultyOptions}
            disabled={!academicDepartmentId}
          />

          <PHSelectWithWatch
            onValueChange={setCourseId}
            label="Course"
            name="course"
            options={courseOptions}
          />

          <PHSelect
            label="Faculties"
            name="faculty"
            options={courseFacultiesOptions}
            disabled={!courseId || isFetchingCourseFaculty}
          />
          <PHInput type="number" label="Max Capacity" name="maxCapacity" />
          <PHInput type="number" label="Section" name="section" />

          <PHSelect
            mode={"multiple"}
            label="Days"
            name="days"
            options={daysOptions}
          />
          <PHTimePicker label="Star Time" name="starTime" />
          <PHTimePicker label="End Time" name="endTime" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
