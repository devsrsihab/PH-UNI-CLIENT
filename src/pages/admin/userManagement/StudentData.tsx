import { Button, Pagination, Space, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { TQueryParams, TStudent } from "../../../types";
import { SetStateAction, useState } from "react";
import { useGetAllStudentQuery } from "../../../redux/features/admin/userManagement.Api";
import { Link } from "react-router-dom";
const StudentData = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);
  const { data: studentData, isFetching } = useGetAllStudentQuery([
    { name: "limit", value: 3 },
    { name: "page", value: page },
    ...params,
  ]);

  type TTableData = Pick<
    TStudent,
    "fullName" | "_id" | "id" | "email" | "contactNo"
  >;

  const tableData = studentData?.data?.map(
    ({ _id, fullName, email, contactNo, id }) => ({
      _id,
      fullName,
      email,
      contactNo,
      id,
    })
  );

  const metaData = studentData?.meta;

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "fullName",
      dataIndex: "fullName",
    },
    {
      title: "Role No",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Contact No",
      key: "contactNo",
      dataIndex: "contactNo",
    },

    {
      title: "Action",
      key: "x",
      render: (item) => (
        <Space>
          <Link to={`/admin/student/${item.id}`}>
            <Button>Details</Button>
          </Link>
          <Button>Update</Button>
          <Button>Block</Button>
        </Space>
      ),
      width: "10%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: SetStateAction<TQueryParams[] | undefined> = [];
      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );
      setParams(queryParams);
    }
  };

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        pagination={false}
        rowKey="_id"
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
      <Pagination
        onChange={(value) => setPage(value)}
        current={page}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
  );
};

export default StudentData;
