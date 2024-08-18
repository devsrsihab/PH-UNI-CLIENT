import { Button, Dropdown, Table, Tag } from "antd";
import type { MenuProps, TableColumnsType } from "antd";
import { TSemester } from "../../../types";
import {
  useGetAllRegistaredSemesterQuery,
  useUpdateRegistaredSemesterMutation,
} from "../../../redux/features/admin/courseManagement.Api";
import moment from "moment";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";

const RegisteredSemesters = () => {
  const [semesterId, setSemesterId] = useState("");
  const { data: semesterData, isFetching } =
    useGetAllRegistaredSemesterQuery(undefined);
  const [updateRegistaredSemester] = useUpdateRegistaredSemesterMutation();

  const handleStatusDropdown: MenuProps["onClick"] = async(data) => {
    const semesterRegisterData = {
      data: {
        status: data.key,
      },
      _id: semesterId,
    };

    await updateRegistaredSemester(semesterRegisterData);
    console.log(semesterRegisterData);
  };

  const items: MenuProps["items"] = [
    {
      label: "UPCOMING",
      key: "UPCOMING",
      icon: <UserOutlined />,
    },
    {
      label: "ONGOING",
      key: "ONGOING",
      icon: <UserOutlined />,
    },
    {
      label: "ENDED",
      key: "ENDED",
      icon: <UserOutlined />,
      danger: true,
    },
  ];

  const menuProps = {
    items,
    onClick: handleStatusDropdown,
  };

  type TTableData = Pick<
    TSemester,
    "_id" | "status" | "startDate" | "endDate"
  > & { name: string };

  const tableData = semesterData?.data?.map(
    ({ _id, status, academicSemester, startDate, endDate }) => ({
      _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      status,
      startDate: moment(startDate).format("MMMM Do YYYY"),
      endDate: moment(endDate).format("MMMM Do YYYY"),
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }

        return (
          <>
            <Tag color={color}>{item.toUpperCase()}</Tag>
          </>
        );
      },
    },
    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => (
        <Dropdown trigger={["click"]} menu={menuProps}>
          <Button onClick={() => setSemesterId(item._id)}>
            Status
            <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];

  // const onChange: TableProps<TTableData>["onChange"] = (
  //   _pagination,
  //   filters,
  //   _sorter,
  //   extra
  // ) => {
  //   if (extra.action === "filter") {
  //     const queryParams: SetStateAction<TQueryParams[] | undefined> = [];
  //     filters.name?.forEach((item) =>
  //       queryParams.push({ name: "name", value: item })
  //     );
  //     filters.year?.forEach((item) =>
  //       queryParams.push({ name: "year", value: item })
  //     );
  //     setParams(queryParams);
  //   }
  // };

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      rowKey="_id"
      // onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default RegisteredSemesters;
