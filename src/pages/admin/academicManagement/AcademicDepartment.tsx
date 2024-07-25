import { Button, Table, TableColumnsType, TableProps } from "antd";
import { SetStateAction, useState } from "react";
import { TQueryParams } from "../../../types";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement.Api";
import { TAcademicDepartment } from "../../../types/academicDepartment.type";

const AcademicDepartment = () => {
  const [params, setParams] = useState<TQueryParams[] | undefined>([]);
  //*departments data fetch
  const { data: departements, isFetching } =
    useGetAllAcademicDepartmentQuery(params);

  //*department table with data
  const tableData = departements?.data?.map(
    (departement: TAcademicDepartment) => {
      return {
        _id: departement._id,
        name: departement?.name,
        academicFaculty: departement.academicFaculty.name,
      };
    }
  );

  //*department columns
  const columns: TableColumnsType<TAcademicDepartment> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Academic Faculty",
      key: "academicFaculty",
      dataIndex: "academicFaculty",
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Summer",
          value: "Summer",
        },
        {
          text: "Fall",
          value: "Fall",
        },
      ],
    },
    {
      title: "Action",
      key: "x",
      render: () => (
        <div>
          <Button>Update</Button>
        </div>
      ),
    },
  ];

  const onChange: TableProps<TAcademicDepartment>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: SetStateAction<TQueryParams[] | undefined> = [];
      filters.name?.forEach((item) =>
        queryParams.push({ name: "academicFaculty", value: item })
      );

      setParams(queryParams);
    }
  };

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      rowKey="_id"
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicDepartment;
