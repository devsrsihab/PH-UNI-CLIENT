import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { useGetAllAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.Api";
import { TAcademicFaculty } from "../../../types/academicFaculty.type";

const AcademicFaculty = () => {
  const { data: academicFaculties, isFetching } =
    useGetAllAcademicFacultiesQuery(undefined);

  console.log(academicFaculties);
  const columns: TableColumnsType<TAcademicFaculty> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="capitalize">{text}</span>,
    },
  ];

  const tableData: TAcademicFaculty[] = academicFaculties?.data?.map(
    ({ name }: TAcademicFaculty) => ({
      name,
    })
  );

  return <Table loading={isFetching} columns={columns} dataSource={tableData} />;
};

export default AcademicFaculty;
