import { Button, Flex, Modal, Table } from "antd";
import type { TableColumnsType } from "antd";
import { TCourse } from "../../../types";
import {
  useAddFacultiesInCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.Api";
import { useState } from "react";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { TFaculty } from "../../../types/faculty.type";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.Api";
import { toast } from "sonner";

const Courses = () => {
  const { data: courseData, isFetching } = useGetAllCoursesQuery(undefined);
  type TTableData = Pick<TCourse, "_id" | "title" | "code">;

  const tableData = Array.isArray(courseData?.data)
    ? (courseData?.data as TCourse[]).map(
        ({ _id, title, code }) =>
          ({
            _id,
            title,
            code,
          } as TTableData)
      )
    : [];

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Code",
      key: "code",
      dataIndex: "code",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => <AddFacultyModal facultieInfo={item} />,
    },
  ];

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      rowKey="_id"
    />
  );
};

// add faculty modal

const AddFacultyModal = ({ facultieInfo }: any) => {
  const { data: faculties } = useGetAllFacultiesQuery(undefined);
  const [addFacultiesInCourse] = useAddFacultiesInCourseMutation();

  const facultyOptions = Array.isArray(faculties?.data)
    ? faculties?.data.map((faculty: TFaculty) => ({
        value: faculty._id,
        label: `${faculty.name.firstName} ${faculty.name.lastName}  `,
      }))
    : [];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmitForm = async (data: any) => {
    const loader = toast.loading("Assignin Faculties...");
    try {
      const courseData = {
        courseId: facultieInfo._id,
        data: data,
      };

      await addFacultiesInCourse(courseData);
      toast.success("Faculty assigned successfully", {
        id: loader,
      });
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message, { id: loader });
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal
        title="Basic Modal"
        footer={""}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <PHForm onSubmit={handleSubmitForm}>
          <PHSelect
            mode={"multiple"}
            options={facultyOptions}
            name="faculties"
            label="Faculties"
          />
          <Flex gap={5} justify="end">
            <Button
              style={{ backgroundColor: "red", color: "white" }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button htmlType="submit">Submit</Button>
          </Flex>
        </PHForm>
      </Modal>
    </>
  );
};

export default Courses;
